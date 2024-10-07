import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class monitoramentoRepositorio {

        lateinit var jdbcTemplate: JdbcTemplate


        fun configurar() {
            val dataSource: BasicDataSource = BasicDataSource()
            dataSource.driverClassName = "org.h2.Driver"
            //dataSource.url = "jdbc:h2:mem:StaffWatch"
            dataSource.url = "jdbc:mysql://localhost:3306/StaffWatch"
            dataSource.username = "root"
            dataSource.password = "73917391"

            jdbcTemplate = JdbcTemplate(dataSource)
        }

        fun inserirRedeRecebLooca(novoMonitoramento: Monitoramento): Boolean {
            val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            val current = LocalDateTime.now().format(formatter)

            val qtdLinhasAfetadas = jdbcTemplate.update(
                """
               INSERT INTO LOG
                VALUES (default, ?, ?, 13, 1);
            """,
                novoMonitoramento.redeRecebLooca,
                current,

            )
            return qtdLinhasAfetadas > 0
        }

    fun inserirRedeEnvLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO LOG
                VALUES (default, ?, ?, 14, 1);
            """,
            novoMonitoramento.redeEnvLooca,
            current,
            )
        return qtdLinhasAfetadas > 0
    }


    fun inserirPctEnvLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO LOG 
                VALUES (default, ?, ?, 15, 1);
            """,
            novoMonitoramento.pctEnvLooca,
            current,

            )
        return qtdLinhasAfetadas > 0
    }

    fun inserirPctRecebLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO LOG 
                VALUES (default, ?, ?, 16, 1);
            """,
            novoMonitoramento.pctRecebLooca,
            current,

            )
        return qtdLinhasAfetadas > 0
    }

    fun inserirServicosLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO LOG 
                VALUES (default, ?, ?, 17, 1);
            """,
            novoMonitoramento.servicosLooca,
            current,

            )
        return qtdLinhasAfetadas > 0
    }

    fun inserirProcessosLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO LOG 
                VALUES (default, ?, ?, 18, 1);
            """,
            novoMonitoramento.processosLooca,
            current,

            )
        return qtdLinhasAfetadas > 0
    }

    fun inserirTempoAtividadeLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO LOG 
                VALUES (default, ?, ?, 19, 1);
            """,
            novoMonitoramento.tempoAtividadeLooca,
            current,

            )
        return qtdLinhasAfetadas > 0
    }


    }
