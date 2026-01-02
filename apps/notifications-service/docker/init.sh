#!/bin/sh
set -e

echo "Waiting for Postgres to start..."

while ! pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" >/dev/null 2>&1; do
  echo "Database not ready yet, waiting..."
  sleep 2
done

echo "Database ready! Running migrations..."

npm run migration:run -w @challenge/notifications-service

echo "Starting application..."

exec "$@"
