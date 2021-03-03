FROM golang:alpine

WORKDIR /app/cryptex
COPY . /app/cryptex

# ENV POSTGRESQL_CONNECTION_URL="postgresql://postgres:p123@localhost:5432/cryptex"
# ENV ROOT_URL="http://localhost:8080"
# ENV ADMIN_USERNAME="cryptex2021"
# ENV ADMIN_PASSWORD="helloworld"
# ENV AUTH0_IDENTIFIER="https://cryptex20.auth0.com/api/v2/"
# ENV AUTH0_ISS="https://cryptex20.auth0.com/"
# ENV AUTH0_JWKS="https://cryptex20.auth0.com/.well-known/jwks.json"

RUN go build -o cryptex-server
EXPOSE 8080
CMD ["./cryptex-server"]
