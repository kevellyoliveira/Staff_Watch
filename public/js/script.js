document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente carregado!");


    // const openModal = document.querySelectorAll(".open-modal");
    // const closeModal = document.querySelector("#close-modal");
    // const modal = document.querySelector("#modal");
    // const fade = document.querySelector("#fade");

    // const openModal2 = document.querySelectorAll(".open-modal2");
    // const closeModal2 = document.querySelector("#close-modal2");
    // const modal2 = document.querySelector("#modal2");
    // const fade2 = document.querySelector("#fade2");
    // const botaoModalEdit = document.getElementById("editarBot");

    // const toggleModal = () => {
    //     modal.classList.toggle("hide");
    //     fade.classList.toggle("hide");
    // };

    const toggleModal2 = () => {
        modal2.classList.toggle("hide");
        fade2.classList.toggle("hide");
    };

    // Impedir propagação do clique em "up-card"
    const upCardElements = document.querySelectorAll(".up-card");
    upCardElements.forEach(element => {
        element.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede propagação para não abrir o modal
            console.log("Clique bloqueado em up-card"); // Debug
        });
    });

    // Adiciona evento para abrir o primeiro modal ao clicar no card
    openModal.forEach(button => {
        button.addEventListener("click", (event) => {
            // Verifica se o clique foi em um elemento com .up-card e bloqueia a abertura do modal
            if (event.target.closest(".up-card")) {
                console.log("Clique em up-card, modal não será aberto."); // Debug
                return; // Não abre o modal
            }
            console.log("Modal será aberto."); // Debug
            toggleModal(); // Abre o modal
        });
    });

    // // Adiciona eventos para fechar os modais
    // closeModal.addEventListener("click", toggleModal);
    // fade.addEventListener("click", toggleModal);

    // closeModal2.addEventListener("click", toggleModal2);
    // fade2.addEventListener("click", toggleModal2);

    // // Adiciona evento para o botão de edição
    // botaoModalEdit.addEventListener("click", (event) => {
    //     event.stopPropagation();
    //     toggleModal2();
    // });
});
