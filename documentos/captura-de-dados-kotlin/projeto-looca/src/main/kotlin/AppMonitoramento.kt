import com.github.britooo.looca.api.core.Looca

fun main() {

    val looca= Looca()


    println(looca.rede.parametros.servidoresDns)
    println()
    println(looca.sistema.tempoDeAtividade)
    println()
    println(looca.grupoDeProcessos.totalProcessos)
    println()



    /*
    val dataSource: BasicDataSource = BasicDataSource()
    dataSource.driverClassName = "org.h2.Driver"
    //dataSource.url = "jdbc:h2:file:./festival"
    dataSource.url = "jdbc:h2:mem:festival"
    dataSource.username = "sa"
    dataSource.password = ""
*/
}