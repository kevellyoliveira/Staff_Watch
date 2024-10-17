# Use uma imagem base oficial do Python
FROM python:3.9-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

#instalando as bibliotecas que usamos no script
RUN pip install psutil mysql-connector-python
RUN apt-get update && apt-get install -y python3-tk


# Copie o script Python para dentro do contêiner
COPY TestePython3-minimenu.py .

# Defina o comando a ser executado ao iniciar o contêiner
CMD ["python", "TestePython3-minimenu.py"]