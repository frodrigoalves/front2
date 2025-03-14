document.querySelector(".btn").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector("#tecnologias").scrollIntoView({ behavior: "smooth" });
});
