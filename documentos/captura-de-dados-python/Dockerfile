# Use uma imagem base oficial do Python
FROM python:3.9-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instale as bibliotecas que serão usadas no script
RUN apt-get update && apt-get install -y python3-tk
RUN pip install psutil mysql-connector-python pytz

# Instalar as bibliotecas necessárias via pip
RUN pip install --no-cache-dir \
    psutil \
    mysql-connector-python \
    pytz \
    ping3 \
    py-cpuinfo \
    asyncio

# Copie o script Python para dentro do contêiner
COPY scriptPythonParaCloud.py .

# Defina o comando a ser executado ao iniciar o contêiner
CMD ["python", "scriptPythonParaCloud.py"]
