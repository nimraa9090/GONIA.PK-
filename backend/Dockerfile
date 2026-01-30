 FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including typescript
RUN npm install

# Copy all source code
COPY . .

# Build the TypeScript code into JavaScript
RUN npm run build

EXPOSE 5000

# Start the BUILT version of the app
CMD ["npm", "start"]
