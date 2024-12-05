package repositories

import com.slack.api.Slack
import com.slack.api.webhook.Payload
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class DiscoRepository {
    lateinit var jdbcTemplate: JdbcTemplate

    private val slackWebhookUrl = "https://hooks.slack.com/services/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"


    fun configurar() {
        val dataSource = BasicDataSource()
        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"  // Driver atualizado para MySQL
        dataSource.url = "jdbc:mysql://localhost:3306/StaffWatch?serverTimezone=America/Sao_Paulo"
        dataSource.username = "root"
        dataSource.password = "10062006Dudu"

        jdbcTemplate = JdbcTemplate(dataSource)
    }

    fun listarDiscoUso(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 3 AND fkAuxComponente = 9 AND captura >= 15000000 ORDER BY idCaptura DESC LIMIT 1", Int::class.java)
    }

    fun listarDiscoTotal(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 3 AND fkAuxComponente =10 AND captura >= 15000000 ORDER BY idCaptura DESC LIMIT 1", Int::class.java)
    }

    fun listarDiscoPorcent(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 3 AND fkAuxComponente = 11 AND captura >= 80 ORDER BY idCaptura DESC LIMIT 1", Int::class.java)
    }


    fun verificarDispararDisc1() {
        val dados = listarDiscoUso()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: Um dado do disco em uso excedeu o valor de 15000000 bytes ${dados}")
        }
    }

    fun verificarDispararDisc2() {
        val dados = listarDiscoTotal()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: Um dado do disco total excedeu o valor de 15000000 bytes ${dados}")
        }
    }

    fun verificarDispararDisc3() {
        val dados = listarDiscoPorcent()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: A Porcentagem de uso do disco excedeu o valor de 80% ${dados}")
        }
    }



    private fun enviarMensagemSlack(mensagem: String){

        val slack = Slack.getInstance()
        val payload = Payload.builder().text(mensagem).build()
        val response = slack.send(slackWebhookUrl, payload)

        if(response.code == 200){
            println("Mensagem enviada ao slack com sucesso")
        }
        else {
            println("Erro ao enviar mensagem ao slack ${response.message}")
        }
    }
}