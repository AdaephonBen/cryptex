FROM mhart/alpine-node:latest as build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm i
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
