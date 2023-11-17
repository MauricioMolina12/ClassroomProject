document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const viewDocentes = document.querySelectorAll(".view-docentes");

    // Función para realizar la búsqueda y actualizar los resultados
    function buscarDocentes(query) {
        viewDocentes.forEach(docente => {
            const nombreDocente = docente.dataset.nombre.toLowerCase();
            const match = nombreDocente.includes(query.toLowerCase());
            docente.style.display = match ? "block" : "none";
        });
    }

    // Evento input para buscar dinámicamente mientras el usuario escribe
    searchInput.addEventListener("input", function () {
        const query = this.value.trim();
        buscarDocentes(query);
    });
});
