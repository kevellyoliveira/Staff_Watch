import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.rede.RedeInterface


fun main() {

    val looca= Looca()


    println(looca.rede.parametros.servidoresDns)
    println()
    println(looca.sistema.tempoDeAtividade)
    println()
    println(looca.grupoDeProcessos.totalProcessos)
    println()
    println(looca.rede.grupoDeInterfaces.interfaces)
    println()
    println(looca.grupoDeServicos.totalDeServicos)
    println()



    val monitoramentoRepositorio = monitoramentoRepositorio()
    monitoramentoRepositorio.configurar()

    val novoMonitoramento = Monitoramento()

    // Criação do gerenciador
    val grupoDeRedes = looca.rede.grupoDeInterfaces

// Obtendo lista de interfaces de rede a partir do getter
    val interfaces: List<RedeInterface> = grupoDeRedes.interfaces

// Filtrando a interface wlan2 e adicionando à lista
    val wlan2Interface = interfaces.find { it.nome == "wlan2" }
    if (wlan2Interface != null) {
        val bytesEnviados = wlan2Interface.bytesEnviados
        val bytesRecebidos = wlan2Interface.bytesRecebidos

        novoMonitoramento.redeEnvLooca = bytesEnviados
        novoMonitoramento.redeEnvLooca = bytesRecebidos

        println("Interface wlan2 encontrada:")
        println("Bytes enviados: $bytesEnviados")
        println("Bytes recebidos: $bytesRecebidos")
    }

    if (wlan2Interface != null) {
        val pctEnviados = wlan2Interface.pacotesEnviados
        val pctRecebidos = wlan2Interface.pacotesRecebidos

        novoMonitoramento.pctEnvLooca = pctEnviados
        novoMonitoramento.pctRecebLooca = pctRecebidos
        println("Interface wlan2 encontrada:")
        println("pcts enviados: $pctEnviados")
        println("pct recebidos: $pctRecebidos")
    }

    novoMonitoramento.servicosLooca = looca.grupoDeServicos.totalDeServicos

    novoMonitoramento.processosLooca = looca.grupoDeProcessos.totalProcessos

    novoMonitoramento.tempoAtividadeLooca = looca.sistema.tempoDeAtividade

    monitoramentoRepositorio.inserirRedeEnvLooca(novoMonitoramento)
    monitoramentoRepositorio.inserirRedeRecebLooca(novoMonitoramento)
    monitoramentoRepositorio.inserirPctEnvLooca(novoMonitoramento)
    monitoramentoRepositorio.inserirPctRecebLooca(novoMonitoramento)
    monitoramentoRepositorio.inserirServicosLooca(novoMonitoramento)
    monitoramentoRepositorio.inserirProcessosLooca(novoMonitoramento)
    monitoramentoRepositorio.inserirTempoAtividadeLooca(novoMonitoramento)

    /*Bytes recebidos: 117243982
Bytes enviados: 15450483
Pacotes recebidos: 109100
Pacotes enviados: 51780*/

}