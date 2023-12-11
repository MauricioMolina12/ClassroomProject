document.addEventListener('DOMContentLoaded', function () {
    var docentes = document.querySelectorAll('.view-docentes');

    const input = document.getElementById("search");

    input.addEventListener("input", onSearch);

    function onSearch() {
        const filter = input.value.toUpperCase();
        const list = document.querySelectorAll("#list #onList");

        list.forEach((el) => {
            const text = el.textContent.toUpperCase();
            el.style.display = text.includes(filter) ? "" : "none";
        });
    }

    

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
                confirmButtonColor: '#B70811'
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
                confirmButtonColor: '#B70811'
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
                confirmButtonColor: '#B70811'
            })
        }
    });

    document.getElementById('revi').addEventListener('click', function() {
        var selectedDocente = document.querySelector('.view-docentes.selected');
        if (selectedDocente) {
            var docenteId = selectedDocente.getAttribute('data-id');
            window.location.href = '/historial/' + docenteId;
        }else{
            Swal.fire({
                text: 'Por favor, escoge un docente.',
                icon: 'error',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
                confirmButtonColor: '#B70811'
            })
        }
    });

    document.getElementById('delete').addEventListener("click", function () {
        var selectedDocente = document.querySelector('.view-docentes.selected');
        var docenteId = selectedDocente.getAttribute('data-id');
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B70811',
            cancelButtonColor: '#000',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/deleteuser/${docenteId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            Swal.fire('Error', data.error, 'error');
                        } else {                            
                            Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success')
                            .then((result) => {
                                document.getElementById('deleteSound').play();
                                selectedDocente.classList.add('slide-out');
                                selectedDocente.addEventListener('animationend', function () {                                    
                                    selectedDocente.remove();                                    
                                });
                            })
                            
                        }
                    })
                    .catch(error => {
                        console.error('Error al eliminar el usuario:', error);
                        Swal.fire('No se puede', 'Elimine materias o planes de trabajo', 'error');
                    });
            }
        });
    });
    
  
});