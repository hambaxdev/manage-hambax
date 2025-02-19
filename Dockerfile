FROM node:16-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . . 
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
