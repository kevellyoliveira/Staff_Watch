package repositorio

import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class ChamadaRepository {

    lateinit var jdbcTemplate: JdbcTemplate


    fun configurar() {
        val dataSource: BasicDataSource = BasicDataSource()
        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
        //dataSource.url = "jdbc:h2:mem:StaffWatch"
        dataSource.url = "jdbc:mysql://44.194.151.184:3306/StaffWatch?serverTimezone=America/Sao_Paulo"
        dataSource.username = "root"
        dataSource.password = "senha_segura"

        jdbcTemplate = JdbcTemplate(dataSource)
    }


}