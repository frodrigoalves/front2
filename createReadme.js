const fs = require('fs');

const readmeContent = `
# SingulAI Dashboard

SingulAI Dashboard é uma aplicação web que permite a gestão de tokens SingulAI e envio de mensagens futuras utilizando contratos inteligentes e blockchain. O projeto tem como objetivo facilitar o gerenciamento de ativos digitais e a criação de legados digitais de forma segura e descentralizada.

## 🚀 Funcionalidades

- **Conexão com Carteira MetaMask:** Permite conectar a carteira do usuário.
- **Atualização de Saldo:** Visualização do saldo atual em tokens SingulAI (SGL).
- **Queima de Tokens:** Função para queimar tokens diretamente da carteira conectada.
- **Envio de Mensagens Futuras:** Criação de mensagens que podem ser acessadas posteriormente.
- **Criação de Legado Digital:** Armazenamento seguro de mensagens como um legado para o futuro.
- **Upload para IPFS:** Realiza o armazenamento de arquivos no IPFS.
- **Interface Intuitiva e Responsiva:** Experiência otimizada para dispositivos desktop e móveis.
- **Feedback Visual com Spinner:** Indicação visual durante operações demoradas.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura da aplicação.
- **CSS3:** Estilização com design moderno e responsivo.
- **JavaScript (ES6+):** Lógica e integração com a blockchain.
- **Web3.js:** Conexão com a blockchain Ethereum.
- **IPFS:** Armazenamento descentralizado.
- **MetaMask:** Carteira para autenticação e gestão de tokens.

## 📦 Instalação

1. Clone o repositório:
   \`\`\`bash
   git clone https://github.com/usuario/singulai-dashboard.git
   cd singulai-dashboard
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Rode o projeto:
   \`\`\`bash
   npm start
   \`\`\`

## 🌐 Uso

1. Abra o navegador e acesse:
   \`\`\`
   http://localhost:3000
   \`\`\`

2. Conecte sua carteira MetaMask.

3. Navegue pelas funcionalidades do dashboard para:
   - Verificar saldo.
   - Queimar tokens.
   - Enviar mensagens futuras.
   - Criar um legado digital.
   - Realizar upload para IPFS.

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias e novas funcionalidades!
1. Faça um fork do projeto.
2. Crie uma nova branch com suas melhorias:
   \`\`\`bash
   git checkout -b feature/nova-funcionalidade
   \`\`\`
3. Faça o commit das alterações:
   \`\`\`bash
   git commit -m "Adiciona nova funcionalidade"
   \`\`\`
4. Envie para o repositório:
   \`\`\`bash
   git push origin feature/nova-funcionalidade
   \`\`\`
5. Crie um Pull Request na branch principal.

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizar e modificar conforme necessário.

---
Desenvolvido com 💙 pela comunidade SingulAI.
`;

fs.writeFileSync('README.md', readmeContent, 'utf8');
console.log("README.md criado com sucesso!");
