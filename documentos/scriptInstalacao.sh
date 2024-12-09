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


#Verificar versão Node
echo "Verificando versão do Node"
nodejs --version
npm --version


#Baixar Docker
sudo apt install docker.io -y

# criando uma rede para os containers se comunicarem entre si
sudo docker network create redeContainers

#liberando a porta do mysql caso esteja rodando na vm
# sudo systemctl stop mysql

echo "Baixando imagem do Python..."
sudo docker pull izabellefigueiredo/staffwatch:python-oficial-temporeal
echo "Instanciando imagem do Python..."
sudo docker run -d -p 5000:5000 --name containerPython izabellefigueiredo/staffwatch:python-oficial-temporeal
echo "Instalando do python ........"
sleep 5

echo "Baixando imagem do Koltin..."
sudo docker pull eduardomiyasaki/sprint3:looca2
echo "Instanciando imagem do Python..."
sudo docker run -d -p 8081:8081 --name containerLooca eduardomiyasaki/sprint3:looca2
echo "Instalando Kotlin ........"
sleep 5

echo "Baixando imagem do Koltin..."
sudo docker pull eduardomiyasaki/sprint3:chamada2
echo "Instanciando imagem do Python..."
sudo docker run -d -p 8080:8080 --name containerChamada redeContainers eduardomiyasaki/sprint3:chamada2
echo "Instalando Kotlin ........"
sleep 5







