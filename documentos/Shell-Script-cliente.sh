#!/bin/bash

# Verifica a versão do Java
java -version
if [ $? = 0 ]; then  # Se o retorno for igual a 0 (Java instalado)
    echo "Java instalado"
else
    echo "Java não instalado"
    echo "Gostaria de instalar o Java? [s/n]"
    read get
    if [ "$get" = "s" ]; then  # Se a resposta for "s"
        sudo apt install openjdk-17-jre -y
    fi
fi

# Verifica a versão do Python
python -version
if [ $? = 0 ]; then  # Se o retorno for igual a 0 (Python instalado)
    echo "Python instalado"
else
    echo "Python não instalado"
    echo "Gostaria de instalar o Python? [s/n]"
    read get
    if [ "$get" = "s" ]; then  # Se a resposta for "s"
        sudo apt install python -y
    fi
fi

# Instala o Docker e configura as imagens do DockerHub
sudo apt install docker.io -y

echo "Instalando a imagem de Kotlin"
sudo docker pull eduardomiyasaki/captura-kotlin-cliente:v1

echo "Instanciando o container, com a imagem do DockerHub (Kotlin)"
sudo docker run -d -p 8081:8081 --name containerkotlincliente eduardomiyasaki/captura-kotlin-cliente:v1

echo "Instalando a imagem de Python"
sudo docker pull eduardomiyasaki/captura-python-cliente:v3

echo "Instanciando o container, com a imagem do DockerHub (Python)"
sudo docker run -d -p 5000:5000 --name containerpythoncliente eduardomiyasaki/captura-python-cliente:v3
