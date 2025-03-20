/* script.js */

// Variáveis globais
let userLoggedIn = false;
let userWallet = null;
const contractAddress = "SEU_CONTRATO_AQUI"; // Endereço do contrato
const contractABI = [/* ABI do contrato */];

// ========== Verifica se o Web3 está disponível ==========
function isWeb3Available() {
  return typeof window.ethereum !== "undefined";
}

// Função para abrir o modal deslizante
function openSlideModal(action) {
  const slideModal = document.getElementById('slideModal');
  const modalBody = document.getElementById('slideModalBody');
  slideModal.classList.add('active');

  switch(action) {
      case 'login':
          modalBody.innerHTML = `
              <h3>Login</h3>
              <input type="email" placeholder="E-mail" id="loginEmail" required>
              <input type="password" placeholder="Senha" id="loginPassword" required>
              <button onclick="loginWithEmail()">Entrar</button>
          `;
          break;
      case 'connect':
          modalBody.innerHTML = `
              <h3>Conectar Carteira</h3>
              <button onclick="connectWallet()">Conectar MetaMask</button>
          `;
          break;
      case 'create':
          modalBody.innerHTML = `
              <h3>Criar Nova Carteira</h3>
              <button onclick="criarNovaCarteira()">Gerar Carteira</button>
              <div id="resultadoCarteira"></div>
          `;
          break;
      default:
          modalBody.innerHTML = "<p>Ação desconhecida.</p>";
          break;
  }
}

// Função para fechar o modal deslizante
function closeSlideModal() {
  const slideModal = document.getElementById('slideModal');
  slideModal.classList.remove('active');
}

// Função para login via e-mail
function loginWithEmail() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (email && password) {
      alert(`Bem-vindo, ${email}!`);
      userLoggedIn = true;
      closeSlideModal();
      window.location.href = "dashboard.html";
  } else {
      alert("Preencha o e-mail e a senha.");
  }
}

// Função para conectar a carteira
async function connectWallet() {
  try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      alert(`Carteira Conectada: ${account}`);
      userWallet = account;
      closeSlideModal();
      window.location.href = "dashboard.html";
  } catch (error) {
      alert("Erro ao conectar carteira.");
  }
}

// Função para criar carteira
function criarNovaCarteira() {
  try {
      const web3 = new Web3();
      const novaCarteira = web3.eth.accounts.create();
      const endereco = novaCarteira.address;
      const chavePrivada = novaCarteira.privateKey;
      document.getElementById("resultadoCarteira").innerHTML = `
          <p><strong>Endereço da Carteira:</strong> ${endereco}</p>
          <p><strong>Chave Privada:</strong> ${chavePrivada}</p>
      `;
      alert("Carteira criada com sucesso!");
      closeSlideModal();
      window.location.href = "dashboard.html";
  } catch (error) {
      alert("Erro ao criar carteira: " + error.message);
  }
}

// ========== Comprar Tokens (Simulado) ==========
function comprarTokens() {
  const quantidade = document.getElementById("tokenAmount").value;
  if (!quantidade) {
    alert("Informe a quantidade de tokens.");
    return;
  }
  alert(`Você comprou ${quantidade} SGL Tokens com sucesso!`);
  document.getElementById("currentBalance").innerText = `Saldo: ${quantidade} SGL Tokens`;
}

// ========== Enviar Mensagem ==========
function enviarMensagem() {
  const destinatario = document.getElementById("msgRecipient").value;
  const conteudo = document.getElementById("msgContent").value;

  if (!destinatario || !conteudo) {
    alert("Preencha todos os campos.");
    return;
  }

  alert(`Mensagem enviada para ${destinatario} com o conteúdo: "${conteudo}"`);
}

// ========== Criar Legado Digital ==========
function criarLegado() {
  const herdeiro = document.getElementById("legacyHeir").value;
  const descricao = document.getElementById("legacyDescription").value;

  if (!herdeiro || !descricao) {
    alert("Preencha todos os campos.");
    return;
  }

  alert(`Legado criado com sucesso para ${herdeiro} com descrição: "${descricao}"`);
}

// ========== Agendar Postagem ==========
function agendarPostagem() {
  const destinatario = document.getElementById("postRecipient").value;
  const conteudo = document.getElementById("postContent").value;
  const dataAgendamento = document.getElementById("postDate").value;

  if (!conteudo || !dataAgendamento) {
    alert("Preencha todos os campos.");
    return;
  }

  alert(`Postagem agendada para ${destinatario || "Público"} em ${dataAgendamento}.`);
}

// ========== Upload para IPFS ==========
async function uploadToIPFS() {
  const fileInput = document.getElementById("fileUpload");
  const file = fileInput.files[0];

  if (!file) {
    alert("Nenhum arquivo selecionado.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        "pinata_api_key": "SUA_PINATA_API_KEY",
        "pinata_secret_api_key": "SUA_PINATA_SECRET_KEY"
      },
      body: formData
    });

    const data = await response.json();
    if (data.IpfsHash) {
      alert("Arquivo enviado com sucesso para o IPFS!");
      console.log("IPFS Hash:", data.IpfsHash);
    } else {
      alert("Erro ao enviar para o IPFS.");
    }
  } catch (error) {
    alert("Erro ao fazer upload para o IPFS: " + error.message);
  }
}

// ========== Logout ==========
function logout() {
  userLoggedIn = false;
  userWallet = null;
  alert("Você foi desconectado.");
  window.location.href = "index.html";
}

// ========== Recarregar Saldo (Simulado) ==========
function recarregarSaldo() {
  const saldoAtual = Math.floor(Math.random() * 1000);
  document.getElementById("currentBalance").innerText = `Saldo: ${saldoAtual} SGL Tokens`;
  alert("Saldo atualizado!");
}

// ========== Alternar Som do Vídeo ==========
function toggleVideoSound() {
  const video = document.getElementById("background-video");
  video.muted = !video.muted;
  alert(video.muted ? "Som desativado" : "Som ativado");
}

// ========== Verificar Sessão ==========
function checkSession() {
  if (!userLoggedIn) {
    alert("Faça login para acessar esta página.");
    window.location.href = "index.html";
  }
}

// ========== Exibir Notificações ==========
function exibirNotificacoes() {
  alert("Você tem novas notificações!");
}
