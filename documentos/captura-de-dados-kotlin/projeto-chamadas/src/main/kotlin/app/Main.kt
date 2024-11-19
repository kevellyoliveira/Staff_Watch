package app

import repositorio.ChamadaRepository
import org.asteriskjava.manager.ManagerConnection
import org.asteriskjava.manager.ManagerConnectionFactory
import org.asteriskjava.manager.action.OriginateAction
import org.asteriskjava.manager.response.ManagerResponse

open class Main {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {

            val chamadaRepository = ChamadaRepository();
            chamadaRepository.configurar();
            chamadaRepository.listarFuncionarios();

            val host = "172.17.0.1" // IP do servidor Asterisk
            val port = 5038 // Porta padrão da AMI
           val username = "eduardo" // Usuário configurado na AMI
            val password = "senhaSegura123" // Senha configurada na AMI

            try {
                val socket = Socket(host, port)
                val writer = OutputStreamWriter(socket.getOutputStream())
                val reader = BufferedReader(InputStreamReader(socket.getInputStream()))

            //    Autenticação na AMI
                writer.write("Action: Login\r\n")
                writer.write("Username: $username\r\n")
                writer.write("Secret: $password\r\n")
                writer.write("ActionID: 1\r\n\r\n")
                writer.flush()

            //    Ler a resposta de login
                println("Resposta de login:")
                var line = reader.readLine()
                while (line != null && line.isNotEmpty()) {
                    println(line)
                    line = reader.readLine()
                }

             //   Escutar eventos de chamadas
                        println("\nCapturando eventos de chamadas:")
                while (true) {
                    line = reader.readLine()
                    if (line != null) {
                        println(line)
                    }
                }

                //Fechar conexão
                writer.close()
                reader.close()
                socket.close()
            } catch (e: Exception) {
                e.printStackTrace()
            }

            // Configuração da conexão com o Asterisk
            val managerConnectionFactory = ManagerConnectionFactory("54.167.60.225", "eduardo", "senhaSegura123")
            val managerConnection: ManagerConnection = managerConnectionFactory.createManagerConnection()

            try {
                // Conecta-se ao Asterisk
                managerConnection.login()

                // Configuração da chamada
                val originateAction = OriginateAction().apply {
                    channel = "SIP/Vivo"        // Canal de origem (exemplo: ramal SIP 1001)
                    context = "default"         // Contexto no dialplan do Asterisk
                    exten = "5511944159059"              // Número de destino
                    priority = 1                // Prioridade no dialplan
                    callerId = "1001"           // ID do chamador
                    timeout = 30000             // Timeout (em milissegundos)
                }

                // Envia a ação para o Asterisk
                println("Enviando chamada...")
                val response: ManagerResponse =
                    managerConnection.sendAction(originateAction, originateAction.timeout.toLong())
                println("Resposta do Asterisk: ${response.response} - ${response.message}")
                println("---------------------------------------------")
                println(response.dateReceived)

                // Finaliza a conexão
                managerConnection.logoff()
            } catch (e: Exception) {
                println("Erro: ${e.message}")
                e.printStackTrace()
            }

        }
    }
}

