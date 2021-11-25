# Stage 1: Build an Angular Docker Image
FROM node:16.13 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app

RUN npm run build 
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/out/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]