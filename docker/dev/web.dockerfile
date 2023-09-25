FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache git

CMD yarn; npx prisma db push; npx prisma generate; npx prisma studio & yarn dev