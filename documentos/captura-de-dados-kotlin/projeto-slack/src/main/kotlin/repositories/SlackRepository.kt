package repositories

import com.slack.api.Slack
import com.slack.api.webhook.Payload
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class SlackRepository {

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

    fun listarDadosAcima(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE captura >= 100", Int::class.java)
    }

    fun verificarEdispararAlerta() {
        val dados = listarDadosAcima()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: Um dado excedeu o valor de 100 ${dados}")
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
