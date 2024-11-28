#!/bin/sh

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
until nc -z db 5432; do
  echo "Database is unavailable - sleeping"
  sleep 2
done
echo "Database is up!"

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma db seed

# Start the server
echo "Starting the server..."
npm run start
