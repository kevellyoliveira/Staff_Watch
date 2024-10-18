# Carregar as bibliotecas necessárias
library(RMySQL)
library(dplyr)
library(ggplot2)

# Conectar ao banco de dados
con <- dbConnect(MySQL(), user='root', password='sua_senha', dbname='StaffWatch', host='localhost')

# Consultar os dados
query <- "SELECT ca.dataCaptura, 
       ac.unidadeMedida AS tipo_rede, 
       ca.captura AS valor_bytes,
       ca.fkComputador
FROM captura ca
INNER JOIN auxComponente ac ON ca.fkAuxComponente = ac.idAuxComponente
WHERE ac.unidadeMedida IN ('redeEnvio', 'redeRecebidos')
ORDER BY ca.fkComputador, ca.dataCaptura;
"

data_raw <- dbGetQuery(con, query)
View(data_raw)

# Verificando os dados extraídos
print(head(data_raw))

# Transformar os dados
data_processed <- data_raw %>%
  mutate(valor_bytes = as.numeric(valor_bytes), # Converter para numérico
         valor_megabytes = valor_bytes / (1024^2)) # Convertendo bytes para MB

# Criar gráfico de tráfego de rede por computador
ggplot(data_processed, aes(x = dataCaptura, y = valor_megabytes, color = as.factor(fkComputador))) +
  geom_line() +
  geom_point() +
  labs(title = "Tráfego de Rede por Computador",
       x = "Data de Captura",
       y = "Dados em MB",
       color = "Computador") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

# Preparar os dados para inserção no banco de dados
data_to_db <- data_processed %>%
  select(dataCaptura, valor_megabytes, fkComputador) %>%
  rename(data_captura = dataCaptura,
         dados_mb = valor_megabytes,
         computador = fkComputador)

# Inserir os dados linha por linha no banco de dados
for (i in 1:nrow(data_to_db)) {
  query_insert <- sprintf("INSERT INTO grafico_trafego_rede (data_captura, dados_mb, computador) VALUES ('%s', %f, %d)",
                          data_to_db$data_captura[i],
                          data_to_db$dados_mb[i],
                          data_to_db$computador[i])
  dbSendQuery(con, query_insert)
}

# Fechar a conexão
dbDisconnect(con)
