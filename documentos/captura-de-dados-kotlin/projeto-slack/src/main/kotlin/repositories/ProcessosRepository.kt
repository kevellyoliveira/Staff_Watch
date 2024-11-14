package repositories

import com.slack.api.Slack
import com.slack.api.webhook.Payload
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class ProcessosRepository {
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

    fun listarTotalServicos(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 5 AND fkAuxComponente = 17 AND captura >= 10000", Int::class.java)
    }

    fun listarTotalProcessos(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 5 AND fkAuxComponente = 18 AND captura >= 10000", Int::class.java)
    }

    fun listarTempoAtividade(): List<Int> {
        return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente = 5 AND fkAuxComponente = 19 AND captura >= 600", Int::class.java)
    }


    fun verificarDispararPro1() {
        val dados = listarTotalServicos()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: O uso de total de serviço excedeu o valor de 10000 qte ${dados}")
        }
    }

    fun verificarDispararPro2() {
        val dados = listarTotalProcessos()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta: O uso de total de processos excedeu o valor de 10000 qte ${dados}")
        }
    }

    fun verificarDispararPro3() {
        val dados = listarTempoAtividade()

        if (dados.isNotEmpty()) {
            enviarMensagemSlack("Alerta:O tempo de atividade excedeu o valor de 600 segundos ${dados}")
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