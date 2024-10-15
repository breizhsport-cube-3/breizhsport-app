FROM node:20-alpine

RUN apk add --no-cache make && \
    if ! yarn --version >/dev/null 2>&1; then npm install -g yarn; fi

WORKDIR /app

COPY . .

RUN yarn install

CMD ["sh"]