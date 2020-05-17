FROM node:12.16-alpine

RUN mkdir -p /usr/src

# Set the working directory.
WORKDIR /usr/src

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8000

# Copy the rest of your app's source code from your host to your image filesystem.
# COPY . .