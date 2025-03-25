/* script.js */

// Variáveis globais
let currentSlide = 0;
let slideInterval;
let slides;
let userLoggedIn = false;
let userWallet = null;

// Verifica se o Web3 está disponível
function isWeb3Available() {
    return typeof window.ethereum !== "undefined";
}

// Notificação Personalizada
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Alternar som do vídeo
function toggleVideoSound() {
    const video = document.getElementById("background-video");
    video.muted = !video.muted;
    const muteButton = document.getElementById("muteButton");
    muteButton.textContent = video.muted ? "🔇" : "🔊";
    showNotification(video.muted ? "Som desativado" : "Som ativado", "success");
}

// Verificar conexão com carteira no carregamento
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

// Atualizar Informações da Carteira
function updateWalletInfo(address) {
    const walletInfo = document.getElementById("walletInfo");
    if (walletInfo) {
        walletInfo.textContent = `Carteira Conectada: ${address}`;
    }
}

// Logout da Carteira
function logout() {
    userLoggedIn = false;
    userWallet = null;
    showNotification("Você foi desconectado.", "warning");
    setTimeout(() => window.location.href = "index.html", 1000);
}

// Botão de Voltar ao Topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar ou Ocultar Botão de Voltar ao Topo
window.addEventListener("scroll", function() {
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    }
});

// Carrossel Automático para as frases
function initializeCarousel() {
    slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        showSlide(currentSlide); // Mostrar o primeiro slide
        slideInterval = setInterval(nextSlide, 5000); // Alterando para 5 segundos de intervalo
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
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Inicialização dos Gráficos (Certifique-se de incluir a biblioteca Chart.js no HTML)
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

// Botão de Som
const muteButton = document.getElementById("muteButton");
if (muteButton) {
    muteButton.addEventListener("click", toggleVideoSound);
}

// Função de Inicialização
window.onload = () => {
    checkWalletConnection();
    initializeCarousel();
    initializeCharts();
};

setInterval(nextSlide, 5000); // Aumentei o intervalo para 5 segundos entre cada slide
