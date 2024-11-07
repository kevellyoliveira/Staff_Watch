#!/bin/bash

# Atualizar Instancia
echo "Atualizando Instância"
sudo apt upgrade && sudo apt update -y

echo "Instalando o docker e compose"

sudo apt install docker.io -y

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
