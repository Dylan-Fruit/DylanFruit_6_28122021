const modalSubmit = document.querySelector(".contact_button");
const modal = document.getElementById("contact_modal");

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

modal.addEventListener("submit", (e) => {
  e.preventDefault();
  closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
