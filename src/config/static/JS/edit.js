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

            if (!nuevoValor) { //si el input es null o tiene otro error
                Swal.fire({
                    title: 'Error',
                    icon: "error",
                    text: 'Debes ingresar un valor para actualizar',
                    timer: 10000
                });
                return;  // No continuar con la actualización si no hay un valor
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
                if (data.error){  //manejo de errores
                    Swal.fire({
                        title: 'Error',
                        icon: "error",
                        text: data.error,
                        timer: 10000
                    });
                }else{
                    // Manejar la respuesta exitosa aquí
                    document.getElementById(valorCambiar).innerText = result.value;
                    Swal.fire({
                        title: 'Éxito',
                        icon: "success",
                        text: `${elementId} actualizado correctamente`,
                        timer: 10000
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    icon: "error",
                    text: `Error al actualizar ${error}`,
                    timer: 10000
                });
            });
        }
    });
}