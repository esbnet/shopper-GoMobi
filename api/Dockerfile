# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Run the build process
RUN npm run build

# Make the entrypoint script executable
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose API port
EXPOSE 8080

# Use the entrypoint script
CMD ["sh", "/usr/src/app/entrypoint.sh"]
