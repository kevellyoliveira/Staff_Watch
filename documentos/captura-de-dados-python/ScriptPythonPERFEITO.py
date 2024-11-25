 import psutil
import os
from ping3 import ping
import time
import mysql.connector
from datetime import datetime
import pytz
from cpuinfo import get_cpu_info

config = {
    'user': 'root',
    'password': 'Crfsruan1',
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

    # --------------------- Uso de Memória RAM ---------------------
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

    # --------------------- Uso de Disco ---------------------
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

    # --------------------- Uso de CPU ---------------------
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

    # --------------------- Uso de Rede ---------------------
    net_io = psutil.net_io_counters()
    bytesReceb = net_io.bytes_recv / (1024 ** 2)
    bytesEnv = net_io.bytes_sent / (1024 ** 2)
    pctReceb = net_io.packets_recv
    pctEnv = net_io.packets_sent

    trafegoRede = byesReceb + bytesEnv

    

    #------------------------------------ Nova biblioteca para dados de rede ------------------------------------
    #daq para baixo adaptar no menu python
    host = "8.8.8.8"  # DNS do Google como exemplo

    # Tempo de resposta
    latencia = medir_tempo_resposta(host)
    print(f"Tempo de resposta: {latencia:.2f} ms")

    # Perda de pacotes
    perda = calcular_perda_pacotes(host, pacotes=10)
    print(f"Perda de pacotes: {perda:.2f}%")


    # Tempo médio entre falhas
    tempo_medio_falhas = monitorar_falhas(host, intervalo=5, duracao=20)

    print(f"Tempo médio entre falhas: {tempo_medio_falhas:.2f} segundos")
    if isinstance(tempo_medio_falhas, float):
        print(f"Tempo médio entre falhas: {tempo_medio_falhas:.2f} segundos")
    else:
        print(tempo_medio_falhas)


    # Tempo de inatividade
    inatividade = monitorar_inatividade(host="8.8.8.8", intervalo=5, duracao=30)
    print(f"Tempo total de inatividade: {inatividade:.2f} horas")

    #------------------------------------------------------------------------------------------------------------

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
                (default,%s,%s,5,1,%s,%s),
                (default,%s,%s,23,1,%s,%s),
                (default,%s,%s,24,1,%s,%s),
                (default,%s,%s,25,1,%s,%s),
                (default,%s,%s,26,1,%s,%s),
                (default,%s,%s,27,1,%s,%s)""")

    data_rede = [bytesEnv, agora, fk_computador, network_model,
                 bytesReceb, agora, fk_computador, network_model,
                 pctReceb, agora, fk_computador, network_model,
                 pctEnv, agora, fk_computador, network_model,
                 latencia, agora, fk_computador, network_model,
                 perda, agora, fk_computador, network_model,
                 tempo_medio_falhas, agora, fk_computador, network_model,
                 inatividade, agora, fk_computador, network_model,
                 trafegoRede, agora, fk_computador, network_model]

    cursor.execute(add_rede, data_rede)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - rede")

# 1. Tempo de resposta (latência)
def medir_tempo_resposta(host="8.8.8.8"):
    """
    Mede o tempo de resposta (latência) para um host específico.
    """
    resposta = ping(host, timeout=1)
    if resposta is None:
        return -1
    return int(resposta * 1000)  # Convertido para milissegundos

# 2. Perda de pacotes
def calcular_perda_pacotes(host="8.8.8.8", pacotes=10):  # Para monitorar de forma mais realista, deve-se aumentar os pacotes (por exemplo, pacotes=100)
    """
    Calcula a porcentagem de pacotes perdidos para um host específico.
    """
    pacotes_perdidos = 0
    for _ in range(pacotes):
        if ping(host, timeout=1) is None:
            pacotes_perdidos += 1
    return int((pacotes_perdidos / pacotes) * 100)  # Percentual de pacotes perdidos

# 3. Tempo médio entre falhas
def monitorar_falhas(host="8.8.8.8", intervalo=10, duracao=20):  
    """
    Monitora falhas de conexão em um host específico e calcula o tempo médio entre falhas em minutos.
    """
    falhas = []
    inicio = time.time()
    while time.time() - inicio < duracao:
        if ping(host, timeout=1) is None:
            falhas.append(time.time())
        time.sleep(intervalo)

    if len(falhas) > 1:
        # Calcula os intervalos entre falhas e converte para minutos
        tempos_entre_falhas = [(falhas[i] - falhas[i-1]) / 60 for i in range(1, len(falhas))]
        return int(sum(tempos_entre_falhas) / len(tempos_entre_falhas))  # Média em minutos
    elif len(falhas) == 1:
        return 1
    else:
        return 0

# 4. Tempo de inatividade
def monitorar_inatividade(host="8.8.8.8", intervalo=10, duracao=20):
    """
    Monitora falhas de conexão em um host específico e calcula o tempo de inatividade em horas.
    """
    falhas = []
    inicio = time.time()
    while time.time() - inicio < duracao:
        if ping(host, timeout=1) is None:
            falhas.append(time.time())
        time.sleep(intervalo)

    # Se houver falhas, calcula o tempo total de inatividade
    if len(falhas) > 1:
        # Calcula o tempo total de inatividade em segundos
        inatividade_total_segundos = sum([falhas[i] - falhas[i-1] for i in range(1, len(falhas))])
        
        # Converte o tempo de inatividade de segundos para horas
        inatividade_total_horas = inatividade_total_segundos / 3600  # 1 hora = 3600 segundos
        
        return inatividade_total_horas  # Tempo total de inatividade em horas
    else:
        return 0  # Nenhuma falha foi detectada
    

def main():
    print("Bem-vindo ao monitor de sistema!")
    try:
        fk_computador = int(input("Insira a fkComputador para monitoramento (ou 0 para sair): "))
        if fk_computador == 0:
            print("Saindo do programa...")
            return

        print(f"Iniciando o monitoramento para fkComputador: {fk_computador}")
        while True:
            print_system_info(fk_computador)
            time.sleep(10)  # Aguarda 10 segundos entre capturas

    except ValueError:
        print("Entrada inválida. Por favor, insira um número inteiro.")
    except KeyboardInterrupt:
        print("\nMonitoramento interrompido pelo usuário.")
    finally:
        if mydb.is_connected():
            mydb.close()
            print("Conexão com o banco de dados encerrada.")


if __name__ == "__main__":
    main()
