#!/bin/bash

# Atualizar Instancia
echo "Atualizando Instância"
sudo apt upgrade && sudo apt update -y

#Verificar versão Java
echo "Verificando versão do Java"
java -version

#Baixar Java
echo "Verificando se o Java já está instalado"
if [ $? = 0 ]; #se retorno for igual a 0
then #entao,
echo “Cliente possui java instalado!”
else #se nao,
echo “Cliente não possui java instalado!”
sudo apt install openjdk-17-jre -y 
fi #fecha o if


#Verificar versão Python
echo "Verificando versão do Python"
python3 --version
pip3 --version

#Baixar Python
echo "Verificando se Python já está instalado"
if [ $? = 0 ]; #se retorno for igual a 0
then #entao,
echo “Cliente possui python instalado!”
else #se nao,
echo “Cliente não possui python instalado!”
sudo apt install python3 -y
sudo apt install python3-pip -y 
fi #fecha o if

#Verificar versão Sql
echo "Verificando versão do MySql"
mysql --version

#Baixar Sql
# echo "Verificando se o MySql já está instalado"
# if [ $? = 0 ]; #se retorno for igual a 0
# then #entao,
# echo “Cliente possui mysql instalado!” 
# else #se nao,
# echo “Cliente não possui mysql instalado!”
# sudo apt install mysql-server -y 
# fi #fecha o if

#Verificar versão Node
echo "Verificando versão do Node"
nodejs --version
npm --version

# #Baixar Node
# echo "Verificando se o Node já está instalado"
# if [ $? = 0 ]; #se retorno for igual a 0
# then #entao,
# echo “Cliente possui Node instalado!” 
# else #se nao,
# echo “Cliente não possui Node instalado!”
# sudo apt install nodejs -y 
# sudo apt install npm -y
# fi #fecha o if

#Baixar Docker
sudo apt install docker.io -y

# criando uma rede para os containers se comunicarem entre si
sudo docker network create redeContainers

#liberando a porta do mysql caso esteja rodando na vm
sudo systemctl stop mysql

echo "Baixando imagem do MySQL..."
sudo docker pull eduardomiyasaki/staffwatch:bancov1
echo "Instanciando imagem do MySQL..."
sudo docker run -d -p 3306:3306 --name containerMysql --network redeContainers eduardomiyasaki/staffwatch:bancov1
echo "aguardando instalações do MySQL........"
sleep 5

# echo "Baixando imagem do Kotlin..."
# sudo docker pull eduardomiyasaki/captura-kotlin-cliente:v1
# echo "Instanciando imagem do Kotlin..."
# sudo docker run -it -d -p 8081:8081 --name containerKotlin --network redeContainers eduardomiyasaki/captura-kotlin-cliente:v1


echo "Baixando imagem do site..."
sudo docker pull eduardomiyasaki/staffwatch:sitev1 
echo "Instanciando imagem do site..."
sudo docker run -d -p 3333:3333 --name containerSite --network redeContainers eduardomiyasaki/staffwatch:sitev1 


# echo "Baixando imagem do Python..."
# sudo docker pull eduardomiyasaki/captura-python-cliente:v3
# echo "Instanciando imagem do Python..."
# sudo docker run -d -p 5000:5000 --name containerPython --network redeContainers eduardomiyasaki/captura-python-cliente:v3

# # iniciando o container de Python (que depende do MySQL), caso os 5 segundos do MySQL não tenham sido suficientes, para garantir que todos os containers sejam criados completamente
# echo "aguardando instalações........"
# sleep 10
# sudo docker start containerPython



