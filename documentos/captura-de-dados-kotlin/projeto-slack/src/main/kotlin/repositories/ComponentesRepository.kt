package repositories

import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class ComponentesRepository {
    lateinit var jdbcTemplate: JdbcTemplate

    fun configurar() {
        val dataSource = BasicDataSource()
        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"  // Driver atualizado para MySQL
        dataSource.url = "jdbc:mysql://localhost:3306/StaffWatch?serverTimezone=America/Sao_Paulo"
        dataSource.username = "root"
        dataSource.password = "10062006Dudu"

        jdbcTemplate = JdbcTemplate(dataSource)
    }

    fun listarComponentes():List<>
}