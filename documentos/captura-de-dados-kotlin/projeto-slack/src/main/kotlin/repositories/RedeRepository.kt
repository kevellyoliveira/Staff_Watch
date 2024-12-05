package repositories

import com.slack.api.Slack
import com.slack.api.webhook.Payload
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class RedeRepository {
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

    fun listarRedeRecebidos(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 1 AND fkAuxComponente = 13 AND captura >= 100 ORDER BY idCaptura DESC LIMIT 1", Int::class.java)
    }

    fun listarRedeEnviados(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 1 AND fkAuxComponente = 14 AND captura >= 100 ORDER BY idCaptura DESC LIMIT 1", Int::class.java)
    }

    fun listarPacoteEnviados(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 1 AND fkAuxComponente = 15 AND captura >= 100 ORDER BY idCaptura DESC LIMIT 1", Int::class.java)
    }

    fun listarPacoteRecebido(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 1 AND fkAuxComponente = 16 AND captura >= 100 ORDER BY idCaptura DESC LIMIT 1", Int::class.java)
    }


    fun verificarDispararRede1() {
        val dados = listarRedeRecebidos()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: Um dado do redeRecebidosLooca excedeu o valor de 100 bytes ${dados}")
        }
    }

    fun verificarDispararRede2() {
        val dados = listarRedeEnviados()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: Um dado do redeEnviadosLooca excedeu o valor de 100 bytes ${dados}")
        }
    }

    fun verificarDispararRede3() {
        val dados = listarPacoteEnviados()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: Um dado do pacoteEnviadosLooca excedeu o valor de 100 qte ${dados}")
        }
    }

    fun verificarDispararRede4() {
        val dados = listarPacoteRecebido()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: Um dado do pacotesRecebidosLooca excedeu o valor de 100 qte ${dados}")
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