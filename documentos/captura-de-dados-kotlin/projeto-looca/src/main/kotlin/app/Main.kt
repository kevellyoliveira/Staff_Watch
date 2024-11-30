package app

import dominio.Monitoramento
import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.rede.RedeInterface
import repositorio.monitoramentoRepositorio


open class Main {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {

            val looca = Looca()

            val monitoramentoRepositorio = monitoramentoRepositorio()
            monitoramentoRepositorio.configurar()

            val novoMonitoramento = Monitoramento()


            while (true){

                if (monitoramentoRepositorio.existePorId(1)) {
                    // Criação do gerenciador
                    val grupoDeRedes = looca.rede.grupoDeInterfaces
                    val rotacao: Int = 20
                    var i = 0
                    for (i in 0..rotacao) {

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

                        println("Mandando dados de rede para o banco...")
                        monitoramentoRepositorio.inserirRedeEnvLooca(novoMonitoramento)
                        if (monitoramentoRepositorio.inserirRedeEnvLooca(novoMonitoramento) &&
                            monitoramentoRepositorio.inserirRedeRecebLooca(novoMonitoramento)
                        ) {
                            println("Insert feito")
                        }
                        println("Mandando dados de pacote para o banco...")
                        if (monitoramentoRepositorio.inserirPctEnvLooca(novoMonitoramento) &&
                            monitoramentoRepositorio.inserirPctRecebLooca(novoMonitoramento)
                        ) {
                            println("Insert feito")
                        }
                        println("Mandando dados de seviços ativos no banco")
                        if (monitoramentoRepositorio.inserirServicosLooca(novoMonitoramento)) {
                            println("Insert feito")
                        }
                        println("Mandando dado do total de procesos no banco")
                        if (monitoramentoRepositorio.inserirProcessosLooca(novoMonitoramento)) {
                            println("Insert feito")
                        }
                        println("Mandando dado de tempo de atividade no banco")
                        if (monitoramentoRepositorio.inserirTempoAtividadeLooca(novoMonitoramento)) {
                            println("Insert feito")
                        }

                    }
                    println("Todos os inserts feitos!")
                }else{
                    println("Não existe um computador com esse id")
                }
            }
        }
    }
}