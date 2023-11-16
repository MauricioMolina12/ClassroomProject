document.addEventListener('DOMContentLoaded', function () {
    var btnPlus = document.getElementById('btn-plus-area');
    var dropdown = document.getElementById('dropdown');

    btnPlus.addEventListener('click', function () {
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

                const datas = {
                    name: nuevoValor
                };
                fetch('/api/savearea', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datas)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            Swal.fire(data.error);
                        }
                        else {
                            Swal.fire(data.mensaje);
                            var option = document.createElement('option');
                            option.text = nuevoValor;
                            option.value = nuevoValor;
                            dropdown.add(option, dropdown.options[0]);
                            option.selected = true;
                        }
                    })
                    .catch(error => console.error(error));


            }
        });
    });
});

document.getElementById("new_asig").addEventListener("click", function (event) {

    const area_ = document.getElementById('dropdown').value;
    const codigo_ = document.getElementById('codigo').value;
    const nombre_ = document.getElementById('nombre').value;
    const hrs_ = document.getElementById('hrs').value;
    const credito_ = document.getElementById('credito').value;

    if (nombre_.trim() === '' || area_.trim() === '' || codigo_.trim() === '' || hrs_.trim() === '' || credito_.trim() === '') {
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
            code: codigo_,
            name: nombre_,
            hours: hrs_,
            credits: credito_,
            area: area_,
        };
        fetch('/api/saveasignatura', {
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
                        text: 'Asignatura creada',
                        icon: 'success',
                        backdrop: false,
                        timer: 2000,
                    }).then((result) => {
                        window.location.href = "/asignaturas";
                    });
                }

            })
            .catch(error => console.error(error));
    }

    event.preventDefault();
}); 