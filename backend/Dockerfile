# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
RUN npm run build
# Expose port 3500
EXPOSE 3500

# Start the backend server
CMD ["npm", "start"]
