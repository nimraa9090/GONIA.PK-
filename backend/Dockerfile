# Use a Node.js base image (Alpine version is smaller and faster)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to optimize build speed
COPY package*.json ./

# Install all dependencies (using npm install or npm ci)
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your backend uses (matches your dashboard setting)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
