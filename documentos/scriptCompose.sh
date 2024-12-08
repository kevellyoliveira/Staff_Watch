#!/bin/bash

# Atualizar Instancia
echo "Atualizando Instância"
sudo apt upgrade && sudo apt update -y

echo "Instalando o docker e compose"

sudo apt install docker.io -y

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# Atualizar pacotes
log "Atualizando os pacotes do sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar dependências básicas
log "Instalando dependências básicas..."
sudo apt install -y wget curl gnupg software-properties-common lsb-release

# Instalar R
log "Adicionando repositório CRAN para R..."
curl -fsSL https://cloud.r-project.org/bin/linux/ubuntu/marutter_pubkey.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/cran.gpg
echo "deb [signed-by=/etc/apt/trusted.gpg.d/cran.gpg] https://cloud.r-project.org/bin/linux/ubuntu $(lsb_release -cs)-cran40/" | sudo tee /etc/apt/sources.list.d/cran.list

log "Atualizando repositórios e instalando R..."
sudo apt update
sudo apt install -y r-base

# Verificar instalação do R
if command -v R >/dev/null; then
  log "R instalado com sucesso! Versão:"
  R --version
else
  error "Erro ao instalar o R."
  exit 1
fi

# Instalar Pandoc
log "Instalando o Pandoc..."

# Baixar a última versão do Pandoc
PANDOC_URL=$(curl -s https://api.github.com/repos/jgm/pandoc/releases/latest | grep browser_download_url | grep amd64.deb | cut -d '"' -f 4)

if [ -z "$PANDOC_URL" ]; then
  error "Erro ao obter a URL da última versão do Pandoc."
  exit 1
fi

wget "$PANDOC_URL" -O pandoc-latest-amd64.deb

# Instalar o pacote .deb
sudo dpkg -i pandoc-latest-amd64.deb

# Corrigir dependências, se necessário
sudo apt-get install -f -y

# Verificar instalação do Pandoc
if command -v pandoc >/dev/null; then
  log "Pandoc instalado com sucesso! Versão:"
  pandoc --version
else
  error "Erro ao instalar o Pandoc."
  exit 1
fi

# Limpar arquivos temporários
log "Limpando arquivos temporários..."
rm -f pandoc-latest-amd64.deb

log "Instalação concluída com sucesso! R e Pandoc estão prontos para uso."







