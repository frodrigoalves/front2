// script.js

/**************************************
 *            VARIÁVEIS GLOBAIS
 **************************************/
let currentSlide = 0;
let slideInterval;
let slides;
let userLoggedIn = false;
let userWallet = null;

/**************************************
 *        VERIFICA WEB3/METAMASK
 **************************************/
function isWeb3Available() {
  return typeof window.ethereum !== "undefined";
}

/**************************************
 *        NOTIFICAÇÃO RÁPIDA
 **************************************/
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

/**************************************
 *   ALTERNAR SOM DO VÍDEO DE FUNDO
 **************************************/
function toggleVideoSound() {
  const video = document.getElementById("background-video");
  if (!video) return;

  video.muted = !video.muted;

  const muteButton = document.getElementById("muteButton");
  if (muteButton) {
    muteButton.textContent = video.muted ? "🔇" : "🔊";
  }

  showNotification(video.muted ? "Som desativado" : "Som ativado", "success");
}

/**************************************
 *         CONEXÃO COM CARTEIRA
 **************************************/
async function checkWalletConnection() {
  if (!isWeb3Available()) {
    showNotification("Web3 não está disponível. Instale o MetaMask.", "error");
    return;
  }

  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      userWallet = accounts[0];
      userLoggedIn = true;
      updateWalletInfo(userWallet);
      showNotification("Carteira conectada: " + userWallet, "success");
    } else {
      showNotification("Nenhuma carteira conectada.", "warning");
    }
  } catch (error) {
    showNotification("Erro ao verificar carteira: " + error.message, "error");
  }
}

/**************************************
 * ATUALIZA INFORMAÇÕES DE CARTEIRA
 **************************************/
function updateWalletInfo(address) {
  const walletInfo = document.getElementById("walletInfo");
  if (walletInfo) {
    walletInfo.textContent = `Carteira Conectada: ${address}`;
  }
}

/**************************************
 *              LOGOUT
 **************************************/
function logout() {
  userLoggedIn = false;
  userWallet = null;
  showNotification("Você foi desconectado.", "warning");
  setTimeout(() => window.location.href = "index.html", 1000);
}

/**************************************
 *   BOTÃO VOLTAR AO TOPO
 **************************************/
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

/**************************************
 *         CARROSSEL DE SLIDES
 **************************************/
function initializeCarousel() {
  slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 5000);
  }
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  if (!slides || slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

/**************************************
 *     INICIALIZA GRÁFICOS (CHART.JS)
 **************************************/
function initializeCharts() {
  const ctx1 = document.getElementById("chartUtilizacao")?.getContext("2d");
  if (ctx1) {
    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["IA", "Blockchain", "Segurança", "Token"],
        datasets: [{
          label: "Utilização (%)",
          data: [75, 60, 90, 80],
          backgroundColor: ["#007bff", "#28a745", "#ffc107", "#17a2b8"],
        }],
      },
    });
  }

  const ctx2 = document.getElementById("chartAdocao")?.getContext("2d");
  if (ctx2) {
    new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["2022", "2023", "2024", "2025"],
        datasets: [{
          label: "Adoção (%)",
          data: [30, 50, 70, 90],
          borderColor: "#007bff",
          fill: false,
        }],
      },
    });
  }
}

/**************************************
 *         AO CARREGAR A PÁGINA
 **************************************/
window.onload = () => {
  checkWalletConnection();
  initializeCarousel();
  initializeCharts();
};
