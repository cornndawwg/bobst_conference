// Audits every local video file for browser-playback compatibility issues:
//  - video/audio codec (HEVC/H.265, non-AAC audio, etc. often fail in Chrome/Firefox)
//  - moov atom position (front = fast-start/streamable, back = must-buffer-more before playing)
//  - basic corruption/decodability (ffprobe error output)
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readdir, stat, open } from 'node:fs/promises';
import path from 'node:path';

const execFileAsync = promisify(execFile);
const ROOT = path.resolve('public/videos');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(await walk(full));
    else if (e.name.toLowerCase().endsWith('.mp4')) files.push(full);
  }
  return files;
}

// Walk top-level MP4/MOV boxes to find order of 'moov' vs 'mdat'.
async function checkMoovPosition(filePath) {
  const fh = await open(filePath, 'r');
  try {
    const size = (await fh.stat()).size;
    let offset = 0;
    let moovOffset = -1;
    let mdatOffset = -1;
    const buf = Buffer.alloc(8);
    while (offset < size) {
      const { bytesRead } = await fh.read(buf, 0, 8, offset);
      if (bytesRead < 8) break;
      let boxSize = buf.readUInt32BE(0);
      const boxType = buf.toString('ascii', 4, 8);
      if (boxType === 'moov' && moovOffset === -1) moovOffset = offset;
      if (boxType === 'mdat' && mdatOffset === -1) mdatOffset = offset;
      if (boxSize === 1) {
        // 64-bit size follows
        const big = Buffer.alloc(8);
        await fh.read(big, 0, 8, offset + 8);
        boxSize = Number(big.readBigUInt64BE(0));
      }
      if (boxSize === 0 || boxSize < 8) break; // avoid infinite loop on malformed box
      offset += boxSize;
      if (moovOffset !== -1 && mdatOffset !== -1) break;
    }
    return { moovOffset, mdatOffset };
  } finally {
    await fh.close();
  }
}

async function probe(filePath) {
  try {
    const { stdout, stderr } = await execFileAsync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration,size:stream=codec_type,codec_name,width,height,pix_fmt',
      '-of', 'json',
      filePath,
    ]);
    const data = JSON.parse(stdout);
    return { data, err: stderr.trim() };
  } catch (e) {
    return { data: null, err: e.stderr || e.message };
  }
}

const files = await walk(ROOT);
files.sort();
const results = [];

for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const st = await stat(f);
  const sizeMB = (st.size / 1024 / 1024).toFixed(1);
  const { data, err } = await probe(f);
  const { moovOffset, mdatOffset } = await checkMoovPosition(f);
  const vStream = data?.streams?.find((s) => s.codec_type === 'video');
  const aStream = data?.streams?.find((s) => s.codec_type === 'audio');
  const duration = data?.format?.duration ? Number(data.format.duration).toFixed(1) : 'ERR';

  const issues = [];
  if (err) issues.push(`ffprobe error: ${err}`);
  if (!vStream) issues.push('NO VIDEO STREAM');
  else if (!['h264', 'vp9', 'av1'].includes(vStream.codec_name)) {
    issues.push(`video codec '${vStream.codec_name}' may not play in Chrome/Firefox (needs H.264)`);
  }
  if (aStream && !['aac', 'mp3', 'opus', 'vorbis'].includes(aStream.codec_name)) {
    issues.push(`audio codec '${aStream.codec_name}' may not play in browsers (needs AAC)`);
  }
  const faststart = moovOffset !== -1 && mdatOffset !== -1 ? moovOffset < mdatOffset : null;
  if (faststart === false) issues.push('moov atom AFTER mdat (not fast-start -> slow to begin playback, esp. large files)');
  if (faststart === null) issues.push('could not determine moov/mdat order');

  results.push({
    rel, sizeMB, duration,
    vcodec: vStream?.codec_name || '-',
    acodec: aStream?.codec_name || '-',
    res: vStream ? `${vStream.width}x${vStream.height}` : '-',
    faststart,
    issues,
  });
}

console.log('\n=== VIDEO AUDIT RESULTS ===\n');
for (const r of results) {
  const flag = r.issues.length ? '⚠️ ' : '✅ ';
  console.log(`${flag}${r.rel}`);
  console.log(`    size=${r.sizeMB}MB dur=${r.duration}s vcodec=${r.vcodec} acodec=${r.acodec} res=${r.res} faststart=${r.faststart}`);
  for (const i of r.issues) console.log(`    !! ${i}`);
}

const bad = results.filter((r) => r.issues.length);
console.log(`\n=== SUMMARY: ${bad.length} of ${results.length} files have issues ===`);
for (const r of bad) console.log(`  - ${r.rel}: ${r.issues.join('; ')}`);
