<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>SingulAI - Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Ícones (Boxicons) -->
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">

  <!-- CSS do Dashboard -->
  <link rel="stylesheet" href="dashboard.css">

  <!-- Biblioteca de Gráficos (Chart.js) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

  <!-- HEADER FIXO -->
  <header>
    <h1>SingulAI - Dashboard</h1>
    <nav>
      <ul>
        <!-- Cada botão chama `showSection('idDoContainer')` para exibir a seção correspondente -->
        <li><button onclick="showSection('conectarCarteira')">Conectar Carteira</button></li>
        <li><button onclick="showSection('enviarMensagem')">Enviar Mensagem</button></li>
        <li><button onclick="showSection('legadoDigital')">Criar Legado</button></li>
        <li><button onclick="showSection('agendarPostagem')">Agendar Postagem</button></li>
        <li><button onclick="showSection('novaCarteira')">Criar Carteira</button></li>
        <li><button onclick="showSection('listagemMensagens')">Mensagens Enviadas</button></li>
        <li><button onclick="showSection('uploadIPFS')">Upload IPFS</button></li>
        <li><button onclick="showSection('stats')">Estatísticas</button></li>
        <li><button onclick="logout()">Sair</button></li>
      </ul>
    </nav>
  </header>

  <!-- HERO SECTION (opcional) -->
  <section class="hero" id="hero">
    <h1>Transforme seu Legado Digital</h1>
    <p>Armazene e envie mensagens seguras para o futuro.</p>
  </section>

  <!-- SEÇÃO: CONECTAR CARTEIRA -->
  <div class="content-container" id="conectarCarteira" style="display:none;">
    <h2>🔗 Conectar Carteira</h2>
    <!-- Botão que chama a função connectWallet() no dashboard.js -->
    <button onclick="connectWallet()">Conectar MetaMask</button>
    <p id="walletAddress">Nenhuma carteira conectada</p>
  </div>

  <!-- SEÇÃO: ENVIO DE MENSAGENS -->
  <div class="content-container" id="enviarMensagem" style="display:none;">
    <h2>📩 Enviar Mensagem</h2>
    <input type="text" id="msgRecipient" placeholder="Carteira do Destinatário">
    <textarea id="msgContent" placeholder="Mensagem"></textarea>
    <button onclick="enviarMensagem()">Enviar</button>
  </div>

  <!-- SEÇÃO: CRIAÇÃO DE LEGADO DIGITAL -->
  <div class="content-container" id="legadoDigital" style="display:none;">
    <h2>🏛 Criar Legado Digital</h2>
    <input type="text" id="legacyHeir" placeholder="Carteira do Tutor/Herdeiro">
    <textarea id="legacyDescription" placeholder="Descrição do Legado"></textarea>
    <button onclick="criarLegado()">Criar</button>
  </div>

  <!-- SEÇÃO: AGENDAMENTO DE POSTAGEM -->
  <div class="content-container" id="agendarPostagem" style="display:none;">
    <h2>🕒 Agendar Postagem</h2>
    <input type="text" id="postRecipient" placeholder="Carteira (opcional)">
    <textarea id="postContent" placeholder="Conteúdo da Postagem"></textarea>
    <input type="date" id="postDate">
    <button onclick="agendarPostagem()">Agendar</button>
  </div>

  <!-- SEÇÃO: CRIAÇÃO DE NOVA CARTEIRA -->
  <div class="content-container" id="novaCarteira" style="display:none;">
    <h2>💼 Criar Nova Carteira</h2>
    <button onclick="criarNovaCarteira()">Gerar Carteira</button>
    <div id="resultadoCarteira"></div>
  </div>

  <!-- SEÇÃO: LISTAGEM DE MENSAGENS ENVIADAS -->
  <div class="content-container" id="listagemMensagens" style="display:none;">
    <h2>📜 Mensagens Enviadas</h2>
    <ul id="messageList"></ul>
  </div>

  <!-- SEÇÃO: UPLOAD PARA IPFS -->
  <div class="content-container" id="uploadIPFS" style="display:none;">
    <h2>📂 Upload para IPFS</h2>
    <input type="file" id="fileUpload">
    <button onclick="uploadToIPFS()">Upload</button>
    <p id="ipfsHash"></p>
  </div>

  <!-- SEÇÃO: ESTATÍSTICAS (GRÁFICOS) -->
  <div class="content-container" id="stats" style="display:none;">
    <h2>📊 Estatísticas</h2>
    <div class="charts-container">
      <!-- Canvas com tamanho menor -->
      <canvas id="chartUtilizacao" width="300" height="200"></canvas>
      <canvas id="chartAdocao" width="300" height="200"></canvas>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <p>&copy; 2025 SingulAI. Todos os direitos reservados.</p>
  </footer>

  <!-- SCRIPT DO DASHBOARD -->
  <script src="dashboard.js"></script>
</body>
</html>
