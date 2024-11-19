import psutil
import os
import time
import mysql.connector
from datetime import datetime
import pytz 
from cpuinfo import get_cpu_info
import subprocess


config = {
    'user': 'root',
    'password': '#Gf47722899846',
    'host': 'localhost',
    'database': 'StaffWatch'
}

# Estabelecendo a conexão
try:
    mydb = mysql.connector.connect(**config)
    if mydb.is_connected():
        print('Conexão bem-sucedida!')
except mysql.connector.Error as err:
    print(f'Erro: {err}')

def insere_armazenamento_ram_total():
    cursor = mydb.cursor()

    # Captura do armazenamento total da memória RAM
    ram_total = psutil.virtual_memory().total / (1024 ** 3)  # Converte de bytes para GB
    ram_total_str = f"Armazenamento total: {ram_total:.2f} GB"  # Formata o valor como string

    print(ram_total_str)

    add_armazenamento_ram = ("""INSERT INTO captura
                                (modelo, fkComponente, fkComputador, fkAuxComponente)
                                VALUES (%s, %s, %s, %s)""")
    data_armazenamento_ram = (ram_total_str, 2, 1, 16)  # Ajuste as FKs conforme necessário
    cursor.execute(add_armazenamento_ram, data_armazenamento_ram)
    mydb.commit()
    print("Registro inserido - armazenamento total da memória RAM")
insere_armazenamento_ram_total()

def insere_modelo_placa_rede():
    cursor = mydb.cursor()

    # Captura do modelo da placa de rede
    if os.name == 'posix':  # Para sistemas Linux
        output = os.popen("lshw -C network | grep 'product'").read()  # Utiliza lshw para obter informações sobre o hardware
        lines = output.splitlines()
        
        network_model = lines[2].strip()
        print("Modelo da Placa de Rede:", network_model)

        add_modelo_placa_rede = ("""INSERT INTO captura
                                    (modelo, fkComponente, fkComputador, fkAuxComponente)
                                    VALUES (%s, %s, %s, %s)""")
        data_modelo_placa_rede = (network_model, 2, 1, 15)  # Ajuste as FKs conforme necessário
        cursor.execute(add_modelo_placa_rede, data_modelo_placa_rede)
        mydb.commit()
        print("Registro inserido - modelo da placa de rede")

    elif os.name == 'nt':  # Para sistemas Windows
        output = os.popen("wmic nic get Description").read()
        lines = output.splitlines()

        network_model = lines[2].strip()
        print("Modelo da Placa de Rede:", network_model)

        add_modelo_placa_rede = ("""INSERT INTO captura
                                    (modelo, fkComponente, fkComputador, fkAuxComponente)
                                    VALUES (%s, %s, %s, %s)""")
        data_modelo_placa_rede = (network_model, 1, 1, 15)  # Ajuste as FKs conforme necessário
        cursor.execute(add_modelo_placa_rede, data_modelo_placa_rede)
        mydb.commit()
        print("Registro inserido - modelo da placa de rede")
insere_modelo_placa_rede()

def insere_modelo_cpu():
    cursor = mydb.cursor()
    cpu_info = get_cpu_info()
    modelo_cpu = cpu_info['brand_raw']
    print("Modelo da CPU:", modelo_cpu)
    
    add_modelo_cpu = ("""INSERT INTO captura
                         (modelo, fkComponente, fkComputador, fkAuxComponente)
                         VALUES (%s, %s, %s, %s)""")
    data_modelo_cpu = (modelo_cpu, 4, 1, 13)  # Ajuste os valores das FKs conforme necessário
    cursor.execute(add_modelo_cpu, data_modelo_cpu)
    mydb.commit()
    print("Registro inserido - modelo da CPU")


def insere_modelo_disco():
    cursor = mydb.cursor()

    # Captura do modelo do disco
    if os.name == 'posix':  # Para sistemas Linux
        output = os.popen("lsblk -d -o name,model").read()
        lines = output.splitlines()

        disk_model = lines[2].strip()            
        print("Modelo do Disco:", disk_model)

        add_modelo_disco = ("""INSERT INTO captura
                               (modelo, fkComponente, fkComputador, fkAuxComponente)
                               VALUES (%s, %s, %s, %s)""")
        data_modelo_disco = (disk_model, 3, 1, 14)  # Ajuste as FKs conforme necessário
        cursor.execute(add_modelo_disco, data_modelo_disco)
        mydb.commit()
        print("Registro inserido - modelo do disco")
        
    elif os.name == 'nt':  # Para sistemas Windows
        output = os.popen("wmic diskdrive get model").read()
        lines = output.splitlines()        

        disk_model = lines[2].strip()            
        print("Modelo do Disco:", disk_model)

        add_modelo_disco = ("""INSERT INTO captura
                               (modelo, fkComponente, fkComputador, fkAuxComponente)
                               VALUES (%s, %s, %s, %s)""")
        data_modelo_disco = (disk_model, 3, 1, 14)  # Ajuste as FKs conforme necessário
        cursor.execute(add_modelo_disco, data_modelo_disco)
        mydb.commit()
        print("Registro inserido - modelo do disco")


def print_system_info():
    cursor = mydb.cursor()
    fuso_sao_paulo = pytz.timezone("America/Sao_Paulo")
    agora = datetime.now(fuso_sao_paulo)

    # Exibe o uso de memória
    mem = psutil.virtual_memory()
    print(f"\nUso de RAM: {mem.percent}% ({mem.used / (1024 ** 3):.2f} GB usado de {mem.total / (1024 ** 3):.2f} GB total)")

    # Exibe o uso de disco
    disk = psutil.disk_usage('/')
    print(f"Uso de Disco: {disk.percent}% ({disk.used / (1024 ** 3):.2f} GB usado de {disk.total / (1024 ** 3):.2f} GB total)")

    # Exibe o uso da CPU
    cpu_percent = psutil.cpu_percent(interval=None)
    print(f"Uso Total da CPU: {cpu_percent}%")

    # Exibe o uso da rede
    net_io = psutil.net_io_counters()
    print(f"\nUso de Rede:")
    print(f"  Bytes recebidos: {net_io.bytes_recv / (1024 ** 1):.2f} KB")
    print(f"  Bytes enviados: {net_io.bytes_sent / (1024 ** 1):.2f} KB")
    print(f"  Pacotes recebidos: {net_io.packets_recv}")
    print(f"  Pacotes enviados: {net_io.packets_sent}")

    monitor_system()


def monitor_system(interval=5):
    while True:
        print_system_info()
        time.sleep(interval)


if __name__ == "__main__":
    insere_modelo_cpu()
    insere_modelo_disco()  # Captura o modelo do disco
    print_system_info()
    #monitor_system()