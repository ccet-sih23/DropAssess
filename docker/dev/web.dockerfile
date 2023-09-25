FROM node:20-alpine

WORKDIR /app

COPY ../../web/package.json ./
COPY ../../web/yarn.lock ./

CMD yarn; npx zenstack generate && npx prisma db push; npx prisma generate; npx prisma studio & yarn dev