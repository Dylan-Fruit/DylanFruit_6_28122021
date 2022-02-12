const modalSubmit = document.querySelector(".contact_button");

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

modalSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
});

window.addEventListener("keydown", (e) => {
    if(e.key === 'Escape'){
        closeModal();
    }
});

console.log(modalSubmit);