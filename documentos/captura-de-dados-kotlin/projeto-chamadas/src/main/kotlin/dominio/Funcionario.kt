package dominio

class Funcionario {

    var idFuncionario: Int? = 0;
    var nome: String? = "";
    var email: String? = "";
    var telefone: String? = "";
    var senha: String? = "";
    var status: Int? = 0
    var fkEmpresa: Int? = 0;
    var fkEquipe: Int? = 0;
    var fkCargo: Int? = 0;

}