
if (!requireNamespace("RMySQL", quietly = TRUE)) {
  install.packages("RMySQL")
}

if (!requireNamespace("plumber", quietly = TRUE)) {
  install.packages("plumber")
}

if (!requireNamespace("rmarkdown", quietly = TRUE)) {
  install.packages("rmarkdown")
}


# Carregar o pacote
library(RMySQL)
library(ggplot2)

# Configurações do banco de dados
host <- "54.204.167.26"       # Exemplo: "localhost" ou IP do servidor
user <- "root"    # Nome de usuário do banco
password <- "senha_segura"  # Senha do usuário
dbname <- "StaffWatch"    # Nome do banco de dados
port <- 3306               # Porta padrão do MySQL (altere se necessário)

# Conectar ao banco de dados
con <- dbConnect(MySQL(),
                 host = host,
                 user = user,
                 password = password,
                 dbname = dbname,
                 port = port)

# Consultar dados
queryRede <- "SELECT * 
FROM captura
WHERE dataCaptura >= CURDATE() - INTERVAL 7 DAY"  # Substitua pela sua consulta SQL




capturaGeral <- dbGetQuery(con, queryRede) 




# Exibir os primeiros registros
head(capturaGeral)


View(capturaGeral)

capturaGeral

# -----------------------------------------------------------------------

#começando análise

pacotesEnv <- capturaGeral[capturaGeral$fkAuxComponente == 2, ]
pacotesReceb <- capturaGeral[capturaGeral$fkAuxComponente == 3, ]

latencia <- capturaGeral[capturaGeral$fkAuxComponente == 20, ]
perdaPacotes <- capturaGeral[capturaGeral$fkAuxComponente == 21, ]
tempoFalha <- capturaGeral[capturaGeral$fkAuxComponente == 25, ]

# média de todos os dados


mediaPacotesEnv <- mean(pacotesEnv$captura)
mediaPacotesReceb <- mean(pacotesReceb$captura)   
mediaLatencia <- mean(latencia$captura) 
mediaPerdaPacotes <- mean(perdaPacotes$captura)
mediaTempoFalha <- mean(tempoFalha$captura)  

# picos de cada métrica - quantidade de vezes que foi exibido um alerta


picosLatencia <- latencia$captura[latencia$captura >= 20]
picosPerdaPacotes <- perdaPacotes$captura[perdaPacotes$captura >= 1]   
picosTempoFalha <- tempoFalha$captura[tempoFalha$captura >= 1.440]

tamanhoPicosLatencia <- length(picosLatencia)
tamanhoPicosPerdaPacotes <- length(picosPerdaPacotes)
tamanhoPicosTempoFalha <- length(picosTempoFalha)

# Quantidade de vezes

tamanhoPicosLatencia
tamanhoPicosPerdaPacotes
picosTempoFalha



# Criando histogramas para indicar os picos

hist(picosLatencia, 
     main = "Picos de latência na ultima semana", 
     xlab = "Valores", 
     ylab = "Frequência", 
     col = "lightblue", 
     border = "black")

hist(picosPerdaPacotes, 
     main = "Histograma de Dados", 
     xlab = "Valores", 
     ylab = "Frequência", 
     col = "red", 
     border = "black")

hist(picosTempoFalha, 
     main = "Histograma de Dados", 
     xlab = "Valores", 
     ylab = "Frequência", 
     col = "yellow", 
     border = "black")




# verificar correlação pacotes enviados/recebidos

pctEnvlatencia <- data.frame(pacotesEnv$captura, latencia$captura)


ggplot(pctEnvlatencia, aes(x = pacotesEnv$captura, y = latencia$captura)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "lightblue") +  # Adiciona a linha de regressão
  labs(title = "Pacotes enviados vs Latência", x = "Pacotes enviados (bytes)", y = "Latência (Ms)")

# verificar correlação cpu

CPUlatencia <- data.frame(usoCpu$captura, latencia$captura)


ggplot(CPUlatencia, aes(x = usoCpu$captura, y = latencia$captura)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "red") +  # Adiciona a linha de regressão
  labs(title = "Uso de CPU vs Latência", x = "Uso de CPU (%)", y = "Latência (Ms)")

# verificar correlação pacotesPerdidos
pctPerdidos <- capturaGeral[capturaGeral$fkAuxComponente == 21, ]

pctPerdidoslatencia <- data.frame(pctPerdidos$captura, latencia$captura)


ggplot(pctPerdidoslatencia, aes(x = pctPerdidos$captura, y = latencia$captura)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "lightblue") +  # Adiciona a linha de regressão
  labs(title = "Pacotes enviados vs Latência", x = "Pacotes enviados (bytes)", y = "Latência (Ms)")



# Fechar a conexão com o banco de dados
dbDisconnect(con)


