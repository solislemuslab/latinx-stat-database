FROM node:18

WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
CMD npm start

# Set the user to use when running this image
USER node