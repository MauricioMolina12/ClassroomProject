document.addEventListener('DOMContentLoaded', function () {
    
    var buttonCalificacion = document.getElementById('button-c');

    buttonCalificacion.addEventListener("click", function () {
        var calificacion = document.getElementById('note').value;

        var calificacionNumero = parseFloat(calificacion);

        if (isNaN(calificacionNumero) || calificacionNumero < 0 || calificacionNumero > 5) {
            Swal.fire({
                text: 'Ingrese una nota válida entre 0 y 5',
                icon: 'error',
                backdrop: false,
                timer: 7000,
                confirmButtonColor: '#B70811',
                confirmButtonClass: 'btn btn-success btn-lg', 
                cancelButtonClass: 'btn btn-danger btn-lg'
            });
        } else {
            if(calificacionNumero < 3){
                Swal.fire({
                    text: 'Que triste por el profe :c',
                    icon: 'error',
                    backdrop: false,
                    timer: 7000,
                    confirmButtonColor: '#B70811'
                });
            }else if(calificacionNumero >= 3 && calificacionNumero < 4){
                Swal.fire({
                    text: 'Nada mal',
                    icon: 'warning',
                    backdrop: false,
                    timer: 7000,
                    confirmButtonColor: '#B70811'
                });
            }else{
                Swal.fire({
                    text: 'Excelente',
                    icon: 'success',
                    backdrop: false,
                    timer: 7000,
                    confirmButtonColor: '#B70811'
                });
            }
        }
    });
});



