// Seleção de elementos
const openModal = document.querySelectorAll(".open-modal");
const closeModal = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

// Função para alternar a visibilidade do modal
const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

// Adiciona evento de clique para abrir o modal
openModal.forEach(button => {
    button.addEventListener("click", toggleModal);
});

// Adiciona evento de clique para fechar o modal
fade.addEventListener("click", toggleModal);
closeModal.addEventListener("click", toggleModal);
