### STAGE 1: Build ###
FROM node:16 AS build
WORKDIR /usr/src/app
#RUN chmod -R 777 /usr/src/app
COPY package.json  ./
RUN npm install
COPY . .
#RUN chmod -R 777 ./
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build  /usr/share/nginx/html/execute
