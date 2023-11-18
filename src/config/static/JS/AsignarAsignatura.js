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
            confirmButtonColor: '#B70811'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                var nuevoValor = result.value;

                const datas = {
                    nombre: nuevoValor
                };
                fetch('/api/savegrupo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datas)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            Swal.fire({title: data.error, confirmButtonColor: '#B70811'});
                        }
                        else {
                            Swal.fire({title: data.mensaje, confirmButtonColor: '#B70811'});
                            var option = document.createElement('option');
                            option.text = nuevoValor;
                            option.value = nuevoValor;
                            dropdownG.add(option, dropdownG.options[1]);
                            option.selected = true;
                        }
                    })
                    .catch(error => console.error(error));
            }
        });
    });
});




document.getElementById("asig_usu").addEventListener("click", function (event) {
    const nombre_ = document.getElementById('nombre').value;
    const asig_ = document.getElementById('asignatura').value;
    const grupo_ = document.getElementById('grupo').value;
    const semes_ = document.getElementById('semestre').value;

    if (nombre_.trim() === '' || asig_.trim() === '' || grupo_.trim() === '' || semes_.trim() === '') {
        Swal.fire({
            title: 'Faltan datos',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            backdrop: false,
            timer: 4500,
            timerProgressBar: true,
        })
    }
    else {
        const dataToSend = {
            usu: nombre_,
            asig: asig_,
            grupo: grupo_,
            semes: semes_
        };
        fetch('/api/saveAsig_usu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    Swal.fire({
                        title: data.error,
                        text: 'Ingresa otro valido',
                        icon: 'error',
                        backdrop: false,
                        timer: 7000,
                        timerProgressBar: true,
                    })
                } else {
                    Swal.fire({
                        title: data.mensaje,
                        text: 'Asignatura asignada',
                        icon: 'success',
                        backdrop: false,
                        timer: 2000,
                    }).then((result) => {
                        window.location.href = "/asignacion";
                    });
                }

            })
            .catch(error => console.error(error));
    }

    event.preventDefault();
}); 