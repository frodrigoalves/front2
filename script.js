/* script.js */

// Variáveis globais
let userLoggedIn = false;
let userWallet = null;
const contractAddress = "SEU_CONTRATO_AQUI";
const contractABI = [/* ABI do contrato */];

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
                showNotification("Carteira conectada: " + userWallet, "success");
            } else {
                showNotification("Nenhuma carteira conectada.", "warning");
            }
        } catch (error) {
            showNotification("Erro ao verificar carteira: " + error.message, "error");
        }
    } else {
        showNotification("Web3 não está disponível.", "error");
    }
}

// Logout
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
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

// Carrossel Automático
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? "block" : "none";
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000);

// Inicialização dos Gráficos
function initializeCharts() {
    const ctx1 = document.getElementById("chartUtilizacao").getContext("2d");
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

    const ctx2 = document.getElementById("chartAdocao").getContext("2d");
    new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["2022", "2023", "2024", "2025"],
            datasets: [{
                label: "Adoção (%)",
                data: [30, 50, 70, 90],
                backgroundColor: "#007bff",
            }],
        },
    });
}

window.onload = () => {
    checkWalletConnection();
    initializeCharts();
};
