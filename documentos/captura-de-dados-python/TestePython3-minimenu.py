import psutil
import os
from ping3 import ping
import time
import mysql.connector
from datetime import datetime, timedelta
import pytz
from cpuinfo import get_cpu_info
import asyncio

config = {
    'user': 'root',
    'password': '73917391',
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


async def print_system_info(fk_computador):
    cursor = mydb.cursor()
    
    #fuso_sao_paulo = pytz.timezone("America/Sao_Paulo")
    #agora = datetime.now(fuso_sao_paulo)
    start_date = datetime(2023, 12, 6)
    end_date = datetime(2024, 12, 6)
    agora = start_date


    while agora <= end_date:

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
        
        time.sleep(1)

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
                print(cursor.rowcount, "alerta vermelho inserido - ram")

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
                print(cursor.rowcount, "alerta amarelo inserido - ram")

        # --------------------- Uso de Disco ---------------------
        disk = psutil.disk_usage('/')
        print(f"Uso de Disco: {disk.percent}% ({disk.used / (1024 ** 3):.2f} GB usado de {disk.total / (1024 ** 3):.2f} GB total)")
        discoUso = disk.used / (1024 ** 3)
        discoTotal = disk.total / (1024 ** 3)
        discoPerc = disk.percent

        disk_io_before = psutil.disk_io_counters()
        time.sleep(1)  # Pausa de 1 segundo para medir as operações de I/O
        disk_io_after = psutil.disk_io_counters()

        read_ops = disk_io_after.read_count - disk_io_before.read_count
        write_ops = disk_io_after.write_count - disk_io_before.write_count

        disk_io_before = psutil.disk_io_counters()
        time.sleep(1)  # Pausa de 1 segundo para medir as operações de I/O
        disk_io_after = psutil.disk_io_counters()

        bytes_read = disk_io_after.read_bytes - disk_io_before.read_bytes
        bytes_written = disk_io_after.write_bytes - disk_io_before.write_bytes

        # Converte bytes para MB (dividindo por 1024*1024)
        read_throughput = bytes_read / 1024*1024   # em MB
        write_throughput = bytes_written / 1024*1024  # em MB

        print(f"Throughput de escrita do disco: {write_throughput:.2f} mB/s")
        print(f"Throughput de leitura do disco: {read_throughput:.2f} mB/s")

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
                    (default,%s,%s,11,3,%s,%s),
                    (default,%s,%s,22,3,%s,%s),
                    (default,%s,%s,23,3,%s,%s),
                    (default,%s,%s,24,3,%s,%s),
                    (default,%s,%s,25,3,%s,%s);""")

        data_disco = [discoUso, agora, fk_computador, disk_model,
                      discoTotal, agora, fk_computador, disk_model,
                      discoPerc, agora, fk_computador, disk_model,
                      read_ops, agora, fk_computador, disk_model,
                      write_ops, agora, fk_computador, disk_model,
                      read_throughput, agora, fk_computador, disk_model,
                      write_throughput, agora, fk_computador, disk_model
                      ]

        cursor.execute(add_disco, data_disco)
        mydb.commit()
        print(cursor.rowcount, "registro inserido - disco")

        if discoPerc >= 0:
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

        if read_ops  > 20:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                        fkComponente = 3 AND fkAuxComponente = 22
                        ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - disco")

        if write_ops  > 20:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                        fkComponente = 3 AND fkAuxComponente = 23
                        ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - disco")

        if read_throughput < 300000.00:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                        fkComponente = 3 AND fkAuxComponente = 24
                        ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - disco")

        if write_throughput < 300000.00:
            buscarID = ("""SELECT idCaptura FROM captura WHERE 
                        fkComponente = 3 AND fkAuxComponente = 25
                        ORDER BY idCaptura DESC LIMIT 1""")
            cursor.execute(buscarID)
            idObtido = cursor.fetchone() # obtém o resultado do select de buscarID!!!

            inserirAlerta = ("""INSERT INTO alerta (tipoAlerta, fkCaptura) 
                                VALUES (2, %s)""")
            dados_alerta = [idObtido[0]]  # Usa o primeiro elemento da tupla
            cursor.execute(inserirAlerta, dados_alerta)
            mydb.commit()
            print(cursor.rowcount, "alerta vermelho inserido - disco")

        

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

        trafegoRede = bytesReceb + bytesEnv

        if os.name == 'posix':
            output = os.popen("lshw -C network | grep 'product'").read()
            lines = output.splitlines()
            network_model = lines[2].strip()
        elif os.name == 'nt':
            output = os.popen("wmic nic get Description").read()
            lines = output.splitlines()
            network_model = lines[4].strip()

            print('--------------------------------------------')
            print("network_model ", network_model)


        # obtendo tempo médio entre falhas
        host = "8.8.8.8"
        task_falhas = asyncio.create_task(monitorar_falhas(fk_computador, host, intervalo=5, duracao=20))
        
        # obtendo tempo de inatividade
        task_inatividade = asyncio.create_task(monitorar_inatividade(fk_computador, host="8.8.8.8", intervalo=5, duracao=30))

        # obtendo ping
        host = "google.com"
        latency = ping(host)
        if latency is None:
            latency = -1
        else:
            latency = round(latency * 1000, 0)
            print(latency, "latencia de rede------------------------")


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
                    (default,%s,%s,21,1,%s,%s),
                    (default,%s,%s,27,1,%s,%s);""")

        data_rede = [bytesEnv, agora, fk_computador, network_model,
                     bytesReceb, agora, fk_computador, network_model,
                     pctReceb, agora, fk_computador, network_model,
                     pctEnv, agora, fk_computador, network_model,
                     latency, agora, fk_computador, network_model,
                     packet_loss, agora, fk_computador, network_model,
                     trafegoRede, agora, fk_computador, network_model]

        cursor.execute(add_rede, data_rede)
        mydb.commit()
        print(cursor.rowcount, "registro inserido - rede")

        agora += timedelta(days=1)

        
    # inserindo alertas de rede
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

                # tempo_medio_falhas = monitorar_falhas('8.8.8.8', 5, 20)

async def main():
    print("Bem-vindo ao monitor de sistema!")
    fk_computador = int(input("Insira a fkComputador para monitoramento (ou 0 para sair): "))
    if fk_computador == 0:
        print("Saindo do programa...")
        return

    while True:
        await print_system_info(fk_computador)
        await asyncio.sleep(2)

# Tempo médio entre falhas
async def monitorar_falhas(fk_computador, host="8.8.8.8", intervalo=10, duracao=20):  
    cursor = mydb.cursor()
    fuso_sao_paulo = pytz.timezone("America/Sao_Paulo")
    agora = datetime.now(fuso_sao_paulo)
    """
    Monitora falhas de conexão em um host específico e calcula o tempo médio entre falhas em minutos.
    """
    falhas = []
    inicio = time.time()
    while time.time() - inicio < duracao:
        if ping(host, timeout=1) is None:
            falhas.append(time.time())
        await asyncio.sleep(intervalo)  
        
    if len(falhas) > 1:
        # Calcula os intervalos entre falhas e converte para minutos
        tempos_entre_falhas = [(falhas[i] - falhas[i-1]) / 60 for i in range(1, len(falhas))]
        tempo_medio = int(sum(tempos_entre_falhas) / len(tempos_entre_falhas))  # Média em minutos
    elif len(falhas) == 1:
        tempo_medio = 1
    else:
        tempo_medio = 0
    
    # Inserir o resultado no banco
    add_falhas = """INSERT INTO captura
                    (idCaptura, captura, dataCaptura, fkAuxComponente, fkComponente, fkComputador, modelo)
                    VALUES
                    (default, %s, %s, 25, 1, %s, 'Monitoramento de Falhas')"""
    cursor.execute(add_falhas, [tempo_medio, agora, fk_computador])
    mydb.commit()
    print("Dados de falhas inseridos no banco.")
    
# 4. Tempo de inatividade
async def monitorar_inatividade(fk_computador, host="8.8.8.8", intervalo=10, duracao=20):
    cursor = mydb.cursor()
    fuso_sao_paulo = pytz.timezone("America/Sao_Paulo")
    agora = datetime.now(fuso_sao_paulo)
    """
    Monitora falhas de conexão em um host específico e calcula o tempo de inatividade em horas.
    """
    falhas = []
    inicio = time.time()
    while time.time() - inicio < duracao:
        if ping(host, timeout=1) is None:
            falhas.append(time.time())
        await asyncio.sleep(intervalo)

    if len(falhas) > 1:
        inatividade_total_segundos = sum([falhas[i] - falhas[i-1] for i in range(1, len(falhas))])
        inatividade_total_horas = inatividade_total_segundos / 3600
    else:
        inatividade_total_horas = 0

    # Inserir o resultado no banco
    add_inatividade = """INSERT INTO captura
                         (idCaptura, captura, dataCaptura, fkAuxComponente, fkComponente, fkComputador, modelo)
                         VALUES (default, %s, %s, 26, 1, %s, 'Monitoramento de Inatividade')"""
    cursor.execute(add_inatividade, [inatividade_total_horas, agora, fk_computador])
    mydb.commit()
    print("Dados de inatividade inseridos no banco.")
    


if __name__ == "__main__":
    asyncio.run(main())
