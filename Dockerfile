# Use the official Node.js image as the base image
FROM node:18-alpine As development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your Nest.js app will run on
EXPOSE 7000

# Command to run your application in production
CMD ["npm", "run", "start"]
