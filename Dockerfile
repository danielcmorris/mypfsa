# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:ssr

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist/revor ./dist/revor
EXPOSE 4000
CMD ["node", "dist/revor/server/server.mjs"]
