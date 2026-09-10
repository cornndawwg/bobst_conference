// Production static file server for the BOBST kiosk app.
//
// Runs as a small Node cluster so the process can actually use multiple
// CPU cores on Railway (a single Node.js process is single-threaded and
// will only ever use one core no matter how many vCPUs the container is
// given). The primary process forks WEB_CONCURRENCY workers; each worker
// is an identical HTTP server built on `serve-handler` (the same static
// file engine the `serve` CLI uses under the hood, including Range
// request support for video scrubbing). Node's cluster module load-
// balances incoming connections across the workers automatically.
import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import handler from 'serve-handler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const WORKERS = Math.max(1, Number(process.env.WEB_CONCURRENCY) || 2);

const serveConfig = {
  public: path.join(__dirname, 'dist'),
  // Equivalent to the `serve -s` / `--single` flag: serve-handler stats the
  // real file first, and only falls back to this rewrite when no matching
  // file exists, so real assets (JS/CSS/videos/images) are never shadowed.
  // Our app uses hash-based routing (#/s/station/market) so the server only
  // ever sees requests for real files or `/`, but this keeps parity with the
  // previous `serve -s dist` behavior for any other path.
  rewrites: [{ source: '**', destination: '/index.html' }],
};

function startWorkerServer() {
  const server = http.createServer((req, res) => {
    handler(req, res, serveConfig).catch((err) => {
      console.error('Static handler error:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  });

  server.listen(PORT, () => {
    console.log(`[worker ${process.pid}] listening on :${PORT}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });
}

if (WORKERS > 1 && cluster.isPrimary) {
  console.log(`Primary ${process.pid} starting ${WORKERS} workers (cores available: ${os.cpus().length})`);

  for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(`Worker ${worker.process.pid} exited (code=${code}, signal=${signal}), restarting…`);
    cluster.fork();
  });

  process.on('SIGTERM', () => {
    for (const worker of Object.values(cluster.workers)) {
      worker.process.kill('SIGTERM');
    }
    process.exit(0);
  });
} else {
  startWorkerServer();
}
