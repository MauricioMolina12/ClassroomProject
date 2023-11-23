var selectedDocentes = document.querySelectorAll('.scroll-child');

selectedDocentes.forEach(function(selectedDocente) {
    selectedDocente.addEventListener("click", function() {
        var docenteId = selectedDocente.getAttribute('data-id');
        window.location.href = '/revision/' + docenteId;
    });
});


