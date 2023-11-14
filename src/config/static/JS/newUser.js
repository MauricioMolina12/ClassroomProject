document.addEventListener('DOMContentLoaded', function () {
    var btnPlusR = document.getElementById('btn-plus-rol');
    var btnPlusJ = document.getElementById('btn-plus-jornada');
    var dropdownR = document.getElementById('rol');
    var dropdownJ = document.getElementById('jornada');

    btnPlusR.addEventListener('click', function () {
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
                const datas = {
                    name: nuevoValor
                };
                fetch('/api/saverol', {
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
                            dropdownR.add(option, dropdownR.options[0]);
                            option.selected = true;
                        }
                    })
                    .catch(error => console.error(error));



            }
        });
    });
    btnPlusJ.addEventListener('click', function () {
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
                const datas = {
                    name: nuevoValor
                };
                fetch('/api/savejornada', {
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
                            dropdownJ.add(option, dropdownJ.options[1]);
                            option.selected = true;
                        }
                    })
                    .catch(error => console.error(error));


            }
        });
    });
});

document.getElementById("signup").addEventListener("click", function (event) {

    const rol_ = document.getElementById('rol').value;
    const jornada_ = document.getElementById('jornada').value;
    const id_ = document.getElementById('id').value;
    const nombre_ = document.getElementById('nombre').value;
    const user_ = document.getElementById('user').value;
    const password_ = document.getElementById('contrasena').value;
    const formacion_ = document.getElementById('formacion').value;
    var er = false

    if (nombre_.trim() === '' || id_.trim() === '' || rol_.trim() === '' || user_.trim() === '' || password_.trim() === '') {
        Swal.fire({
            title: 'Faltan datos',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            backdrop: false,
            timer: 4500,
            timerProgressBar: true,
        })
        er = true
    } else if (rol_.trim().toLowerCase() !== 'administrador') {
        if (jornada_.trim() === '' || formacion_.trim() === '') {
            Swal.fire({
                title: 'Faltan datos',
                text: 'Es un docente, ingrese jornada y/o formación',
                icon: 'error',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
            })
            er = true
        }
        else {
            alert("Llego al else")
            er = false
        }
    }

    if (!er) {
        const dataToSend = {
            id: id_,
            name: nombre_,
            user: user_,
            password: password_,
            rol: rol_,
            level_form: formacion_,
            jor: jornada_
        };
        fetch('/api/saveuser', {
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

                        //Animacion personalizada

                        //showClass: {
                        //  popup: 'animate__animated animate__fadeInDown'
                        //},
                        //hideClass: {
                        //  popup: 'animate__animated animate__fadeOutUp'
                        //}
                    })
                } else {
                    Swal.fire({
                        title: data.mensaje,
                        text: 'Un gusto tenerte con nosotros',
                        icon: 'success',
                        backdrop: false,
                        timer: 2000,
                    }).then((result) => {
                        window.location.href = "/sign_up";
                    });
                }

            })
            .catch(error => console.error(error));
    }

    event.preventDefault();
}); 