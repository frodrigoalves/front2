/************************************************
 *                VARIÁVEIS GLOBAIS
 ************************************************/
let currentSlide = 0;
let slideInterval;
let slides;
let userLoggedIn = false;
let userWallet = null;

// Caminho do arquivo JSON com as postagens
const POSTS_JSON = "js/posts.json";

/************************************************
 *            FUNÇÕES GERAIS / META MASK
 ************************************************/

/**
 * Verifica se Web3 (MetaMask) está disponível.
 */
function isWeb3Available() {
  return typeof window.ethereum !== "undefined";
}

/**
 * Exibe notificações rápidas na tela.
 * @param {string} message - Texto da notificação
 * @param {string} [type="info"] - Tipo: "info", "success", "warning", "error"
 */
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

/**
 * Alterna o som do vídeo de fundo (muted <-> unmuted).
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
 * Verifica se a carteira (MetaMask) está conectada quando a página carrega.
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
 * Atualiza informações da carteira na tela (ex.: <p id="walletInfo">).
 */
function updateWalletInfo(address) {
  const walletInfo = document.getElementById("walletInfo");
  if (walletInfo) {
    walletInfo.textContent = `Carteira Conectada: ${address}`;
  }
}

/**
 * Faz logout da carteira (simples).
 */
function logout() {
  userLoggedIn = false;
  userWallet = null;
  showNotification("Você foi desconectado.", "warning");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

/************************************************
 *       ROLAR AO TOPO / BOTÃO BACK-TO-TOP
 ************************************************/
/**
 * Rola a página suavemente para o topo.
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Exibe/oculta o botão "backToTop" baseado na rolagem da página.
 */
window.addEventListener("scroll", () => {
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

/************************************************
 *               CARROSSEL (OPCIONAL)
 ************************************************/
function initializeCarousel() {
  slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 5000); // 5 segundos
  }
}

/**
 * Exibe o slide de índice "index" e esconde os demais.
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
 * Mostra o próximo slide no carrossel.
 */
function nextSlide() {
  if (!slides || slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

/************************************************
 *          GRÁFICOS (CHART.JS) (OPCIONAL)
 ************************************************/
function initializeCharts() {
  const ctx1 = document.getElementById("chartUtilizacao")?.getContext("2d");
  if (ctx1) {
    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["IA", "Blockchain", "Segurança", "Token"],
        datasets: [
          {
            label: "Utilização (%)",
            data: [75, 60, 90, 80],
            backgroundColor: ["#007bff", "#28a745", "#ffc107", "#17a2b8"],
          },
        ],
      },
    });
  }

  const ctx2 = document.getElementById("chartAdocao")?.getContext("2d");
  if (ctx2) {
    new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "Adoção (%)",
            data: [30, 50, 70, 90],
            borderColor: "#007bff",
            fill: false,
          },
        ],
      },
    });
  }
}

/************************************************
 *     FUNÇÕES DO BLOG (3 ÚLTIMOS POSTS)
 ************************************************/
/**
 * Busca as postagens a partir do arquivo `posts.json`.
 */
async function fetchPosts() {
  const response = await fetch(POSTS_JSON);
  const data = await response.json();
  return data; // array de objetos
}

/**
 * Carrega "limit" últimos posts para a página inicial.
 * @param {number} limit - Quantos posts exibir
 */
async function loadLatestPosts(limit) {
  try {
    const posts = await fetchPosts();
    // Se posts estiver do mais recente ao mais antigo, só usar slice(0, limit).
    // Caso contrário, reordene ou faça posts.reverse() se necessário.
    const latest = posts.slice(0, limit);

    const container = document.getElementById("latest-posts");
    if (!container) return;

    latest.forEach((post) => {
      const card = createPostCard(post);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao carregar últimos posts:", err);
  }
}

/**
 * Cria um card (HTML) para cada post.
 */
function createPostCard(post) {
  const card = document.createElement("div");
  card.classList.add("post-card");

  // Título
  const title = document.createElement("h3");
  title.textContent = post.title;
  card.appendChild(title);

  // Data formatada
  const dateP = document.createElement("p");
  dateP.classList.add("post-date");
  dateP.textContent = formatDate(post.date);
  card.appendChild(dateP);

  // Resumo
  const summary = document.createElement("p");
  summary.classList.add("post-summary");
  summary.textContent = post.summary;
  card.appendChild(summary);

  // Imagem (opcional)
  if (post.image) {
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;
    img.classList.add("post-image");
    card.appendChild(img);
  }

  return card;
}

/**
 * Formata data do tipo "2025-05-10" para "10/05/2025".
 */
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

/************************************************
 *          EVENTOS AO CARREGAR PÁGINA
 ************************************************/
window.onload = () => {
  // 1. Verifica se carteira está conectada
  checkWalletConnection();

  // 2. Inicia carrossel (caso haja .slide)
  initializeCarousel();

  // 3. Inicia gráficos (caso haja #chartUtilizacao, #chartAdocao)
  initializeCharts();

  // 4. Carrega 3 últimos posts
  loadLatestPosts(3);
};

// Se existir o botão mute, adiciona o listener
const muteButton = document.getElementById("muteButton");
if (muteButton) {
  muteButton.addEventListener("click", toggleVideoSound);
}
