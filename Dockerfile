# Usamos uma imagem oficial do Node.js como base, sempre pegando a versão mais recente
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner

RUN apk add --no-cache git

WORKDIR /usr/app

# Clona o repositório do GitHub onde está o código da aplicação

# COPY package-lock.json /usr/app/
# COPY package.json /usr/app/

# COPY /.vscode/ /usr/app/.vcscode/
# # COPY /Staff_Watch/node_modules/ /usr/app/node_modules/
# COPY /public/ /usr/app/public/
# COPY /src/ /usr/app/src/
# COPY /.env /usr/app/
# COPY /.env.dev /usr/app/
# COPY /app.js /usr/app/

RUN git clone https://github.com/kevellyoliveira/Staff_Watch.git

# Muda para o diretório onde está o código da aplicação web dentro do projeto clonado

WORKDIR /usr/app/Staff_Watch

# Instala as dependências do Node.js definidas no package.json

RUN npm install

# Expõe a porta desenvolvimento:3333 ou produção:8080 ou 80 do contêiner, que será usada para acessar a aplicação pela web

EXPOSE 3333

# Definindo o comando que será executado quando o contêiner iniciar
# Neste caso, ele executa "npm start" para iniciar a aplicação Node.js

CMD ["npm" ,"start"]