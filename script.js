document.addEventListener("DOMContentLoaded", function () {
    
    // Evento para botões de navegação
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let targetSection = this.getAttribute("href");
            scrollToSection(targetSection);
        });
    });

    // Evento para o botão "Acessar Plataforma"
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            openModal();
        });
    });

    // Verifica se o usuário veio da outra página para abrir o modal automaticamente
    const params = new URLSearchParams(window.location.search);
    if (params.get("cadastro") === "true") {
        openModal();
    }

    // Fecha o modal ao clicar fora da área de cadastro
    window.onclick = function (event) {
        let modal = document.getElementById("modalCadastro");
        if (event.target === modal) {
            closeModal();
        }
    };
});

// Função para abrir o modal de cadastro
function openModal() {
    let modal = document.getElementById("modalCadastro");
    if (modal) {
        modal.style.display = "flex";
    } else {
        console.error("Modal de cadastro não encontrado!");
    }
}

// Função para fechar o modal de cadastro
function closeModal() {
    let modal = document.getElementById("modalCadastro");
    if (modal) {
        modal.style.display = "none";
    }
}

// Função para rolar suavemente até uma seção
function scrollToSection(id) {
    let section = document.querySelector(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}
