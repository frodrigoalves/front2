document.addEventListener("DOMContentLoaded", function () {
    // Evento para abrir o modal
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", openModal);
    });

    // Abrir Modal ao Clicar
    function openModal() {
        document.getElementById("modalCadastro").style.display = "flex";
    }

    // Fechar Modal
    function closeModal() {
        document.getElementById("modalCadastro").style.display = "none";
    }

    // Fechar Modal ao Clicar Fora
    window.onclick = function (event) {
        let modal = document.getElementById("modalCadastro");
        if (event.target === modal) {
            closeModal();
        }
    };

    // Se veio da outra página, abrir modal automaticamente
    const params = new URLSearchParams(window.location.search);
    if (params.get("cadastro") === "true") {
        openModal();
    }
});
