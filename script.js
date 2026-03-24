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

// API Integration - CEP Consultation
const cepInput = document.getElementById("cepInput");
const consultarCepBtn = document.getElementById("consultarCepBtn");
const cepResult = document.getElementById("cepResult");

consultarCepBtn.addEventListener("click", async () => {
  const cep = cepInput.value.replace(/\D/g, ""); // Remove non-digits
  if (cep.length !== 8) {
    cepResult.innerHTML =
      '<p style="color: red;">Por favor, digite um CEP válido com 8 dígitos.</p>';
    return;
  }

  try {
    cepResult.innerHTML = "<p>Buscando CEP...</p>";
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      cepResult.innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
    } else {
      cepResult.innerHTML = `
                <p><strong>Rua:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>
            `;
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    cepResult.innerHTML =
      '<p style="color: red;">Erro ao buscar CEP. Tente novamente mais tarde.</p>';
  }
});

// API Integration - CNPJ Consultation
const cnpjInput = document.getElementById("cnpjInput");
const consultarCnpjBtn = document.getElementById("consultarCnpjBtn");
const cnpjResult = document.getElementById("cnpjResult");

consultarCnpjBtn.addEventListener("click", async () => {
  const cnpj = cnpjInput.value.replace(/\D/g, ""); // Remove non-digits
  if (cnpj.length !== 14) {
    cnpjResult.innerHTML =
      '<p style="color: red;">Por favor, digite um CNPJ válido com 14 dígitos.</p>';
    return;
  }

  try {
    cnpjResult.innerHTML = "<p>Buscando CNPJ...</p>";
    const response = await fetch(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
    );
    const data = await response.json();

    if (response.status === 404) {
      cnpjResult.innerHTML = '<p style="color: red;">CNPJ não encontrado.</p>';
      return;
    }
    if (!response.ok) {
      throw new Error(data.message || "Erro na consulta de CNPJ");
    }

    cnpjResult.innerHTML = `
            <p><strong>Nome da Empresa:</strong> ${data.razao_social || "Não informado"}</p>
            <p><strong>Situação:</strong> ${data.situacao_cadastral || "Não informado"}</p>
            <p><strong>Cidade/UF:</strong> ${data.municipio}/${data.uf || "Não informado"}</p>
        `;
  } catch (error) {
    console.error("Erro ao buscar CNPJ:", error);
    cnpjResult.innerHTML = `<p style="color: red;">Erro ao buscar CNPJ: ${error.message}.</p>`;
  }
});

// API Integration - IP Address Consultation
const consultarIpBtn = document.getElementById("consultarIpBtn");
const ipResult = document.getElementById("ipResult");

consultarIpBtn.addEventListener("click", async () => {
  try {
    ipResult.innerHTML = "<p>Buscando informações de IP...</p>";
    const response = await fetch("http://ip-api.com/json/");
    const data = await response.json();

    if (data.status === "fail") {
      ipResult.innerHTML = `<p style="color: red;">Erro ao buscar IP: ${data.message || "Falha desconhecida"}.</p>`;
    } else {
      ipResult.innerHTML = `
                <p><strong>Cidade:</strong> ${data.city || "Não informado"}</p>
                <p><strong>Estado:</strong> ${data.regionName || "Não informado"}</p>
                <p><strong>País:</strong> ${data.country || "Não informado"}</p>
                <p><strong>Provedor:</strong> ${data.isp || "Não informado"}</p>
            `;
    }
  } catch (error) {
    console.error("Erro ao buscar IP:", error);
    ipResult.innerHTML =
      '<p style="color: red;">Erro ao buscar IP. Verifique sua conexão.</p>';
  }
});

// Clear buttons for API Consultations
const limparCepBtn = document.getElementById("limparCepBtn");
limparCepBtn.addEventListener("click", () => {
  cepInput.value = "";
  cepResult.innerHTML = "";
});

const limparCnpjBtn = document.getElementById("limparCnpjBtn");
limparCnpjBtn.addEventListener("click", () => {
  cnpjInput.value = "";
  cnpjResult.innerHTML = "";
});

const limparIpBtn = document.getElementById("limparIpBtn");
limparIpBtn.addEventListener("click", () => {
  ipResult.innerHTML = "";
});
