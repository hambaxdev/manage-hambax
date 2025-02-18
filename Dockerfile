FROM nginx:alpine

# Устанавливаем рабочую директорию в Nginx
WORKDIR /usr/share/nginx/html

# Удаляем дефолтные файлы Nginx
RUN rm -rf ./*

# Копируем билд фронтенда в контейнер
COPY build .

# Копируем кастомный Nginx конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
