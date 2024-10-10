# Utilizando uma imagem base do mysql como imagem
FROM mysql:latest
# AS build

# Definir variáveis de ambiente para o MySQL
ENV MYSQL_ROOT_PASSWORD=senha_segura
ENV MYSQL_DATABASE=StaffWatch

# Copiando o script Mysql para pasta app de dentro do container
COPY /scriptStaffWatch.sql /docker-entrypoint-initdb.d/

# Expondo a porta 3306 para fazer as chamadas aqui
EXPOSE 3306