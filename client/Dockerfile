# Stage 1
FROM node:18 as build-stage

WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.20.2

# attempt
COPY nginx.conf /etc/nginx/conf.d/default.conf 

COPY --from=build-stage /client/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'

# # Set the user to use when running this image
# USER node