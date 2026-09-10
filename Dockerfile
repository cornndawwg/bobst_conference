# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage — lightweight static server
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
COPY --from=build /app/dist ./dist
ENV PORT=3000
# Number of worker processes the static server forks so the app can use
# multiple CPU cores on Railway (see server.js). Override via Railway
# service variables if needed.
ENV WEB_CONCURRENCY=2
EXPOSE 3000
# The Railway volume is mounted at /videos at *runtime* (not build time), so we
# symlink it into dist/ on container start. The clustered server then
# transparently serves /videos/* requests straight from the persistent volume.
CMD ["sh", "-c", "mkdir -p /videos && ln -sfn /videos dist/videos && node server.js"]
