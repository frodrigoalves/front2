/* dashboard.js */

// Se precisar do logout e outras funções da carteira, copie de "script.js"
// ou importe as mesmas funções de um módulo (caso utilize bundlers/module systems).

async function checkWalletConnectionDashboard() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          document.getElementById("walletInfo").textContent = "Carteira Conectada: " + accounts[0];
        } else {
          document.getElementById("walletInfo").textContent = "Nenhuma carteira conectada";
        }
      } else {
        console.warn("Web3 não está disponível. Instale o MetaMask.");
      }
    } catch (error) {
      console.error("Erro ao verificar carteira:", error);
    }
  }
  
  function logout() {
    alert("Você foi desconectado.");
    window.location.href = "index.html";
  }
  
  // Inicializa Chart.js (sugestão) - ou mantenha no script principal
  function initializeDashboardCharts() {
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
  
  // Inicia ao carregar o Dashboard
  window.onload = () => {
    checkWalletConnectionDashboard();
    initializeDashboardCharts();
  };
  