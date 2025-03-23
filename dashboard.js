/* script.js */

// Endereço do contrato SingulAI
const contractAddress = "SEU_ENDERECO_CONTRATO";
const contractABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "_singulAIToken", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_messageId", "type": "uint256" }
        ],
        "name": "executeMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_amount", "type": "uint256" }
        ],
        "name": "burnTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_recipient", "type": "address" },
            { "internalType": "string", "name": "_content", "type": "string" },
            { "internalType": "uint256", "name": "_releaseTime", "type": "uint256" },
            { "internalType": "uint256", "name": "_amount", "type": "uint256" }
        ],
        "name": "createMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Atualizar Saldo de Tokens SingulAI
async function atualizarSaldo() {
    showSpinner();
    const web3 = new Web3(window.ethereum);
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const balance = await contract.methods.balanceOf(accounts[0]).call();
        document.getElementById("saldoInfo").innerText = `Saldo: ${balance} SGL Tokens`;
    } catch (error) {
        alert("Erro ao atualizar saldo de tokens: " + error.message);
    } finally {
        hideSpinner();
    }
}

// Queimar Tokens SingulAI
async function queimarTokens(amount) {
    showSpinner();
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        await contract.methods.burnTokens(amount).send({ from: accounts[0] });
        alert("Tokens queimados com sucesso!");
        atualizarSaldo();
    } catch (error) {
        alert("Erro ao queimar tokens: " + error.message);
    } finally {
        hideSpinner();
    }
}

// Queimar Tokens com Botão Rápido
async function queimarTokensRapido() {
    const amount = prompt("Digite a quantidade de tokens a queimar:");
    if (amount) {
        await queimarTokens(amount);
    }
}

// Spinner de Carregamento
function showSpinner() {
    const spinner = document.createElement('div');
    spinner.id = 'spinner';
    spinner.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(spinner);
}

function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Alternar entre Seções
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-container');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

// Conectar Carteira
async function connectWallet() {
    showSpinner();
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        document.getElementById("walletAddress").innerText = `Carteira Conectada: ${account}`;
        alert("Carteira Conectada com Sucesso!");
        atualizarSaldo();
    } catch (error) {
        alert("Erro ao conectar carteira: " + error.message);
    } finally {
        hideSpinner();
    }
}

// Enviar Mensagem
async function enviarMensagem() {
    const recipient = document.getElementById("msgRecipient").value;
    const content = document.getElementById("msgContent").value;
    if (!recipient || !content) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        await contract.methods.createMessage(recipient, content, Date.now(), 0).send({ from: accounts[0] });
        alert("Mensagem enviada com sucesso!");
    } catch (error) {
        alert("Erro ao enviar mensagem: " + error.message);
    }
}
