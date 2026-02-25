# Build stage
FROM denoland/deno:2.6.10 AS builder

WORKDIR /app

# Copy project files
COPY . .

# Production stage
FROM denoland/deno:2.6.10
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
# Run the main entry point (replace with your actual entry file if different)
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--allow-sys", "--allow-ffi", "main.tsx"]
