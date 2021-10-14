FROM node:slim as builder
WORKDIR /app
COPY . .
RUN npm i
# React use ENV when build
# So need to confirm ENV before build
RUN npm run build

FROM nginx:alpine

#copy the config file to nginx directory and replace default
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Copy CRA build website to webserver serve file
COPY public /usr/share/nginx/html
