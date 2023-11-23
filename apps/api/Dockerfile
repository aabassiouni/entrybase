FROM golang:1.21 AS builder

WORKDIR /go/src/

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o waitlister-api .

FROM golang:1.21

COPY --from=builder /go/src/waitlister-api /usr/local/bin/waitlister-api


CMD ["/usr/local/bin/waitlister-api", "agent"]
