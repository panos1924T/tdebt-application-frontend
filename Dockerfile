FROM node:22-alpine AS build

WORKDIR /app

RUN npm install -g npm@11.6.2

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/tdebt-frontend/browser /usr/share/nginx/html

EXPOSE 80
