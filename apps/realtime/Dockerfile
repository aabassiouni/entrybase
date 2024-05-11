# Build stage
FROM rust:1-bookworm AS builder

WORKDIR /usr/src/app
COPY . .
RUN --mount=type=cache,target=/usr/local/cargo,from=rust:latest,source=/usr/local/cargo \
  --mount=type=cache,target=target \
  cargo build --release && mv ./target/release/realtime ./realtime 

# Final run stage
FROM debian:bookworm-slim AS runner

RUN useradd -ms /bin/bash app
USER app
COPY --from=builder /usr/src/app/realtime /app/realtime
CMD ["/app/realtime"]