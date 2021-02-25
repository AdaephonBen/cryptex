FROM golang:alpine

WORKDIR /app/cryptex
COPY . /app/cryptex
COPY ../config /app/cryptex/config

RUN go build -o cryptex-server
EXPOSE 8080
CMD ["./cryptex-server config"]
