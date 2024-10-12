# Use an official Node.js image
FROM node:16.16.0-buster-slim

# Set the working directory
WORKDIR /app/speech_ai_frontend

# Copy package.json and install dependencies
COPY package.json .
RUN npm install
RUN apt-get -y update; apt-get -y install curl

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Install `serve` globally to serve the production build
RUN npm install -g serve

# Expose the port React runs on
EXPOSE 3000

# Serve the build with a simple static server
CMD ["serve", "-s", "build", "-l", "3000"]
