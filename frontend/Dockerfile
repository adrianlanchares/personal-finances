# Stage 1: Build React app
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: export build artifacts
FROM alpine:3.18 AS frontend-dist
WORKDIR /dist
COPY --from=build /app/dist .

RUN npm install -g serve

CMD ["serve", "-s", ".", "-l", "3000"]