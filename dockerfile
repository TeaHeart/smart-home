FROM node:18-alpine 

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm && \
    pnpm install && \
    pnpm build

EXPOSE 3000

CMD ["node", "src/server/main.js"]