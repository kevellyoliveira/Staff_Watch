import com.github.britooo.looca.api.core.Looca
import com.sun.org.apache.xpath.internal.operations.Bool
    import org.apache.commons.dbcp2.BasicDataSource
    import org.springframework.jdbc.core.BeanPropertyRowMapper
    import org.springframework.jdbc.core.JdbcTemplate
    import org.springframework.jdbc.core.queryForObject
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class MusicaRepositorio {

        lateinit var jdbcTemplate: JdbcTemplate


        fun configurar() {
            val dataSource: BasicDataSource = BasicDataSource()
            dataSource.driverClassName = "org.h2.Driver"
            //dataSource.url = "jdbc:h2:file:./festival"
            dataSource.url = "jdbc:mysql://localhost:3306/StaffWatch"
            dataSource.username = "sa"
            dataSource.password = ""

            jdbcTemplate = JdbcTemplate(dataSource)
        }
        fun inserirBytesRecebLooca(novoMonitoramento: Monitoramento): Boolean {
            val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            val current = LocalDateTime.now().format(formatter)

            val qtdLinhasAfetadas = jdbcTemplate.update(
                """
               INSERT INTO Log 
                VALUES(default, ?, ?, 13, 1)
            """,
                novoMonitoramento.redeRecebLooca,
                novoMonitoramento.current,

            )
            return qtdLinhasAfetadas > 0
        }

    fun inserirRedeEnvLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO Log 
                VALUES(default, ?, ?, 14, 1)
            """,
            novoMonitoramento.redeEnvLooca,
            novoMonitoramento.current,
            )
        return qtdLinhasAfetadas > 0
    }


    fun inserirPctEnvLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO Log 
                VALUES(default, ?, ?, 15, 1)
            """,
            novoMonitoramento.pctEnvLooca,
            novoMonitoramento.current,

            )
        return qtdLinhasAfetadas > 0
    }

    fun inserirPctRecebLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO Log 
                VALUES(default, ?, ?, 16, 1)
            """,
            novoMonitoramento.pctRecebLooca,
            novoMonitoramento.current,

            )
        return qtdLinhasAfetadas > 0
    }

    fun inserirServicosLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO Log 
                VALUES(default, ?, ?, 17, 1)
            """,
            novoMonitoramento.servicosLooca,
            novoMonitoramento.current,

            )
        return qtdLinhasAfetadas > 0
    }

    fun inserirProcessosLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO Log 
                VALUES(default, ?, ?, 18, 1)
            """,
            novoMonitoramento.processosLooca,
            novoMonitoramento.current,

            )
        return qtdLinhasAfetadas > 0
    }

    fun inserirTempoAtividadeLooca(novoMonitoramento: Monitoramento): Boolean {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)

        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
               INSERT INTO Log 
                VALUES(default, ?, ?, 19, 1)
            """,
            novoMonitoramento.tempoAtividadeLooca,
            novoMonitoramento.current,

            )
        return qtdLinhasAfetadas > 0
    }
/*
        fun listar(): List<Musica> {
            return jdbcTemplate.query(
                "SELECT * FROM Musica",
                BeanPropertyRowMapper(Musica::class.java)
            )
        }

        fun existePorId(id:Int):Boolean {
            val qtdExistentes = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM Musica WHERE id = ?",
                Int::class.java,
                id
            )
            return  qtdExistentes > 0
        }

        fun buscaPorId(id:Int): Musica {
            val musicaEncontrada = jdbcTemplate.queryForObject(
                "SELECT * FROM Musica WHERE id = ?",
                BeanPropertyRowMapper(Musica::class.java),
                id
            )
            return musicaEncontrada
        }

        fun deletaPorId(id:Int): Boolean {
            val qtdLinhasAfetadas = jdbcTemplate.update(
                "DELETE FROM Musica WHERE id = ?",
                id
            )
            return qtdLinhasAfetadas > 0
        }

        fun atualizaPorId(id: Int, musicaAtualizada:Musica):Boolean {
            val qtdLinhaAfetadas = jdbcTemplate.update(
                """
                UPDATE Musica SET
                nome = ?,
                banda = ?,
                produtor = ?
                WHERE id = ?
            """,
                musicaAtualizada.nome,
                musicaAtualizada.banda,
                musicaAtualizada.produtor,
                id
            )
            return  qtdLinhaAfetadas > 0
        }

 */
    }
