document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('btnAsignar');

    button.addEventListener("click", function (event) {
        var nomb_doc = document.getElementById('nom_pro');
        var inputYear = document.getElementById('año');
        var inputSemester = document.getElementById('semestre');
        var hours_tot = document.getElementById('hoursTotal').textContent;
        var items = document.querySelectorAll('.items');
        var nom = nomb_doc.value;
        var yearValue = inputYear.value;
        var semesterValue = inputSemester.value;


        if (!yearValue || !semesterValue || !hours_tot) {
            Swal.fire({
                title: 'Faltan datos',
                text: 'Ingreselos, por favor.',
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
                        items.forEach(input => {
                            let id_it = input.getAttribute('data-id')

                            let id_hor = id_it + "nmb"
                            let hor_act = document.getElementById(id_hor).value;

                            if (hor_act) {
                                const dataToSend2 = {
                                    id_plant: data.mensaje,
                                    id_item: id_it,
                                    hours: hours_tot,
                                    observacion: ""
                                }
                                return fetch('/api/savePlant_Item', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(dataToSend2)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.error) {
                                            Swal.fire({
                                                title: data.error,
                                                text: 'verifique datos',
                                                icon: 'error',
                                                backdrop: false,
                                                timer: 7000,
                                                timerProgressBar: true,
                                                confirmColorButton: "#B70811"
                                            });
                                        } else {
                                            Swal.fire({
                                                title: "Exito",
                                                text: 'Creacion de Plan de trabajo exitosa',
                                                icon: 'success',
                                                backdrop: false,
                                                timer: 3500,
                                            }).then((result) => {
                                                let id_revi = nomb_doc.getAttribute('data-idoc')
                                                window.location.href = "/revision/"+ id_revi;
                                            });
                                        }
                                    })
                                    .catch(error => console.error(error));
                            }
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
//HAGA SUMA DE HORAS
const inputNumbers = document.querySelectorAll('.inputHr');
const totalSpan = document.getElementById('hoursTotal');

inputNumbers.forEach(input => {
    input.addEventListener('input', function () {
        let suma = 0;
        inputNumbers.forEach(input => {
            // Convertir el valor del campo a un número y sumarlo
            suma += parseFloat(input.value) || 0;
        });
        totalSpan.textContent = suma;
    });
});
