document.addEventListener('DOMContentLoaded', function(){
    var choose = document.getElementById('asig-gest').addEventListener("click",function(event){
        event.preventDefault(); // Evitar que se ejecute el enlace directamente

        Swal.fire({
            title: '¿Qué acción deseas realizar?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Crear asignatura`,
            denyButtonText: `Editar y borrar asignaturas`,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/asignaturas";
            } else if (result.isDenied) {
                window.location.href = "/EditarAsignatura";
            }
        });
    }); 
});
