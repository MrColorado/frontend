# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
COPY package.json yarn.lock ./
# ==== BUILD =====
# Build the app
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
# ==== RUN =======
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
RUN yarn global add serve

EXPOSE 3000
# Start the app
CMD [ "serve", "-s", "build" ]