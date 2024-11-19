package app

import com.twilio.Twilio
import com.twilio.rest.api.v2010.account.Call
import com.twilio.type.PhoneNumber
import repositorio.ChamadaRepository

open class Main {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {

            val chamadaRepository = ChamadaRepository()
            chamadaRepository.configurar()
            val listaFuncionario = chamadaRepository.listarFuncionarios()

//            while (true) {
                for (i in 0..listaFuncionario.size - 1) {
                    println(listaFuncionario[i].telefone)

                    val call = chamadaRepository.pegarChamada(listaFuncionario[i].telefone)
                    val capturaDados = chamadaRepository.capturarRegistrosDeChamadas()
                }
        }
    }
}
