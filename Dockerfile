# Use the official Node.js 14 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variables for configuration
ENV PORT=7000
ENV NODE_ENV=production

# Expose the port on which the application will run
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
