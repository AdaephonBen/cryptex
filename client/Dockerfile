FROM mhart/alpine-node:latest as build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm i
RUN npm run build
RUN npm i -g serve

CMD ["serve", "-s", "/usr/src/app/build", "-l", "3000"]
