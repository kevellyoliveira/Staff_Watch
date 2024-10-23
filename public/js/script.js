document.addEventListener("DOMContentLoaded", () => {
    const openModal = document.querySelectorAll(".open-modal");
    const closeModal = document.querySelector("#close-modal");
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");

    const openModal2 = document.querySelectorAll(".open-modal2");
    const closeModal2 = document.querySelector("#close-modal2");
    const modal2 = document.querySelector("#modal2");
    const fade2 = document.querySelector("#fade2");
    const botaoModalEdit = document.getElementById("editarBot");

    const toggleModal = () => {
        modal.classList.toggle("hide");
        fade.classList.toggle("hide");
    };

    const toggleModal2 = () => {
        modal2.classList.toggle("hide");
        fade2.classList.toggle("hide");
    };

    // Adiciona evento para abrir o primeiro modal ao clicar no card
    openModal.forEach(button => {
        button.addEventListener("click", (event) => {
            if (event.target !== botaoModalEdit) {
                toggleModal();
            } else {
                toggleModal2();
            }
        });
    });

    // Adiciona eventos para fechar os modais
    closeModal.addEventListener("click", toggleModal);
    fade.addEventListener("click", toggleModal);

    closeModal2.addEventListener("click", toggleModal2);
    fade2.addEventListener("click", toggleModal2);

    // Adiciona evento para o botão de edição
    botaoModalEdit.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleModal2();
    });
});
