FROM node:20 AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --ignore-scripts
COPY . .
RUN pnpm build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]