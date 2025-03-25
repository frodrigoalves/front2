/* script.js */

// Variáveis globais
let currentSlide = 0;
let slideInterval;
let slides;
let userLoggedIn = false;
let userWallet = null;

/**
 * Verifica se o Web3 está disponível (ex.: MetaMask)
 * @returns {boolean} - true se Web3/metamask estiver disponível, caso contrário false
 */
function isWeb3Available() {
  return typeof window.ethereum !== "undefined";
}

/**
 * Exibe notificações personalizadas na tela
 * @param {string} message - Mensagem a ser exibida
 * @param {string} [type="info"] - Tipo de notificação (info, success, warning, error)
 */
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

/**
 * Alterna o som do vídeo de fundo (mudo <-> som)
 */
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

/**
 * Verifica se o usuário já possui uma carteira conectada ao carregar a página
 */
async function checkWalletConnection() {
  if (isWeb3Available()) {
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
  } else {
    showNotification("Web3 não está disponível. Instale o MetaMask.", "error");
  }
}

/**
 * Atualiza a exibição de informações da carteira na tela
 * @param {string} address - Endereço da carteira conectada
 */
function updateWalletInfo(address) {
  const walletInfo = document.getElementById("walletInfo");
  if (walletInfo) {
    walletInfo.textContent = `Carteira Conectada: ${address}`;
  }
}

/**
 * Desconecta a carteira (logout) e redireciona para o index
 */
function logout() {
  userLoggedIn = false;
  userWallet = null;
  showNotification("Você foi desconectado.", "warning");
  setTimeout(() => window.location.href = "index.html", 1000);
}

/**
 * Botão de voltar ao topo (scroll suave)
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Mostra ou oculta o botão de voltar ao topo baseado na rolagem
 */
window.addEventListener("scroll", function() {
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

/**
 * Carrossel automático para textos ou depoimentos
 */
function initializeCarousel() {
  slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    showSlide(currentSlide);      // Exibe o primeiro slide
    slideInterval = setInterval(nextSlide, 5000); // Troca de slide a cada 5s
  }
}

/**
 * Exibe um slide específico
 * @param {number} index - Índice do slide
 */
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

/**
 * Mostra o próximo slide
 */
function nextSlide() {
  if (!slides || slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

/**
 * Inicializa gráficos usando a biblioteca Chart.js
 * (Certifique-se de incluir Chart.js no HTML ou de forma externa)
 */
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

/**
 * Listener para o botão de som do vídeo
 */
const muteButton = document.getElementById("muteButton");
if (muteButton) {
  muteButton.addEventListener("click", toggleVideoSound);
}

/**
 * Inicialização ao carregar a página
 */
window.onload = () => {
  checkWalletConnection();
  initializeCarousel();
  initializeCharts();
};
