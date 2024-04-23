# Use the official Node.js 14 image as a base for frontend build
FROM node:14 as frontend-build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./frontend/

# Install frontend dependencies
RUN cd frontend && npm install

# Copy the rest of the frontend application code
COPY frontend/. ./frontend/

# Build the React app
RUN cd frontend && npm run build


# Use the official Node.js 14 image as a base for backend
FROM node:14 as backend

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install

# Copy the rest of the backend application code
COPY backend/. ./backend/

# Expose backend port
EXPOSE 8070

# Start the backend server
CMD ["node", "backend/server.js"]
