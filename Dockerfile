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
RUN npm install -g serve
COPY --from=build /app/dist ./dist
ENV PORT=3000
EXPOSE 3000
# The Railway volume is mounted at /videos at *runtime* (not build time), so we
# symlink it into dist/ on container start. serve then transparently serves
# /videos/* requests straight from the persistent volume.
CMD ["sh", "-c", "mkdir -p /videos && ln -sfn /videos dist/videos && serve -s dist -l ${PORT}"]
