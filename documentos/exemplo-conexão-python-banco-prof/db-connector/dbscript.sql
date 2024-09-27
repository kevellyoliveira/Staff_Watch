CREATE DATABASE logbateria;

CREATE TABLE log(
    id INT PRIMARY KEY auto_increment,
    data_hora DATETIME,
    alerta VARCHAR(255),
    status_bateria DECIMAL(5,2)
)CHARACTER SET='utf8mb4'; 