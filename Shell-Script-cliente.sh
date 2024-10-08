!/bin/bash

echo “Meu primeiro shell script”
echo “O diretório corrente é”
pwd
echo “O conteúdo do diretório corrente é”
ls

java -version #verifica versao atual do java
if [ $? = 0 ]; #se retorno for igual a 0
then #entao,
echo “java instalado” #print no terminal
else #se nao,
echo “java não instalado” #print no terminal
echo “gostaria de instalar o java? [s/n]” #print no terminal
read get #variável que guarda resposta do usuário
if [ \“$get\” == \“s\” ]; #se retorno for igual a s
then #entao
sudo apt install openjdk-17-jre -y #executa instalacao do java
fi #fecha o 2º if
fi #fecha o 1º if

python -version 
if [ $? = 0 ]; 
then 
echo “python instalado” 
else 
echo “python não instalado” 
echo “gostaria de instalar o python? [s/n]” 
read get 
if [ \“$get\” == \“s\” ];
then 
sudo apt install python -y 
fi
fi 

echo "Instalando a imagem do dockerhub"
sudo docker pull fermoselle/looca:desafio

echo "Instanciando o container, com a imagem do dockerHub"
sudo docker run -d -p 8081:8081 --name containerkotlincliente fermoselle/looca:desafio