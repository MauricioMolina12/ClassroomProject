document.addEventListener('DOMContentLoaded', function() {
    var btnPlus = document.getElementById('btn-plus');
    var dropdown = document.getElementById('dropdown');

    btnPlus.addEventListener('click', function() {
        event.preventDefault();
        Swal.fire({
            title: 'Agregar nueva área',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#B70811',
            cancelButtonTextColor: '#B70811',
            cancelButtonColor: 'transparent',
            cancelButtonBorder: '2px solid #B70811'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                var nuevoValor = result.value;
                var option = document.createElement('option');
                option.text = nuevoValor;
                option.value = nuevoValor
                dropdown.add(option, dropdown.options[0]);
                option.selected = true;
            }
        });
    });
});