package repositories

import com.slack.api.Slack
import com.slack.api.webhook.Payload

class CpuRepository {

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

        fun listarCpuPorcent(): List<Int> {
            return jdbcTemplate.queryForList("SELECT captura FROM Captura WHERE fkComponente == 4 AND fkAuxComponente == 12 AND captura >= 85", Int::class.java)
        }

        fun verificarDispararCpu() {
            val dados = listarCpuPorcent()

            if (dados.isNotEmpty()) {
                enviarMensagemSlack("Alerta: Um dado de porcentagem de CPU excedeu o valor de 85% ${dados}")
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
