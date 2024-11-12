import repositories.SlackRepository

fun main() {

    val slackRepository : SlackRepository = SlackRepository()

    slackRepository.configurar()
    val dadosAcima = slackRepository.listarDadosAcima()
    print(dadosAcima)

    slackRepository.verificarEdispararAlerta()


//    val slack: Slack = Slack.getInstance()
//    val response: ApiTestResponse = slack.methods().apiTest { it.foo("bar") }
//
//    print("Response + ${response.isOk}")

}