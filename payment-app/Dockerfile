FROM node:slim as builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY --from=builder /app/dist ./dist
RUN npm i
EXPOSE 4040
CMD ["npm", "start"]
