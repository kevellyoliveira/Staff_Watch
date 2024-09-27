from mysql.connector import connect, Error
import psutil
import time
import os
from dotenv import load_dotenv

load_dotenv()

config = {
  "user": os.getenv("USER_LOGIN"),
  "password": os.getenv("DB_PASSWORD"),
  "host": os.getenv("HOST"),
  "database": os.getenv("DATABASE")
}

print('monitorando energia...')

i = 0
while i < 10: 
    
    bat = psutil.sensors_battery()[2]
    perc = psutil.sensors_battery()[0]
    
    if bat:
        print('Bateria {:.2f}%'.format(perc))    
    if not bat:
        print('Bateria {:.2f}% ...ALERTA'.format(perc))
        
        try:
            mydb = connect(**config)
            if mydb.is_connected():

                mycursor = mydb.cursor()
                sql_query = "INSERT INTO log VALUES (null, current_timestamp(), 'Bateria desconectada',%s)"
                val = [round(perc,2)]
                mycursor.execute(sql_query, val)
                mydb.commit()
                print(mycursor.rowcount, "registro inserido")

        except Error as e:
            print("Erro ao conectar com o MySQL", e)
        
        finally:
            if(mydb.is_connected()):
                mycursor.close()
                mydb.close()
    i += 1
    time.sleep(5)
