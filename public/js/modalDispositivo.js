document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente carregado!");

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
});
