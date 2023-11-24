function editarValor(elementId, valorCambiar, idUsuario) {
    
    Swal.fire({
        title: `<span style="color: #b70811; font-size:80%;">Ingresa nuevo(a) ${elementId}</span>`,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#B70811',
        cancelButtonColor: '#000'
    }).then((result) => {
        if (result.isConfirmed) {

            var nuevoValor = result?.value?.trim();

            if (!nuevoValor) { 
                Swal.fire({
                    title: 'Error',
                    icon: "error",
                    text: 'Debes ingresar un valor para actualizar',
                    timer: 10000,
                    confirmButtonColor: '#B70811'
                });
                return;  
            }

            fetch('/api/updateuser', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: idUsuario,
                    [valorCambiar]: nuevoValor
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.error){  
                    Swal.fire({
                        title: 'Error',
                        icon: "error",
                        text: data.error,
                        timer: 10000,
                        confirmButtonColor: '#B70811'
                    });
                }else{
                    document.getElementById(valorCambiar).innerText = result.value;
                    Swal.fire({
                        title: 'Éxito',
                        icon: "success",
                        text: `${elementId} actualizado correctamente`,
                        timer: 10000,
                        confirmButtonColor: '#B70811'
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    icon: "error",
                    text: `Error al actualizar ${error}`,
                    timer: 10000,
                    confirmButtonColor: '#B70811'
                });
            });
        }
    });
}

function eliminarAsignatura(elementId, idAsig_Usu) {
    Swal.fire({
        title: 'Confirmar eliminación',
        text: '¿Estás seguro de que deseas eliminar esta asignatura?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#B70811',
        cancelButtonColor: '#000',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/deleteAsig_usu/${idAsig_Usu}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: data.error,
                        timer: 10000,
                        confirmButtonColor: '#B70811'
                    });
                } else {
                    var contenedorAsignatura = document.getElementById(elementId);
                    contenedorAsignatura.classList.add('slide-out');

                    var deleteSound = document.getElementById('deleteSound');
                    deleteSound.play();

                    contenedorAsignatura.addEventListener('animationend', function () {
                        contenedorAsignatura.remove();
                        Swal.fire({
                            title: 'Éxito',
                            icon: 'success',
                            text: 'Asignatura eliminada correctamente',
                            timer: 10000,
                            confirmButtonColor: '#B70811'
                        });
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: `Error al eliminar la asignatura: ${error}`,
                    timer: 10000,
                    confirmButtonColor: '#B70811'
                });
            });
        }
    });
}
