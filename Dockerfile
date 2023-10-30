# Step 1: Building the Meteor app
FROM node:18 as builder

# Copying the app source code into the container
COPY . /app
WORKDIR /app

# Installing Meteor
RUN curl "https://install.meteor.com/" | sh

# Allowing superuser for Meteor build
ENV METEOR_ALLOW_SUPERUSER=true

# Building the Meteor app
RUN meteor npm install
RUN meteor build --directory /build --server-only --allow-superuser --architecture os.linux.x86_64

# Step 2: Setting up the production environment
FROM node:18

# Copying the built app from the builder stage
COPY --from=builder /build /app
WORKDIR /app/bundle/programs/server


# Installing python and other dependencies for node-gyp and fibers
RUN apt-get update && \
  apt-get install -y python3 g++ build-essential && \
  npm install --production && \
  apt-get autoremove -y && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app/bundle
# Exposing the necessary port
EXPOSE 3000

# Starting the app
CMD ["node", "main.js"]