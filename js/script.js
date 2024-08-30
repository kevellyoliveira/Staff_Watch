document.addEventListener("DOMContentLoaded", () => {
    const openModal = document.querySelectorAll(".open-modal"); 
    const closeModal = document.querySelector("#close-modal");
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");

    const toggleModal = () => {
        modal.classList.toggle("hide");
        fade.classList.toggle("hide");
    }
    openModal.forEach((button) => {
        button.addEventListener("click", toggleModal);
    });
    
    [closeModal, fade].forEach((el) => {
        if (el) {
            el.addEventListener("click", toggleModal);
        }
    });
});
