FROM node:20

WORKDIR /app

# Copia todo de una vez al principio
COPY frontend .

# Instala dependencias (esto usará .env si es necesario)
RUN npm ci

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
