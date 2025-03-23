document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o modal e os botões de fechamento
    const modal = document.getElementById("modalCadastro");
    const closeModalBtn = document.querySelector(".close");
    const submitBtn = document.querySelector("button[type='submit']");
    let startY = 0; // Para rastrear o toque inicial no celular

    // Verifica se os elementos existem antes de adicionar eventos
    if (modal && closeModalBtn && submitBtn) {

        // Evento para abrir o modal nos botões de "Acessar Plataforma"
        document.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                openModal();
            });
        });

        // Função para abrir o modal
        function openModal() {
            modal.style.display = "flex";
        }

        // Função para fechar o modal
        function closeModal() {
            modal.style.display = "none";
        }

        // Evento para fechar o modal ao clicar no botão "X"
        closeModalBtn.addEventListener("click", closeModal);

        // Fechar modal ao clicar fora da área do conteúdo
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Fechar modal ao arrastar para baixo no celular
        modal.addEventListener("touchstart", function (event) {
            startY = event.touches[0].clientY; // Captura posição inicial do toque
        });

        modal.addEventListener("touchmove", function (event) {
            let moveY = event.touches[0].clientY;
            if (moveY - startY > 100) { // Se o usuário arrastar para baixo mais de 100px
                closeModal();
            }
        });

        // Função para cadastrar usuário
        async function cadastrarUsuario() {
            const email = document.getElementById("email").value;
            const telefone = document.getElementById("telefone").value;
            const senha = "senha123";  // Senha fixa (para teste)

            try {
                const response = await fetch("http://localhost:5000/api/users/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, telefone, senha })
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                    closeModal();
                } else {
                    const errorData = await response.json();
                    alert("Erro ao cadastrar: " + errorData.error);
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("Erro ao conectar com o servidor!");
            }
        }

        // Evento de clique no botão de cadastro
        submitBtn.addEventListener("click", function (event) {
            event.preventDefault();
            cadastrarUsuario();
        });

        // Se veio de outra página com parâmetro ?cadastro=true, abrir modal automaticamente
        const params = new URLSearchParams(window.location.search);
        if (params.get("cadastro") === "true") {
            openModal();
        }

    } else {
        console.error("⚠️ Elemento do modal ou botão não encontrado! Verifique se o ID 'modalCadastro' está correto.");
    }
});
