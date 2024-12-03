package repositorio

import dominio.Monitoramento
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class monitoramentoRepositorio {

        lateinit var jdbcTemplate: JdbcTemplate


        fun configurar() {
            val dataSource: BasicDataSource = BasicDataSource()
            dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
            //dataSource.url = "jdbc:h2:mem:StaffWatch"
            dataSource.url = "jdbc:mysql://54.204.167.26:3306/StaffWatch?serverTimezone=America/Sao_Paulo"
            dataSource.username = "root"
            dataSource.password = "senha_segura"

            jdbcTemplate = JdbcTemplate(dataSource)
        }

        fun inserirRedeRecebLooca(novoMonitoramento: Monitoramento): Boolean {
            val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            val current = LocalDateTime.now().format(formatter)

            val qtdLinhasAfetadas = jdbcTemplate.update(
                """
               INSERT INTO captura (idCaptura, captura, dataCaptura , fkComponente, fkComputador , fkAuxComponente)
                VALUES (default, ?, ?, 1, 1, 13);
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
               INSERT INTO captura (idCaptura, captura, dataCaptura , fkComponente, fkComputador , fkAuxComponente)
                VALUES (default, ?, ?, 1, 1, 14);
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
               INSERT INTO captura (idCaptura, captura, dataCaptura , fkComponente, fkComputador , fkAuxComponente)
                VALUES (default, ?, ?, 1, 1, 15);
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
               INSERT INTO captura (idCaptura, captura, dataCaptura , fkComponente, fkComputador , fkAuxComponente)
                VALUES (default, ?, ?, 1, 1, 16);
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
               INSERT INTO captura (idCaptura, captura, dataCaptura , fkComponente, fkComputador , fkAuxComponente)
                VALUES (default, ?, ?, 5, 1, 17);
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
               INSERT INTO captura (idCaptura, captura, dataCaptura , fkComponente, fkComputador , fkAuxComponente)
                VALUES (default, ?, ?, 5, 1, 18);
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
               INSERT INTO captura (idCaptura, captura, dataCaptura , fkComponente, fkComputador , fkAuxComponente)
                VALUES (default, ?, ?, 5, 1, 19);
            """,
            novoMonitoramento.tempoAtividadeLooca,
            current,

            )
        return qtdLinhasAfetadas > 0
    }
    fun existePorId(id: Int): Boolean {
        val qtdExistentes = jdbcTemplate.queryForObject(
            "Select count(*) from computador where idComputador = ?;",
            Int::class.java,
            id
        )

        return qtdExistentes > 0
    }


    }
