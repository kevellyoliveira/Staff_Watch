import repositories.*

fun main() {

    val slackRepository : SlackRepository = SlackRepository()
    val cpuRepository: CpuRepository = CpuRepository();
    val discoRepository: DiscoRepository = DiscoRepository();
    val memoriaRepository: MemoriaRepository = MemoriaRepository()
    val redeRepository: RedeRepository = RedeRepository();

    slackRepository.configurar()
    cpuRepository.configurar();
    discoRepository.configurar();
    memoriaRepository.configurar();
    redeRepository.configurar();


    var i = 1;
    while (i < 10){


        cpuRepository.listarCpuPorcent()

        cpuRepository.verificarDispararCpu()

        discoRepository.listarDiscoUso()
        discoRepository.listarDiscoTotal()
        discoRepository.listarDiscoPorcent()

        discoRepository.verificarDispararDisc1()
        discoRepository.verificarDispararDisc2()
        discoRepository.verificarDispararDisc3()

        memoriaRepository.listarMemoriaUso()
        memoriaRepository.listarMemoriaTotal()
        memoriaRepository.listarMemoriaPorcent()

        memoriaRepository.verificarDispararMem1()
        memoriaRepository.verificarDispararMem2()
        memoriaRepository.verificarDispararMem3()

        redeRepository.listarRedeEnviados()
        redeRepository.listarRedeRecebidos()

        redeRepository.verificarDispararRede1()
        redeRepository.verificarDispararRede2()
        redeRepository.verificarDispararRede3()
        redeRepository.verificarDispararRede4()

i++
    }

//    val slack: Slack = Slack.getInstance()
//    val response: ApiTestResponse = slack.methods().apiTest { it.foo("bar") }
//
//    print("Response + ${response.isOk}")

}