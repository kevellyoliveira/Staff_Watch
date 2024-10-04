import com.github.britooo.looca.api.core.Looca
import com.sun.org.apache.xpath.internal.operations.Bool
    import org.apache.commons.dbcp2.BasicDataSource
    import org.springframework.jdbc.core.BeanPropertyRowMapper
    import org.springframework.jdbc.core.JdbcTemplate
    import org.springframework.jdbc.core.queryForObject
/*
    class MusicaRepositorio {

        lateinit var jdbcTemplate: JdbcTemplate


        fun configurar() {
            val dataSource: BasicDataSource = BasicDataSource()
            dataSource.driverClassName = "org.h2.Driver"
            //dataSource.url = "jdbc:h2:file:./festival"
            dataSource.url = "jdbc:mysql://localhost:3306/SteffWatch"
            dataSource.username = "sa"
            dataSource.password = ""

            jdbcTemplate = JdbcTemplate(dataSource)
        }

        fun inserir(novaMusica: Musica): Boolean {
            val qtdLinhasAfetadas = jdbcTemplate.update(
                """
               INSERT INTO Musica (nome, banda, produtor)
                VALUES(?, ?, ?)
            """,
                novaMusica.nome,
                novaMusica.banda,
                novaMusica.produtor,
            )
            return qtdLinhasAfetadas > 0
        }

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
    }
*/