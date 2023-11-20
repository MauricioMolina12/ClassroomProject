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

    document.querySelectorAll('.trash').addEventListener("click",function(){
        var selectedDocente = document.querySelector('.view-docentes.selected');
        var docenteId = selectedDocente.getAttribute('data-id');
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/deleteuser/${docenteId}`, {
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
                        docenteElement.classList.add('slide-out');
                        docenteElement.addEventListener('animationend', function() {
                            docenteElement.remove();
                        });
                        Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar el usuario:', error);
                    Swal.fire('Error', 'Ocurrió un error al intentar eliminar el usuario', 'error');
                });
            }
        });
    });   
    
    const onSearch = () => {
    const input = document.querySelector("#search");
    const filter = input.value.toUpperCase();

    const list = document.querySelectorAll("#general .view-docentes");

    list.forEach((el) => {
        const text = el.textContent.toUpperCase();

        el.style.display = text.includes(filter) ? "" : "none";
    });
};

// Asigna el evento a escuchar al input
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", onSearch);

  
});