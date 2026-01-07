#!/bin/sh
set -e

echo "Waiting for Postgres to start..."

while ! pg_isready -h "$DB_AUTH_SERVICE_HOST" -p "$DB_AUTH_SERVICE_PORT" -U "$DB_AUTH_SERVICE_USER" >/dev/null 2>&1; do
  echo "Database not ready yet, waiting..."
  sleep 2
done

echo "Database ready! Running migrations..."

npm run migration:run -w @challenge/auth-service

echo "Starting application..."

exec "$@"
