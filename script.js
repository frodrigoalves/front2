document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o modal e os botões de fechamento
    const modal = document.getElementById("modalCadastro");
    const closeModalBtn = document.querySelector(".close");
    let startY = 0; // Para rastrear o toque inicial no celular

    // Verifica se os elementos existem antes de adicionar eventos
    if (modal && closeModalBtn) {
        
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

        // Se veio de outra página com parâmetro ?cadastro=true, abrir modal automaticamente
        const params = new URLSearchParams(window.location.search);
        if (params.get("cadastro") === "true") {
            openModal();
        }
    } else {
        console.error("⚠️ Elemento do modal não encontrado! Verifique se o ID 'modalCadastro' está correto.");
    }
});
