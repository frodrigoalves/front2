/************************************************
 *                VARIÁVEIS GLOBAIS
 ************************************************/
let currentSlide = 0;
let slideInterval;
let slides;
let userLoggedIn = false;
let userWallet = null;

const POSTS_JSON = "js/posts.json";

/************************************************
 *            FUNÇÕES GERAIS / META MASK
 ************************************************/

function isWeb3Available() {
  return typeof window.ethereum !== "undefined";
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

function toggleVideoSound() {
  const video = document.getElementById("background-video");
  if (!video) return;

  video.muted = !video.muted;
  const muteButton = document.getElementById("muteButton");
  muteButton.textContent = video.muted ? "🔇" : "🔊";
  showNotification(video.muted ? "Som desativado" : "Som ativado", "success");
}

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

function updateWalletInfo(address) {
  const walletInfo = document.getElementById("walletInfo");
  if (walletInfo) walletInfo.textContent = `Carteira Conectada: ${address}`;
}

function logout() {
  userLoggedIn = false;
  userWallet = null;
  showNotification("Você foi desconectado.", "warning");
  setTimeout(() => (window.location.href = "index.html"), 1000);
}

/************************************************
 *       ROLAR AO TOPO / BOTÃO BACK-TO-TOP
 ************************************************/
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  const backToTop = document.getElementById("backToTop");
  if (backToTop) backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

/************************************************
 *               CARROSSEL (OPCIONAL)
 ************************************************/
function initializeCarousel() {
  slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 5000);
  }
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
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

/************************************************
 *     FUNÇÕES DO BLOG (3 ÚLTIMOS POSTS)
 ************************************************/
async function fetchPosts() {
  const response = await fetch(POSTS_JSON);
  return await response.json();
}

async function loadLatestPosts(limit) {
  const posts = await fetchPosts();
  const latest = posts.slice(0, limit);
  const container = document.getElementById("latest-posts");
  latest.forEach(post => container.appendChild(createPostCard(post)));
}

function createPostCard(post) {
  const card = document.createElement("div");
  card.classList.add("post-card");
  card.innerHTML = `
    <h3>${post.title}</h3>
    <p class="post-date">${formatDate(post.date)}</p>
    <p class="post-summary">${post.summary}</p>
    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ""}
  `;
  return card;
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

/************************************************
 *          EVENTOS AO CARREGAR PÁGINA
 ************************************************/
document.addEventListener('DOMContentLoaded', () => {
  checkWalletConnection();
  initializeCarousel();
  initializeCharts();
  loadLatestPosts(3);

  const muteButton = document.getElementById("muteButton");
  muteButton?.addEventListener("click", toggleVideoSound);
});