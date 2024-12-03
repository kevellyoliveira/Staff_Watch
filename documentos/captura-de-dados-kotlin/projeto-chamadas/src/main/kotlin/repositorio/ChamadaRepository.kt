package repositorio

import com.twilio.Twilio
import com.twilio.rest.insights.v1.Call
import com.twilio.type.PhoneNumber
import dominio.Chamadas
import dominio.Funcionario
import org.apache.commons.dbcp2.BasicDataSource

import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class ChamadaRepository {

    lateinit var jdbcTemplate: JdbcTemplate

    fun configurar() {
        val dataSource: BasicDataSource = BasicDataSource()
        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
        dataSource.url = "jdbc:mysql://54.204.167.26:3306/StaffWatch?serverTimezone=America/Sao_Paulo"
        dataSource.username = "root"
        dataSource.password = "senha_segura"

        jdbcTemplate = JdbcTemplate(dataSource)
    }

    fun listarFuncionarios(): List<Funcionario> {

        val listaFuncionarios = jdbcTemplate.query(
            "SELECT * FROM funcionario",
            BeanPropertyRowMapper(Funcionario::class.java)
        )
        return listaFuncionarios
    }

    fun pegarChamada(telefone: String?): com.twilio.rest.api.v2010.account.Call {
        // Autenticação da Twilio com seu SID da conta e token de autenticação
        val ACCOUNT_SID = "ACde6cb6e25a1f9310b189c1f6318018da"
        val AUTH_TOKEN = "b91873c80e6deb5c0ce0ef8989b7f962"
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN)

        // Configurar os números de telefone
        val fromNumber = PhoneNumber("+12512501001") // Número Twilio
        val toNumber = PhoneNumber(telefone) // Número de destino

        // Fazer uma chamada
        val call = com.twilio.rest.api.v2010.account.Call.creator(
            toNumber,
            fromNumber,
            com.twilio.type.Twiml("<Response><Say>Olá! Esta é uma chamada de teste.</Say></Response>")
        ).create()

        // Agora buscamos os detalhes completos da chamada usando o SID
        val callDetails = com.twilio.rest.api.v2010.account.Call.fetcher(call.sid).fetch()

        // Imprimir os detalhes da chamada
        println("Chamada SID: ${callDetails.sid}")
        println("Status inicial: ${callDetails.status}")
        println("Data de criação: ${callDetails.dateCreated}")
        println("Data de término: ${callDetails.endTime}")
        println("Respondido por: ${callDetails.answeredBy}")
        println("Duração: ${callDetails.duration}")
        println("Status final: ${callDetails.status}")
        println("Número de destino: ${callDetails.to}")

        return callDetails
    }

    fun inserirChamada(call: com.twilio.rest.api.v2010.account.Call) {

        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val current = LocalDateTime.now().format(formatter)
        // Mapeando o status da chamada para um valor numérico ou string
        val chamadaAtendida = when (call.status) {
            com.twilio.rest.api.v2010.account.Call.Status.QUEUED -> 0
            com.twilio.rest.api.v2010.account.Call.Status.IN_PROGRESS -> 1
            com.twilio.rest.api.v2010.account.Call.Status.COMPLETED -> 2
            com.twilio.rest.api.v2010.account.Call.Status.FAILED -> 3
            else -> -1
        }

        // Verifique se call.duration e call.startTime são nulos antes de usar
        val tempoChamada = call.duration ?: 0 // Se duration for nulo, usa 0 como valor padrão
        val tempoEspera = call.startTime?.toEpochSecond() ?: 0L // Se startTime for nulo, usa 0L como valor padrão

        // Mapeando 'chamadaPerdida' (não atendida) com base no status da chamada
        val chamadaPerdida = if (chamadaAtendida == 2) 0 else 1 // Se a chamada foi atendida (status 2), não é perdida

        // Inserir no banco de dados
        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
        INSERT INTO chamada (chamadaRecebida, chamadaAtendida, chamadaPerdida, tempoChamada, tempoEspera, dataCaptura, fkFuncionario, fkEmpresa)
        VALUES (?, ?, ?, ?, ?, ?, 1, 1);
        """,
            1, chamadaAtendida, chamadaPerdida, tempoChamada, tempoEspera , current
        )

        // Log para verificar se a inserção foi bem-sucedida
        println("Linhas afetadas: $qtdLinhasAfetadas")
    }


    fun capturarRegistrosDeChamadas() {
        val calls = com.twilio.rest.api.v2010.account.Call.reader().read()  // Lê todas as chamadas registradas
        val listaFuncionario = listarFuncionarios()

        // Exibe as informações sobre as chamadas
        for (call in calls) {
            println("Chamada SID: ${call.sid}")
            println("De: ${call.from}")
            println("Para: ${call.to}")
            println("Status: ${call.status}")
            println("Duração: ${call.duration} segundos")
            println("Data de início: ${call.startTime}")
            println("Data de fim: ${call.endTime}")
            println("-----")

            // Inserir chamada no banco
            inserirChamada(call)
        }
    }


}



