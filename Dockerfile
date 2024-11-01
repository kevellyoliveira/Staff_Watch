# Usamos uma imagem oficial do Node.js baseada em Ubuntu (node:18 já inclui npm)
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Instala o Git para permitir o clone do repositório
RUN apt-get update && apt-get install -y git

# Clona o repositório diretamente para /usr/app
RUN git clone https://github.com/kevellyoliveira/Staff_Watch.git .

# Verifica se o npm está disponível (para confirmar que o Node.js e npm estão configurados)
RUN node -v && npm -v

# Instala as dependências do Node.js definidas no package.json
RUN npm install

# Expõe a porta da aplicação
EXPOSE 3333

# Definindo o comando que será executado quando o contêiner iniciar
CMD ["npm", "start"]
