package repositorio

import dominio.Chamadas
import dominio.Funcionario
import org.apache.commons.dbcp2.BasicDataSource
import org.asteriskjava.manager.event.HangupEvent
import org.asteriskjava.manager.event.ManagerEvent
import org.asteriskjava.manager.event.NewStateEvent
import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate

class ChamadaRepository {

    lateinit var jdbcTemplate: JdbcTemplate

    fun configurar() {
        val dataSource: BasicDataSource = BasicDataSource()
        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
        //dataSource.url = "jdbc:h2:mem:StaffWatch"
        dataSource.url = "jdbc:mysql://localhost:3306/StaffWatch?serverTimezone=America/Sao_Paulo"
        dataSource.username = "root"
        dataSource.password = "10062006Dudu"

        jdbcTemplate = JdbcTemplate(dataSource)
    }

    fun listarFuncionarios(): List<Funcionario> {

        val listaFuncionarios = jdbcTemplate.query(
            "SELECT * FROM funcionario",
            BeanPropertyRowMapper(Funcionario::class.java)
        )
        return listaFuncionarios
    }

    fun salvarChamada(chamadas: Chamadas): Boolean{
        val qtdLinhasAfetadas = jdbcTemplate.update(
            """
           INSERT INTO chamada (chamadaRecebida, chamadaAtendida, chamadaPerdida, tempoChamada, tempoEspera, fkFuncionario, fkEmpresa) 
           VALUES(?,?,?,?,?,1,1);
        """,
            chamadas.chamadaRecebida,
            chamadas.chamadaAtendida,
            chamadas.chamadaPerdida,
            chamadas.tempoChamada,
            chamadas.tempoEspera)

        return qtdLinhasAfetadas > 0
    }

//    fun processarEvento(event: ManagerEvent) {
//
//        var listaFuncionario = listarFuncionarios();
//
//        when (event) {
//            is NewStateEvent -> {
//                println("Chamada em novo estado: ${event.state} - Número: ${event.callerIdNum}")
//
//                // Verifica se a chamada está tocando (Ringing)
//                if (event.state == "Ringing") {
//                    // Marca o início do tempo de espera
//                    val tempoInicioEspera = System.currentTimeMillis()
//
//                    // Cria um objeto de chamada com valores iniciais
//                    val chamada = Chamadas().apply {
//                        chamadaRecebida = 1 // A chamada foi recebida
//                        chamadaAtendida = 0
//                        chamadaPerdida = 0
//                        tempoChamada = 0
//                        tempoEspera = 0 // Inicializando o tempo de espera
//                        eficienciaChamada = 0.0// Inicializando a eficiência
//                        fkFuncionario = 1 // Atribuindo funcionario dinamicamente
//                        fkEmpresa = 1 // Atribuindo empresa dinamicamente
//                    }
//
//                    // Salva a chamada na base de dados
//                  salvarChamada(chamada)
//                }
//            }
//
//            is AnswerEvent -> {
//                // Quando a chamada for atendida
//                println("Chamada atendida: ${event.callerIdNum}")
//
//                // Atualiza a chamada para indicar que foi atendida
//                val chamada = listaFuncionario[1].telefone(event.callerIdNum) // Recupera a chamada
//                chamada?.let {
//                    it.chamadaAtendida = 1 // Marca como atendida
//
//                    // Calcula o tempo total de chamada
//                    val tempoFinal = System.currentTimeMillis()
//                    it.tempoChamada = (tempoFinal - it.tempoInicioEspera) / 1000 // Tempo de chamada em segundos
//                    it.eficienciaChamada = if (it.tempoChamada > 0) it.tempoEspera.toDouble() / it.tempoChamada else 0.0 // Calcula a eficiência da chamada
//
//                    chamadaRepository.salvarChamada(it) // Atualiza os dados da chamada
//                }
//            }
//
//            is HangupEvent -> {
//                // Quando a chamada é desligada
//                println("Chamada desligada: ${event.causeTxt}")
//
//                // Atualiza a chamada com o status de desligada
//                val chamada = chamadaRepository.obterChamadaPorNumero(event.callerIdNum) // Recupera a chamada
//                chamada?.let {
//                    it.chamadaPerdida = 1 // Marca a chamada como perdida se não foi atendida
//                    val tempoFinal = System.currentTimeMillis()
//                    it.tempoChamada = (tempoFinal - it.tempoInicioEspera) / 1000 // Tempo de chamada em segundos
//                    it.eficienciaChamada = if (it.tempoChamada > 0) it.tempoEspera.toDouble() / it.tempoChamada else 0.0 // Atualiza a eficiência
//
//                    chamadaRepository.salvarChamada(it) // Atualiza a chamada na base
//                }
//            }
//        }
//    }

}