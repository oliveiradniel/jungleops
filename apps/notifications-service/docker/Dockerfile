FROM node:22-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/notifications-service/package.json ./apps/notifications-service/package.json

RUN npm install

COPY apps/notifications-service ./apps/notifications-service

USER root

RUN apk add --no-cache postgresql-client

COPY apps/notifications-service/docker/init.sh /app/init.sh

RUN chmod +x /app/init.sh

EXPOSE 3003

ENTRYPOINT ["sh", "/app/init.sh"]

CMD ["npm", "run", "start:dev"]
