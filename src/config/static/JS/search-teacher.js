document.addEventListener('DOMContentLoaded', function () {
    var docentes = document.querySelectorAll('.view-docentes');
    

    docentes.forEach(function (docente) {
        docente.addEventListener('click', function () {
            docentes.forEach(function (otherDocente) {
                otherDocente.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    document.getElementById('asig_subj').addEventListener('click', function() {
        var selectedDocente = document.querySelector('.view-docentes.selected');
        if (selectedDocente) {
            var docenteId = selectedDocente.getAttribute('data-id');
            window.location.href = '/asignacion/' + docenteId;
        }else{
            Swal.fire({
                text: 'Por favor, escoge un docente.',
                icon: 'error',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
            })
        }
    });

    document.getElementById('asig_plan').addEventListener('click', function() {
        var selectedDocente = document.querySelector('.view-docentes.selected');
        if (selectedDocente) {
            var docenteId = selectedDocente.getAttribute('data-id');
            window.location.href = '/PlanDeTrabajo/' + docenteId;
        }else{
            Swal.fire({
                text: 'Por favor, escoge un docente.',
                icon: 'error',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
            })
        }
    });

    document.getElementById('edit_doc').addEventListener('click', function() {
        var selectedDocente = document.querySelector('.view-docentes.selected');
        if (selectedDocente) {
            var docenteId = selectedDocente.getAttribute('data-id');
            window.location.href = '/info_docentes/' + docenteId;
        }else{
            Swal.fire({
                text: 'Por favor, escoge un docente.',
                icon: 'error',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
            })
        }
    });
  
});