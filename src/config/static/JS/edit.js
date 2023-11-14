function editarValor(elementId, valorCambiar) {
    
    Swal.fire({
        title: `Ingresa nuevo(a) ${elementId}`,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById(valorCambiar).innerText = result.value;
            Swal.fire('¡Edición exitosa!', '', 'success');
        }
    });
}