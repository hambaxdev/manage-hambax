# Используем Node.js для сборки фронтенда
FROM node:16-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . . 
RUN npm run build

# Используем Nginx для раздачи статических файлов
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
