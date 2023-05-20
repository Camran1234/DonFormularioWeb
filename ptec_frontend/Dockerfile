FROM node:latest as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:latest
COPY --from=build /app/build /var/lib/frontend

CMD ["ls","/var/lib/frontend"]