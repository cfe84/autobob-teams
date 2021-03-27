FROM node:12-alpine AS build
WORKDIR /build
COPY package*.json ./
RUN npm install

COPY src ./src
COPY test ./test
COPY tsconfig.json ./
RUN npm run build
RUN npm run test

FROM build AS final

WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist

ARG BotId=""
ARG BotPassword=""

CMD node dist/index.js