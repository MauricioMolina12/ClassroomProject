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
            confirmButtonColor: '#B70811',
            cancelButtonColor: '#000'
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
    const id_doc = document.getElementById('id_docente').value;
    const ano_ = document.getElementById('ano').value;
    const periodo_ = document.getElementById('periodo').value;

    if (nombre_.trim() === '' || asig_.trim() === '' || grupo_.trim() === '' || semes_.trim() === '' || ano_.trim() ==='' || periodo_.trim() ==='') {
        Swal.fire({
            title: 'Faltan datos',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            backdrop: false,
            timer: 4500,
            timerProgressBar: true,
            confirmButtonColor: '#B70811',
        })
    }
    else {
        const dataToSend = {
            usu: nombre_,
            asig: asig_,
            grupo: grupo_,
            semes: semes_,
            ano: ano_,
            periodo: periodo_
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
                        text: 'Ingrese una materia que no haya asignado',
                        icon: 'error',
                        backdrop: false,
                        timer: 7000,
                        timerProgressBar: true,
                        confirmButtonColor: '#B70811'
                    })
                } else {
                    Swal.fire({
                        title: data.mensaje,
                        text: 'Asignatura asignada',
                        icon: 'success',
                        backdrop: false,
                        timer: 2000,
                        confirmButtonColor: '#B70811'
                    }).then((result) => {
                        window.location.href = "/asignacion/" + id_doc;
                    });
                }
            })
            .catch(error => console.error(error));
    }
    event.preventDefault();
}); 

$(document).ready(function() {
    $("#asig_usu").on("click", function() {
        // Obtén los valores de los campos
        var usu = $("#usu").val();  // Asegúrate de tener el ID correcto del campo de usuario
        var asig = $("#asig").val();  // Asegúrate de tener el ID correcto del campo de asignatura
        var grupo = $("#grupo").val();
        var semestre = $("#semestre").val();
        var ano = $("#ano").val();
        var periodo = $("#periodo").val();

        // Verifica si ya existe una asignación con los mismos valores
        $.ajax({
            url: "/verificar_asignacion",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                usu: usu,
                asig: asig,
                grupo: grupo,
                semestre: semestre,
                ano: ano,
                periodo: periodo
            }),
            success: function(response) {
                if (response.error) {
                    // Ya existe una asignación, muestra un mensaje de error o toma la acción necesaria
                    alert(response.error);
                }
            },
            error: function(error) {
                console.error("Error al verificar asignación:", error);
            }
        });
    });
});