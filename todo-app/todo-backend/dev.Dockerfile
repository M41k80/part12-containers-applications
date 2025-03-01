# Usar una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Instalar Nodemon globalmente para desarrollo
RUN npm install -g nodemon

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend
EXPOSE 3000

# Comando para iniciar el servidor con Nodemon
CMD ["nodemon", "index.js"]
