import psutil
import time





def print_system_info():
    # Obtém e exibe o uso de memória RAM
    mem = psutil.virtual_memory()
    print(f"\nUso de RAM: {mem.percent}% ({mem.used / (1024 ** 3):.2f} GB usado de {mem.total / (1024 ** 3):.2f} GB total)")

    # Obtém e exibe o uso de disco
    disk = psutil.disk_usage('/')
    print(f"Uso de Disco: {disk.percent}% ({disk.used / (1024 ** 3):.2f} GB usado de {disk.total / (1024 ** 3):.2f} GB total)")

    # Obtém e exibe o uso da CPU
    cpu_percent = psutil.cpu_percent(interval=None)
    print(f"Uso Total da CPU: {cpu_percent}%")

    # Obtém e exibe o uso da CPU por núcleo
    cpu_per_core = psutil.cpu_percent(percpu=True, interval=None)
    print("Uso da CPU por Núcleo:")
    for i, perc in enumerate(cpu_per_core):
        print(f"  Núcleo {i}: {perc}%")

    # Obtém e exibe o uso da rede
    net_io = psutil.net_io_counters()
    print(f"\nUso de Rede:")
    print(f"  Bytes recebidos: {net_io.bytes_recv / (1024 ** 2):.2f} MB")
    print(f"  Bytes enviados: {net_io.bytes_sent / (1024 ** 2):.2f} MB")
    print(f"  Pacotes recebidos: {net_io.packets_recv}")
    print(f"  Pacotes enviados: {net_io.packets_sent}")

    print(f"\n{'PID':<10} {'Nome':<30} {'Uso de CPU (%)':<15}")
    print("="*60)

    # Obtém e exibe informações dos processos
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent']):
        try:
            pid = proc.info['pid']
            name = proc.info['name']
            cpu_percent = proc.info['cpu_percent']
            if cpu_percent > 0:  # Filtro para exibir apenas processos com uso de CPU maior que 0
                print(f"{pid:<10} {name:<30} {cpu_percent:<15}")
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass

def monitor_system(interval=5):
    while True:
        print_system_info()
        time.sleep(interval)

if __name__ == "__main__":
    monitor_system()
