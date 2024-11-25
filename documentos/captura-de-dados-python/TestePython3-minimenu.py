import psutil
import os
import time
import mysql.connector
from datetime import datetime
import pytz 
from cpuinfo import get_cpu_info
from ping3 import ping

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

    if memPerc >= 80:
        if memPerc >= 90:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 2 AND fkAuxComponente = 8 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - memória")

        else: # entre 80 e 89
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 2 AND fkAuxComponente = 8 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (1, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta amarelo inserido - memória")


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

    if discoPerc >= 80:
        if discoPerc >= 90:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 3 AND fkAuxComponente = 11
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - disco")

        else: # entre 80 e 89
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 3 AND fkAuxComponente = 11 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (1, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta amarelo inserido - disco")

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

    if cpu_percent >= 80:
        if cpu_percent >= 90:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 4 AND fkAuxComponente = 12 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - cpu")

        else: # entre 80 e 89
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 4 AND fkAuxComponente = 12 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (1, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta amarelo inserido - cpu")

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

    # obtendo ping
    host = "google.com"
    latency = ping(host)
    if latency is None:
        latency = -1
    else:
        latency = round(latency * 1000, 2)

    # obtendo pacotes perdidos
    lost = 0
    for _ in range(5):
        response = ping(host, timeout=2)
        if response is None:
            lost += 1
    packet_loss = (lost / 5) * 100
    print(packet_loss, "perda de pacotes------------------------")

    add_rede = ("""INSERT INTO captura
                (idCaptura, captura, dataCaptura, fkAuxComponente,fkComponente, fkComputador, modelo) VALUES 
                (default,%s,%s,2,1,%s,%s),
                (default,%s,%s,3,1,%s,%s),
                (default,%s,%s,4,1,%s,%s),
                (default,%s,%s,5,1,%s,%s),
                (default,%s,%s,20,1,%s,%s),
                (default,%s,%s,21,1,%s,%s);""")

    data_rede = [bytesEnv, agora, fk_computador, network_model,
                 bytesReceb, agora, fk_computador, network_model,
                 pctReceb, agora, fk_computador, network_model,
                 pctEnv, agora, fk_computador, network_model,
                 latency, agora, fk_computador, network_model,
                 packet_loss, agora, fk_computador, network_model]

    cursor.execute(add_rede, data_rede)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - rede")

    if latency >= 50:
        if latency >= 100:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 1 AND fkAuxComponente = 20 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - rede latency")

        else: # entre 80 e 89
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 1 AND fkAuxComponente = 20 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (1, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta amarelo inserido - rede latency")

    if packet_loss >= 2:
        if packet_loss >= 4:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 1 AND fkAuxComponente = 21 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - rede pctPerdidos")

        else: # entre 80 e 89
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                    fkComponente = 1 AND fkAuxComponente = 21 
                    ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (1, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta amarelo inserido - rede pctPerdidos")

def main():
    print("Bem-vindo ao monitor de sistema!")
    
    fk_computador = int(input("Insira a fkComputador para monitoramento (ou 0 para sair): "))
    
    if fk_computador == 0:
        print("Saindo do programa...")
        return
    
    while True:
        print_system_info(fk_computador)
        time.sleep(2)

if __name__ == "__main__":
    main()
