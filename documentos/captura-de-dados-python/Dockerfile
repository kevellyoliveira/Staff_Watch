# Use uma imagem base oficial do Python
FROM python:3.9-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

#instalando as bibliotecas que usamos no script
RUN pip install psutil mysql-connector-python

# Copie o script Python para dentro do contêiner
COPY scriptPython.py .

# Defina o comando a ser executado ao iniciar o contêiner
CMD ["python", "scriptPython.py"]