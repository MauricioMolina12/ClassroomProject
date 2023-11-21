function editarValor(elementId, valorCambiar) {
    
    Swal.fire({
        title: `<span style="color: #b70811; font-size:80%;">Ingresa nuevo(a) ${elementId}</span>`,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#B70811',
        cancelButtonColor: '#000'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById(valorCambiar).innerText = result.value;
            Swal.fire({
                title: 'Éxito',
                icon: "success",
                text: `${elementId} actualizado correctamente`,
                timer: 10000
            });
        }
    });
}