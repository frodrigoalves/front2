/** script.js - Ajustado */
document.addEventListener('DOMContentLoaded', () => {
  checkWalletConnection();
  initializeCarousel();
  initializeCharts();
  loadLatestPosts(3);

  const muteButton = document.getElementById("muteButton");
  muteButton?.addEventListener("click", toggleVideoSound);

  window.addEventListener("scroll", () => {
    const backToTop = document.getElementById("backToTop");
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
});

// Restante das funções já organizadas anteriormente podem ser mantidas integralmente como estavam.

/** dashboard.js - Ajustado */
window.addEventListener('DOMContentLoaded', async () => {
  await checkWalletConnectionDashboard();
  initializeDashboardCharts();
});

function showSection(sectionId) {
  document.querySelectorAll(".content-container").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(sectionId)?.style.setProperty('display', 'block');
}

async function connectWallet() {
  if (!window.ethereum) return alert("MetaMask não encontrada. Instale ou ative a extensão.");

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    currentAccount = accounts[0];
    userLoggedIn = true;
    document.getElementById("walletAddress").textContent = `Carteira Conectada: ${currentAccount}`;
  } catch (err) {
    alert("Erro ao conectar carteira: " + err.message);
  }
}

// As demais funções (enviarMensagem, criarLegado, agendarPostagem, etc.) estão bem estruturadas e podem permanecer como estavam.
