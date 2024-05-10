# Build stage
FROM rust:bookworm AS builder

WORKDIR /app
COPY . .
WORKDIR /app/apps/realtime
RUN cargo build --release

# Final run stage
FROM debian:bookworm-slim AS runner

WORKDIR /app/apps/realtime
COPY --from=builder /app/apps/realtime/target/release/realtime /app/apps/realtime/realtime
CMD ["/app/apps/realtime/realtime"]