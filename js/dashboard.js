/************************************************
 *           VARIÁVEIS GLOBAIS E ESTADO
 ************************************************/
let currentAccount = null; // Armazena a conta (endereço) da carteira conectada
let userLoggedIn = false;  // Flag para indicar se o usuário está logado/conectado

/************************************************
 *                EXIBIR SEÇÕES
 ************************************************/
/**
 * Exibe somente a seção solicitada e oculta as demais.
 * Para isso, cada <div> de funcionalidade tem um id
 * e recebe display:none ou display:block via JS.
 */
function showSection(sectionId) {
  // Seleciona todos os containers de conteúdo
  const sections = document.querySelectorAll(".content-container");
  // Esconde todos
  sections.forEach((sec) => {
    sec.style.display = "none";
  });
  // Exibe somente a seção solicitada
  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = "block";
  }
}

/************************************************
 *             CONEXÃO COM A CARTEIRA
 ************************************************/
/**
 * Conecta a MetaMask (ou outra carteira Web3),
 * atualiza a variável global currentAccount
 * e exibe no container indicado.
 */
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Solicita ao usuário a permissão p/ acessar as contas
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        currentAccount = accounts[0];
        userLoggedIn = true;
        // Exibe a conta no elemento <p id="walletAddress">
        const walletAddress = document.getElementById("walletAddress");
        if (walletAddress) {
          walletAddress.textContent = "Carteira Conectada: " + currentAccount;
        }
      } else {
        alert("Nenhuma conta disponível na carteira.");
      }
    } catch (err) {
      alert("Erro ao conectar carteira: " + err.message);
    }
  } else {
    alert("MetaMask não encontrada. Instale ou ative a extensão.");
  }
}

/**
 * Verifica se há uma conta MetaMask já conectada
 * (ex.: caso o usuário tenha autorizado antes).
 */
async function checkWalletConnectionDashboard() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        currentAccount = accounts[0];
        userLoggedIn = true;
        const walletAddress = document.getElementById("walletAddress");
        if (walletAddress) {
          walletAddress.textContent = "Carteira Conectada: " + currentAccount;
        }
      } else {
        console.log("Nenhuma carteira conectada.");
      }
    } catch (error) {
      console.error("Erro ao verificar carteira:", error);
    }
  } else {
    console.warn("Web3 não está disponível. Instale o MetaMask.");
  }
}

/************************************************
 *            FUNCIONALIDADES PRINCIPAIS
 ************************************************/
/**
 * Envia uma mensagem para outro endereço da blockchain.
 */
function enviarMensagem() {
  if (!currentAccount) {
    alert("Conecte sua carteira antes de enviar mensagens!");
    return;
  }
  const recipient = document.getElementById("msgRecipient").value;
  const content = document.getElementById("msgContent").value;

  console.log(`Enviando mensagem para ${recipient}... Conteúdo: ${content}`);
  // Aqui você chamaria o contrato inteligente ou API.
  alert("Mensagem enviada com sucesso!");
}

/**
 * Cria um legado digital para um herdeiro (tutor).
 */
function criarLegado() {
  if (!currentAccount) {
    alert("Conecte sua carteira antes de criar um legado!");
    return;
  }
  const heir = document.getElementById("legacyHeir").value;
  const description = document.getElementById("legacyDescription").value;

  console.log(`Criando legado para o herdeiro ${heir}: ${description}`);
  // Chamaria o contrato inteligente.
  alert("Legado criado com sucesso!");
}

/**
 * Agenda uma postagem para data futura.
 */
function agendarPostagem() {
  if (!currentAccount) {
    alert("Conecte sua carteira antes de agendar!");
    return;
  }
  const recipient = document.getElementById("postRecipient").value;
  const content = document.getElementById("postContent").value;
  const date = document.getElementById("postDate").value;

  console.log(`Agendando postagem para ${recipient} em ${date}: ${content}`);
  // Chamaria o contrato ou API para programar essa postagem.
  alert("Postagem agendada com sucesso!");
}

/**
 * Cria (gera) uma nova carteira, exemplo fictício.
 */
function criarNovaCarteira() {
  if (!currentAccount) {
    alert("Conecte sua carteira antes de criar outra!");
    return;
  }
  // Exemplo fake: cria um "endereço" aleatório (não é funcional).
  const fakeWallet = `0xFAKE${Math.floor(Math.random() * 1e14).toString(16)}`;
  const resultado = document.getElementById("resultadoCarteira");
  if (resultado) {
    resultado.textContent = "Nova carteira gerada: " + fakeWallet;
  }
}

/**
 * Faz upload de um arquivo para IPFS (exemplo).
 */
async function uploadToIPFS() {
  if (!currentAccount) {
    alert("Conecte sua carteira antes de fazer upload!");
    return;
  }
  const fileInput = document.getElementById("fileUpload");
  if (!fileInput.files.length) {
    alert("Selecione um arquivo antes de fazer upload.");
    return;
  }
  const file = fileInput.files[0];
  console.log("Fazendo upload para IPFS:", file.name);

  // Exemplo fictício, sem integração real com IPFS.
  const mockHash = "QmFakeHash123";
  const ipfsHash = document.getElementById("ipfsHash");
  if (ipfsHash) {
    ipfsHash.textContent = "Upload concluído! IPFS Hash: " + mockHash;
  }
}

/**
 * Lista as mensagens enviadas em um <ul> (exemplo).
 */
function listarMensagensEnviadas() {
  // Exemplo: suposta busca no contrato/DB.
  const dummyMessages = [
    { recipient: "0x123...", content: "Olá do passado" },
    { recipient: "0xABC...", content: "Outra mensagem" },
  ];
  const ul = document.getElementById("messageList");
  if (!ul) return;

  ul.innerHTML = ""; // limpa lista
  dummyMessages.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = `Para: ${msg.recipient} | Conteúdo: ${msg.content}`;
    ul.appendChild(li);
  });
}

/************************************************
 *             INICIALIZAR GRÁFICOS
 ************************************************/
function initializeDashboardCharts() {
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
 *                   LOGOUT
 ************************************************/
function logout() {
  alert("Você foi desconectado.");
  userLoggedIn = false;
  currentAccount = null;
  // Redireciona para a página inicial (ou outra)
  window.location.href = "index.html";
}

/************************************************
 *        AO CARREGAR O DASHBOARD
 ************************************************/
window.onload = async () => {
  // Verifica se a carteira já estava conectada.
  await checkWalletConnectionDashboard();

  // Se quiser listar as mensagens assim que abre o dashboard:
  // listarMensagensEnviadas();

  // Inicializa gráficos (caso tenha <canvas> no HTML).
  initializeDashboardCharts();
};
