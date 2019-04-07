const startContainer = document.getElementById("start-container");
const mainContainer = document.getElementById("main-container");

startContainer.addEventListener("click", () => {
  startContainer.classList.toggle("hidden");
  mainContainer.classList.toggle("hidden");
});
