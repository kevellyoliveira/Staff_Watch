import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.Socket

fun main() {
    val host = "127.0.0.1" // IP do servidor Asterisk
    val port = 5038 // Porta padrão da AMI
    val username = "eduardo" // Usuário configurado na AMI
    val password = "senhaSegura123" // Senha configurada na AMI

    try {
        val socket = Socket(host, port)
        val writer = OutputStreamWriter(socket.getOutputStream())
        val reader = BufferedReader(InputStreamReader(socket.getInputStream()))

        // Autenticação na AMI
        writer.write("Action: Login\r\n")
        writer.write("Username: $username\r\n")
        writer.write("Secret: $password\r\n")
        writer.write("ActionID: 1\r\n\r\n")
        writer.flush()

        // Ler a resposta de login
        println("Resposta de login:")
        var line = reader.readLine()
        while (line != null && line.isNotEmpty()) {
            println(line)
            line = reader.readLine()
        }

        // Escutar eventos de chamadas
        println("\nCapturando eventos de chamadas:")
        while (true) {
            line = reader.readLine()
            if (line != null) {
                println(line)
            }
        }

        // Fechar conexão
        writer.close()
        reader.close()
        socket.close()
    } catch (e: Exception) {
        e.printStackTrace()
    }
}
