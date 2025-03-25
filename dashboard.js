// dashboard.js

/**
 * Verifica carteira no dashboard
 */
async function checkWalletConnectionDashboard() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          document.getElementById("walletInfo").textContent = 
            "Carteira Conectada: " + accounts[0];
        } else {
          document.getElementById("walletInfo").textContent = 
            "Nenhuma carteira conectada";
        }
      } catch (error) {
        console.error("Erro ao verificar carteira:", error);
      }
    } else {
      console.warn("Web3 não está disponível. Instale o MetaMask.");
    }
  }
  
  /**
   * Logout básico
   */
  function logout() {
    alert("Você foi desconectado.");
    window.location.href = "index.html";
  }
  
  /**
   * Inicializa gráficos com Chart.js
   */
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
  
  /**
   * Ao carregar a página do dashboard
   */
  window.onload = () => {
    checkWalletConnectionDashboard();
    initializeDashboardCharts();
  };
  