/* dashboard.js */

// Verifica se o Web3 está disponível
function isWeb3Available() {
    return typeof window.ethereum !== "undefined";
}

// Alternar a visualização das seções
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-container');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Conectar a carteira (MetaMask)
async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        document.getElementById("walletAddress").innerText = `Carteira Conectada: ${account}`;
        alert(`Carteira Conectada: ${account}`);
    } catch (error) {
        alert("Erro ao conectar carteira: " + error.message);
    }
}

// Criar uma nova carteira
function criarNovaCarteira() {
    const web3 = new Web3();
    const novaCarteira = web3.eth.accounts.create();
    const endereco = novaCarteira.address;
    const chavePrivada = novaCarteira.privateKey;

    document.getElementById("resultadoCarteira").innerHTML = `
        <p>Endereço: ${endereco}</p>
        <p>Chave Privada: ${chavePrivada}</p>
    `;
    alert("Carteira criada com sucesso!");
}

// Upload para IPFS
async function uploadToIPFS() {
    const fileInput = document.getElementById("fileUpload").files[0];
    if (!fileInput) {
        alert("Selecione um arquivo!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput);

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
        alert("Upload para IPFS bem-sucedido!");
        document.getElementById("ipfsHash").innerText = `IPFS Hash: ${data.IpfsHash}`;
    } catch (error) {
        alert("Erro no upload para IPFS: " + error.message);
    }
}

// Desconectar a carteira
function disconnectWallet() {
    userWallet = null;
    const walletInfo = document.getElementById("walletInfo");
    walletInfo.innerHTML = "<p>Nenhuma carteira conectada</p>";
    alert("Você desconectou a carteira.");
}

// Criar uma nova carteira (Web3)
function criarNovaCarteira() {
    try {
        const web3 = new Web3();
        const novaCarteira = web3.eth.accounts.create();
        const endereco = novaCarteira.address;
        const chavePrivada = novaCarteira.privateKey;

        const resultadoDiv = document.getElementById("resultadoCarteira");
        resultadoDiv.innerHTML = `
            <p>Endereço: ${endereco}</p>
            <p>Chave Privada: ${chavePrivada}</p>
        `;
        alert("Carteira criada com sucesso!");
    } catch (error) {
        alert("Erro ao criar carteira: " + error.message);
    }
}

// Recarregar saldo da carteira
async function atualizarSaldo() {
    if (!isWeb3Available()) {
        alert("Web3 não está disponível!");
        return;
    }

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const web3 = new Web3(window.ethereum);
        const saldo = await web3.eth.getBalance(account);
        const saldoEmEth = web3.utils.fromWei(saldo, 'ether');

        const saldoInfo = document.getElementById("saldoInfo");
        saldoInfo.innerHTML = `
            <p>Saldo: ${saldoEmEth} ETH</p>
        `;
    } catch (error) {
        alert("Erro ao atualizar saldo: " + error.message);
    }
}

// Logout e redirecionar para a página inicial
function logout() {
    alert("Você foi desconectado.");
    window.location.href = "index.html";
}
