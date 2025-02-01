# Stage 1: Build
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm 

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application (if applicable)
RUN pnpm run build

# Stage 2: Run
FROM node:18-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app ./

# Expose the port the app runs on
EXPOSE 3000

# Install pnpm globally
RUN npm install -g pnpm 

# Start the application
CMD ["pnpm", "start"]
