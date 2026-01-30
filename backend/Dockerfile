 # Use Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (including TypeScript)
RUN npm install

# Copy the rest of the source code
COPY . .

# Step 1: Convert TypeScript to JavaScript (build)
RUN npm run build

# Step 2: Open the port
EXPOSE 5000

# Step 3: Start the compiled JavaScript version
CMD ["npm", "start"]
