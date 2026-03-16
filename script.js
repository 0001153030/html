const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = "Modo Claro ☀️";
  } else {
    themeToggle.textContent = "Modo Escuro 🌙";
  }
});

const welcomeBtn = document.getElementById("welcome-btn");
const welcomeMessage = document.getElementById("welcome-message");

welcomeBtn.addEventListener("click", () => {
  welcomeMessage.textContent =
    "Bem-vindo ao meu site desenvolvido com HTML, CSS e JavaScript!";
});

const changeTextBtn = document.getElementById("change-text-btn");
const textToChange = document.getElementById("text-to-change");

changeTextBtn.addEventListener("click", () => {
  textToChange.textContent =
    "Este site agora possui interatividade com JavaScript!";
});

const changeSectionColorBtn = document.getElementById(
  "change-section-color-btn",
);
const interactivitySection = document.getElementById("interatividade");
let isSectionColored = false;

changeSectionColorBtn.addEventListener("click", () => {
  if (isSectionColored) {
    interactivitySection.style.backgroundColor = "";
    changeSectionColorBtn.textContent = "Alterar cor da seção";
  } else {
    interactivitySection.style.backgroundColor = "#e0f7fa";
    changeSectionColorBtn.textContent = "Reverter cor da seção";
  }
  isSectionColored = !isSectionColored;
});

const toggleContentBtn = document.getElementById("toggle-content-btn");
const extraContent = document.getElementById("extra-content");
let isContentVisible = false;

toggleContentBtn.addEventListener("click", () => {
  if (isContentVisible) {
    extraContent.style.display = "none";
    toggleContentBtn.textContent = "Mostrar mais informações";
  } else {
    extraContent.style.display = "block";
    toggleContentBtn.textContent = "Esconder informações";
  }
  isContentVisible = !isContentVisible;
});

const menuLinks = document.querySelectorAll(".menu-link");
const sectionMessage = document.getElementById("section-message");

menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionName = link.dataset.section;
    sectionMessage.textContent = `Você acessou a seção ${sectionName}.`;
  });
});

const hoverImage = document.getElementById("hover-image");
if (hoverImage) {
  const originalSrc = hoverImage.dataset.originalSrc;
  const hoverSrc = hoverImage.dataset.hoverSrc;

  hoverImage.addEventListener("mouseover", () => {
    hoverImage.src = hoverSrc;
  });

  hoverImage.addEventListener("mouseout", () => {
    hoverImage.src = originalSrc;
  });
}
