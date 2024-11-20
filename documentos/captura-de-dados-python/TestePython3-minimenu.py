import psutil
import os
import time
import mysql.connector
from datetime import datetime
import pytz 
from cpuinfo import get_cpu_info

config = {
    'user': 'root',
    'password': 'sptech',
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


def print_system_info(fk_computador):
    cursor = mydb.cursor()
    fuso_sao_paulo = pytz.timezone("America/Sao_Paulo")
    agora = datetime.now(fuso_sao_paulo)

    # --------------------------------------------------------------------------------
    # Obtém e exibe o uso de memória RAM

    mem = psutil.virtual_memory()
    print(f"\nUso de RAM: {mem.percent}% ({mem.used / (1024 ** 3):.2f} GB usado de {mem.total / (1024 ** 3):.2f} GB total)")
    memUso = mem.used / (1024 ** 3)
    memTotal = mem.total / (1024 ** 3)
    ram_total_str = f"Armazenamento total: {memTotal:.2f} GB"
    memPerc = mem.percent

    add_mem = ("""INSERT INTO captura
                (idCaptura, captura, dataCaptura, fkAuxComponente, fkComponente, fkComputador, modelo)
                VALUES (default,%s,%s,6,2,%s,%s),
                (default,%s,%s,7,2,%s,%s),
                (default,%s,%s,8,2,%s,%s)""")

    data_mem = [memUso, agora, fk_computador, ram_total_str,
                memTotal, agora, fk_computador, ram_total_str,
                memPerc, agora, fk_computador, ram_total_str]

    cursor.execute(add_mem, data_mem)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - memória")

    # --------------------------------------------------------------------------------
    # Obtém e exibe o uso de disco
    disk = psutil.disk_usage('/')
    print(f"Uso de Disco: {disk.percent}% ({disk.used / (1024 ** 3):.2f} GB usado de {disk.total / (1024 ** 3):.2f} GB total)")
    discoUso = disk.used / (1024 ** 3)
    discoTotal = disk.total / (1024 ** 3)
    discoPerc = disk.percent

    if os.name == 'posix':  # Para sistemas Linux
        output = os.popen("lsblk -d -o name,model").read()
        lines = output.splitlines()
        disk_model = lines[2].strip()            
    elif os.name == 'nt':  # Para sistemas Windows
        output = os.popen("wmic diskdrive get model").read()
        lines = output.splitlines()        
        disk_model = lines[2].strip()

    add_disco = ("""INSERT INTO captura
                (idCaptura, captura, dataCaptura, fkAuxComponente, fkComponente, fkComputador, modelo)
                VALUES 
                (default,%s,%s,9,3,%s,%s),
                (default,%s,%s,10,3,%s,%s),
                (default,%s,%s,11,3,%s,%s)""")

    data_disco = [discoUso, agora, fk_computador, disk_model,
                  discoTotal, agora, fk_computador, disk_model,
                  discoPerc, agora, fk_computador, disk_model]

    cursor.execute(add_disco, data_disco)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - disco")

    # --------------------------------------------------------------------------------
    # Obtém e exibe o uso da CPU
    cpu_percent = psutil.cpu_percent(interval=None)
    cpu_info = get_cpu_info()
    modelo_cpu = cpu_info['brand_raw']
    print("Modelo da CPU:", modelo_cpu)

    add_cpu = ("""INSERT INTO captura
            (idCaptura, captura, dataCaptura, fkAuxComponente, fkComponente, fkComputador, modelo) VALUES 
            (default,%s,%s,12,4,%s,%s)""")

    data_cpu = [cpu_percent, agora, fk_computador, modelo_cpu]

    cursor.execute(add_cpu, data_cpu)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - cpu")

    # --------------------------------------------------------------------------------
    # Obtém e exibe o uso da rede
    net_io = psutil.net_io_counters()
    bytesReceb = net_io.bytes_recv / (1024 ** 2)
    bytesEnv = net_io.bytes_sent / (1024 ** 2)
    pctReceb = net_io.packets_recv
    pctEnv = net_io.packets_sent

    if os.name == 'posix':  
        output = os.popen("lshw -C network | grep 'product'").read()
        lines = output.splitlines()
        network_model = lines[2].strip()
    elif os.name == 'nt':  
        output = os.popen("wmic nic get Description").read()
        lines = output.splitlines()
        network_model = lines[2].strip()

    add_rede = ("""INSERT INTO captura
                (idCaptura, captura, dataCaptura, fkAuxComponente,fkComponente, fkComputador, modelo) VALUES 
                (default,%s,%s,2,1,%s,%s),
                (default,%s,%s,3,1,%s,%s),
                (default,%s,%s,4,1,%s,%s),
                (default,%s,%s,5,1,%s,%s)""")

    data_rede = [bytesEnv, agora, fk_computador, network_model,
                 bytesReceb, agora, fk_computador, network_model,
                 pctReceb, agora, fk_computador, network_model,
                 pctEnv, agora, fk_computador, network_model]

    cursor.execute(add_rede, data_rede)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - rede")

def main():
    print("Bem-vindo ao monitor de sistema!")
    while True:
        try:
            fk_computador = int(input("Insira a fkComputador para monitoramento (ou 0 para sair):0 "))
            if fk_computador == 0:
                print("Saindo do programa...")
                break
            print_system_info(fk_computador)
        except ValueError:
            print("Entrada inválida. Por favor, insira um número inteiro.")

if __name__ == "__main__":
    main()
