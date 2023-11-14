document.addEventListener('DOMContentLoaded', function() {
    var btnPlus = document.getElementById('btn-plus');
    var dropdownG = document.getElementById('grupo');

    btnPlus.addEventListener('click', function() {
        event.preventDefault();
        Swal.fire({
            title: 'Agregar nuevo grupo',
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
                dropdownG.add(option, dropdownG.options[0]);
                option.selected = true;

            }
        });
    });
});

