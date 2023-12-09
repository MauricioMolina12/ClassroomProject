document.addEventListener('DOMContentLoaded', function () {
    
    Swal.fire({
        title: '<h3 color="#B70811">Ingresa el año y el periodo</h3>',
        confirmButtonColor: '#B70811',
        allowOutsideClick: false,
        allowEscapeKey: false,
        html:
          '<input type="number" id="swal-input1" class="swal2-input" placeholder="Año">' +
          '<input type="number" id="swal-input2" class="swal2-input" placeholder="Periodo">',
        focusConfirm: false,
        preConfirm: () => {
          const campo1 = document.getElementById('swal-input1').value;
          const campo2 = document.getElementById('swal-input2').value;
      
          if (!campo1 || !campo2) {
            Swal.showValidationMessage('Por favor, completa ambos campos');
          }
      
          return [campo1, campo2];
        }
      }).then(result => {
        if (result.isConfirmed) {
          const values = result.value;
          const valorCampo1 = values[0];
          const valorCampo2 = values[1];
      
          if (valorCampo1 && valorCampo2) {
            // Haz algo con los valores ingresados
            buscarhor(valorCampo1, valorCampo2)           
            
          } 
        }
      });
      


    var button = document.getElementById('btnAsignar');

    button.addEventListener("click", function (event) {
        var nomb_doc = document.getElementById('nom_pro');
        var inputYear = document.getElementById('año');
        var inputSemester = document.getElementById('semestre');
        var hours_tot = document.getElementById('hoursTotal').textContent;
        var items = document.querySelectorAll('.items');
        var jorn_doc = document.getElementById('inputhidden').value;
        var nom = nomb_doc.value;
        var yearValue = inputYear.value;
        var semesterValue = inputSemester.value;

        if (!yearValue || !semesterValue) {

            Swal.fire({
                title: 'Faltan datos',
                text: 'Ingreselos, por favor.',
                icon: 'error',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
                confirmButtonColor: '#B70811'
            });


        } else if (jorn_doc === "Media Jornada" && hours_tot != 20) {
            Swal.fire({
                title: 'Faltan horas',
                text: 'Los docentes de Media Jornada tienen que tener 20 horas.',
                icon: 'error',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
                confirmButtonColor: '#B70811'
            });
        } else if (jorn_doc === "Jornada Completa" && hours_tot != 40) {
            Swal.fire({
                title: 'Faltan horas',
                text: 'Los docentes de Jornada Completa tienen que tener 40 horas.',
                icon: 'error',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
                confirmButtonColor: '#B70811'
            });
        } else {

            const dataToSend = {
                total_hours: hours_tot,
                year: yearValue,
                semester: semesterValue,
                teacher: nom
            };

            fetch('/api/savePlanTrabajo', {
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
                            text: 'Verifique los datos',
                            icon: 'error',
                            backdrop: false,
                            timer: 7000,
                            timerProgressBar: true,
                            confirmColorButton: "#B70811"
                        });
                    } else {
                        const promises = [];
                        items.forEach(input => {
                            let id_it = input.getAttribute('data-id')

                            let id_hor = id_it + "nmb"
                            let hor_act = document.getElementById(id_hor).value;

                            if (hor_act) {
                                const dataToSend2 = {
                                    id_plant: data.mensaje,
                                    id_item: id_it,
                                    hours: hor_act,
                                    observacion: ""
                                }
                                promises.push(
                                    fetch('/api/savePlant_Item', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(dataToSend2)
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.error) {
                                                // Si hay un error, se puede lanzar una excepción para ser capturada luego
                                                throw new Error(data.error);
                                            } else {
                                                return data; // Pasar los datos al siguiente then
                                            }
                                        })
                                );
                            }
                        });
                        Promise.all(promises)
                            .then(results => {
                                // Si todas las promesas se resolvieron correctamente, mostrar la alerta de éxito
                                Swal.fire({
                                    title: "Exito",
                                    text: 'Creacion de Plan de trabajo exitosa',
                                    icon: 'success',
                                    backdrop: false,
                                    timer: 3500,
                                    confirmButtonColor: '#B70811'
                                }).then((result) => {
                                    window.location.href = "/revision/" + data.mensaje;
                                });
                            })
                            .catch(error => {
                                // Si alguna promesa falla, mostrar el error
                                console.error(error);
                                Swal.fire({
                                    title: error.message || 'Hubo un error',
                                    text: 'verifique datos',
                                    icon: 'error',
                                    backdrop: false,
                                    timer: 7000,
                                    timerProgressBar: true,
                                    confirmColorButton: "#B70811"
                                });
                            });
                    }
                })
        }
        event.preventDefault();
    });
    const detailsArray = document.querySelectorAll('.details');


    detailsArray.forEach((details) => {
        details.addEventListener('toggle', function () {
            var open = document.querySelectorAll('details[open]').length;
            if (open > 1) {
                this.removeAttribute('open');
            } else if (open === 1) {
                detailsArray.forEach((detail) => {
                    if (detail !== this) {
                        detail.open = false;
                    }
                });
            }
        });
    });

});

//Busque horas de las materias dependiendo del año y periodo
function buscarhor(anho, period){
    var id = document.getElementById('nom_pro').getAttribute("data-idoc")
    fetch('/api/asig_perio/' + anho + '/' + period + '/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data[1] == 0){                
                Swal.fire({
                    title: "Sin asignaturas",
                    text: 'Necesita tener asignaturas para el periodo ' + anho + '-' + period ,
                    icon: 'error',
                    timer: 3500,
                    confirmButtonColor: '#B70811'
                }).then((result) => {
                    window.location.href = "/asignacion/" + id;
                });
            } else{
                document.getElementById('año').value = anho
                document.getElementById('semestre').value = period
                totalSpan.textContent = data[0];
                totalSpan.setAttribute('data-horasig', data[0]);
            }
            
        })
}

//HAGA SUMA DE HORAS
const inputNumbers = document.querySelectorAll('.inputHr');
const totalSpan = document.getElementById('hoursTotal');

inputNumbers.forEach(input => {
    input.addEventListener('input', function () {
        let suma = parseInt(totalSpan.getAttribute('data-horasig'));
        inputNumbers.forEach(input => {
            // Convertir el valor del campo a un número y sumarlo
            suma += parseFloat(input.value) || 0;
        });
        totalSpan.textContent = suma;
    });
});
