import psutil
import time
import mysql.connector
import tkinter as tk

#import os
#import dotenv

config = {
    'user': 'root',
    'password': '73917391',
    'host': 'localhost',
    'database': 'StaffWatch'
}
root = tk.Tk()
def sair():
    root.destroy()

# Estabelecendo a conexão
try:
    mydb = mysql.connector.connect(**config)
    if mydb.is_connected():
        print('Conexão bem-sucedida!')
except mysql.connector.Error as err:
    print(f'Erro: {err}')


def menu():
    print("="*60)
    print("1 - Iniciar monitoramento")
    print("2 - sair")
    print("="*60)
    opcao = input("Escolha uma opção: ")
    if opcao == "1":
        menu_python()
    elif opcao == "2":
        sair()
        
        

def menu_python():
            idComputador = input("Digite o id do computador que deseja monitorar: ")
            cursor = mydb.cursor()
            for i in range(15):
                mem = psutil.virtual_memory()
                print(f"\nUso de RAM: {mem.percent}% ({mem.used / (1024 ** 3):.2f} GB usado de {mem.total / (1024 ** 3):.2f} GB total)")
                memUso = mem.used / (1024 ** 3)
                memTotal = mem.total / (1024 ** 3)
                memPerc = mem.percent

                add_mem = ("""INSERT INTO captura
                            (idCaptura, captura,fkAuxComponente, fkComponente, fkComputador)
                            VALUES (default,%s,6,2,%s),
                            (default,%s,7,2,%s),
                            (default,%s,8,2,%s)""")

                data_mem = [memUso, idComputador, memTotal, idComputador, memPerc, idComputador]

                cursor.execute(add_mem, data_mem)
                mydb.commit()
                print(cursor.rowcount, "registro inserido - memória")

                # Obtém e exibe o uso de disco
                disk = psutil.disk_usage('/')
                print(f"Uso de Disco: {disk.percent}% ({disk.used / (1024 ** 3):.2f} GB usado de {disk.total / (1024 ** 3):.2f} GB total)")
                discoUso = disk.used / (1024 ** 3)
                discoTotal = disk.total / (1024 ** 3)
                discoPerc = disk.percent

                add_disco = ("""INSERT INTO captura
                            (idCaptura, captura,fkAuxComponente, fkComponente, fkComputador)
                            VALUES (default,%s,9,3,%s),
                            (default,%s,10,3,%s),
                            (default,%s,11,3,%s)""")

                data_disco = [discoUso,idComputador, discoTotal, idComputador, discoPerc,idComputador]

                cursor.execute(add_disco, data_disco)
                mydb.commit()
                print(cursor.rowcount, "registro inserido - disco")
                # Obtém e exibe o uso da CPU
                cpu_percent = psutil.cpu_percent(interval=None)

                add_cpu = ("""INSERT INTO captura
                            (idRegistro, Registro, fkAuxComponente,fkComponente, fkComputador)
                            VALUES (default,%s,12,4,%s)""")

                data_cpu = [cpu_percent, idComputador]

                cursor.execute(add_disco, data_disco)
                mydb.commit()
                print(cursor.rowcount, "registro inserido - cpu")

                print(f"Uso Total da CPU: {cpu_percent}%")
                cpuPerc = cpu_percent
                # Obtém e exibe o uso da CPU por núcleo
                cpu_per_core = psutil.cpu_percent(percpu=True, interval=None)
                print("Uso da CPU por Núcleo:")
                for i, perc in enumerate(cpu_per_core):
                    print(f"  Núcleo {i}: {perc}%")

                    # Obtém e exibe o uso da rede
                net_io = psutil.net_io_counters()
                print(f"\nUso de Rede:")
                print(f"  Bytes recebidos: {net_io.bytes_recv / (1024 ** 1):.2f} KB")
                bytesReceb = net_io.bytes_recv / (1024 ** 2)
                print(f"  Bytes enviados: {net_io.bytes_sent / (1024 ** 1):.2f} KB")
                bytesEnv = net_io.bytes_sent / (1024 ** 2)
                print(f"  Pacotes recebidos: {net_io.packets_recv}")
                pctReceb = net_io.packets_recv
                print(f"  Pacotes enviados: {net_io.packets_sent}")
                pctEnv = net_io.packets_sent
                print(f"\n{'PID':<10} {'Nome':<30} {'Uso de CPU (%)':<15}")
                print("="*60)


                add_rede = ("""INSERT INTO captura
                            (idCaptura, Captura, fkAuxComponente,fkComponente, fkComputador)
                            VALUES (default,%s,2,1,%s),
                            (default,%s,3,1,%s),
                            (default,%s,4,1,%s),
                            (default,%s,5,1,%s)""")

                data_rede = [bytesEnv,idComputador, bytesReceb,idComputador, pctReceb,idComputador, pctEnv, idComputador]
                print(type(data_rede))


                cursor.execute(add_rede, data_rede)
                mydb.commit()
                print(cursor.rowcount, "registro inserido")
            monitor_system()
            
def print_system_info():
    cursor = mydb.cursor()
    mem = psutil.virtual_memory()
    print(f"\nUso de RAM: {mem.percent}% ({mem.used / (1024 ** 3):.2f} GB usado de {mem.total / (1024 ** 3):.2f} GB total)")
    memUso = mem.used / (1024 ** 3)
    memTotal = mem.total / (1024 ** 3)
    memPerc = mem.percent
    idComputador = menu_python()

    add_mem = ("""INSERT INTO captura
                (idCaptura, captura,fkAuxComponente, fkComponente, fkComputador)
                VALUES (default,%s,6,2,%s),
                (default,%s,7,2,%s),
                (default,%s,8,2,%s)""")

    data_mem = [memUso, idComputador, memTotal, idComputador, memPerc, idComputador]

    cursor.execute(add_mem, data_mem)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - memória")

    # Obtém e exibe o uso de disco
    disk = psutil.disk_usage('/')
    print(f"Uso de Disco: {disk.percent}% ({disk.used / (1024 ** 3):.2f} GB usado de {disk.total / (1024 ** 3):.2f} GB total)")
    discoUso = disk.used / (1024 ** 3)
    discoTotal = disk.total / (1024 ** 3)
    discoPerc = disk.percent

    add_disco = ("""INSERT INTO captura
                (idCaptura, captura,fkAuxComponente, fkComponente, fkComputador)
                VALUES (default,%s,9,3,%s),
                (default,%s,10,3,%s),
                (default,%s,11,3,%s)""")

    data_disco = [discoUso,idComputador, discoTotal, idComputador, discoPerc,idComputador]

    cursor.execute(add_disco, data_disco)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - disco")
    # Obtém e exibe o uso da CPU
    cpu_percent = psutil.cpu_percent(interval=None)

    add_cpu = ("""INSERT INTO captura
                (idRegistro, Registro, fkAuxComponente,fkComponente, fkComputador)
                VALUES (default,%s,12,4,%s)""")

    data_cpu = [cpu_percent, idComputador]

    cursor.execute(add_disco, data_disco)
    mydb.commit()
    print(cursor.rowcount, "registro inserido - cpu")

    print(f"Uso Total da CPU: {cpu_percent}%")
    cpuPerc = cpu_percent
    # Obtém e exibe o uso da CPU por núcleo
    cpu_per_core = psutil.cpu_percent(percpu=True, interval=None)
    print("Uso da CPU por Núcleo:")
    for i, perc in enumerate(cpu_per_core):
        print(f"  Núcleo {i}: {perc}%")

        # Obtém e exibe o uso da rede
    net_io = psutil.net_io_counters()
    print(f"\nUso de Rede:")
    print(f"  Bytes recebidos: {net_io.bytes_recv / (1024 ** 1):.2f} KB")
    bytesReceb = net_io.bytes_recv / (1024 ** 2)
    print(f"  Bytes enviados: {net_io.bytes_sent / (1024 ** 1):.2f} KB")
    bytesEnv = net_io.bytes_sent / (1024 ** 2)
    print(f"  Pacotes recebidos: {net_io.packets_recv}")
    pctReceb = net_io.packets_recv
    print(f"  Pacotes enviados: {net_io.packets_sent}")
    pctEnv = net_io.packets_sent
    print(f"\n{'PID':<10} {'Nome':<30} {'Uso de CPU (%)':<15}")
    print("="*60)


    add_rede = ("""INSERT INTO captura
                (idCaptura, Captura, fkAuxComponente,fkComponente, fkComputador)
                VALUES (default,%s,2,1,%s),
                (default,%s,3,1,%s),
                (default,%s,4,1,%s),
                (default,%s,5,1,%s)""")

    data_rede = [bytesEnv,idComputador, bytesReceb,idComputador, pctReceb,idComputador, pctEnv, idComputador]
    print(type(data_rede))


    cursor.execute(add_rede, data_rede)
    mydb.commit()
    print(cursor.rowcount, "registro inserido")
    monitor_system()





    """ Obtém e exibe informações dos processos
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent']):
        try:
            pid = proc.info['pid']
            name = proc.info['name']
            cpu_percent = proc.info['cpu_percent']
            if cpu_percent > 0:  # Filtro para exibir apenas processos com uso de CPU maior que 0
                print(f"{pid:<10} {name:<30} {cpu_percent:<15}")
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass"""

def monitor_system(interval=5):
    while True:
        menu()
        time.sleep(interval)
    #if conn.is_connected():
     #   conn.close()
      #  print('Conexão encerrada.')


if __name__ == "__main__":
    menu()
    #monitor_system()
