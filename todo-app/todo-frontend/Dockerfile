# Etapa de construcción
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_BACKEND_URL=http://localhost:3000
RUN npm run build

# Etapa de pruebas
FROM node:16 AS test
WORKDIR /app
COPY --from=build /app .
RUN npm test

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
