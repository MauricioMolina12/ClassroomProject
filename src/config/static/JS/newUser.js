document.addEventListener('DOMContentLoaded', function() {
    var btnPlusR = document.getElementById('btn-plus-rol');
    var btnPlusJ = document.getElementById('btn-plus-jornada');
    var dropdownR = document.getElementById('rol');
    var dropdownJ = document.getElementById('jornada');

    btnPlusR.addEventListener('click', function() {
        event.preventDefault();
        Swal.fire({
            title: 'Agregar nuevo rol',
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
                dropdownR.add(option, dropdownR.options[0]);
                option.selected = true;

            }
        });
    });
    btnPlusJ.addEventListener('click', function() {
        event.preventDefault();
        Swal.fire({
            title: 'Agregar nueva jornada',
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
                dropdownJ.add(option, dropdownJ.options[0]);
                option.selected = true;

            }
        });
    });
});