document.addEventListener('DOMContentLoaded', function() {
    var btnPlus = document.getElementById('btn-plus');
    var dropdownG = document.getElementById('grupo');

    btnPlus.addEventListener('click', function() {
        event.preventDefault();
        Swal.fire({
            title: 'Agregar nuev grupo',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            confirmButtonColor: '#B70811'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                var nuevoValor = result.value;
                var option = document.createElement('option');
                option.text = nuevoValor;
                dropdownG.add(option, dropdownG.options[1]);
                option.selected = true;
            }
        });
    });
});
