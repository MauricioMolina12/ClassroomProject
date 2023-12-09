document.addEventListener('DOMContentLoaded', function () {

    
    var id = document.getElementById('nom_pro').getAttribute("data-idoc")
    var anho = document.getElementById('perio').getAttribute("data-ano")
    var period = document.getElementById('perio').getAttribute("data-per")
    
    fetch(`/api/asig_perio/${anho}/${period}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            
            const details = document.getElementById('asig')// Reemplaza 'detailsContainer' con el ID del contenedor deseado
            details.innerHTML = ''
            
            const summary = document.createElement('summary');
            summary.textContent = 'Asignaturas';

            for (i in data[1]){            
                const divContainer = document.createElement('div');
                divContainer.classList.add('row');                

                // Crear elementos div, span, input (checkbox) y input (number)
                const div1 = document.createElement('div');
                div1.classList.add('row-child');
                const span = document.createElement('span');
                span.textContent = data[1][i].nombre; // Reemplaza 'item.nombre_ite' con el valor deseado
                div1.appendChild(span);

                const div2 = document.createElement('div');
                div2.classList.add('row-child');
                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.classList.add('style-input-3', 'w-20');
                checkbox.setAttribute('name', 'check');
                checkbox.setAttribute('checked', '');
                checkbox.setAttribute('disabled', '');
                div2.appendChild(checkbox);

                const div3 = document.createElement('div');
                div3.classList.add('row-child');
                const numberInput = document.createElement('input');
                numberInput.setAttribute('type', 'number');
                numberInput.classList.add('style-input-3', 'w-20');
                numberInput.setAttribute('name', 'hrs');
                numberInput.setAttribute('value', data[1][i].horas);
                numberInput.setAttribute('disabled', '');
                div3.appendChild(numberInput);

                // Agregar elementos al div contenedor
                divContainer.appendChild(div1);
                divContainer.appendChild(div2);
                divContainer.appendChild(div3);
                details.appendChild(divContainer);
            }
            // Obtener el elemento details (u otro contenedor donde se colocará el summary y el div)
            
            // Agregar el summary y el div al contenedor details
            details.appendChild(summary);
            
            
            
        })
        .catch(error => console.error('Error:', error));








    var buttonCalificacion = document.getElementById('button-c');

    buttonCalificacion.addEventListener("click", function () {
        var calificacion = document.getElementById('note').value;
        var items = document.querySelectorAll('.items');
        var plan = document.getElementById('id_plant').textContent;
        

        var calificacionNumero = parseFloat(calificacion);

        if (isNaN(calificacionNumero) || calificacionNumero < 0 || calificacionNumero > 5) {
            Swal.fire({
                text: 'Ingrese una nota válida entre 0 y 5',
                icon: 'error',
                backdrop: false,
                timer: 7000,
                confirmButtonColor: '#B70811',
                confirmButtonClass: 'btn btn-success btn-lg', 
                cancelButtonClass: 'btn btn-danger btn-lg'
            });
        } else {

            const dataToSend = {
                id: plan,
                qualification: calificacionNumero
            };

            fetch('/api/updatePlanTrabajo', {
                method: 'PUT',
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
                            text: 'Calificacion no valida',
                            icon: 'error',
                            backdrop: false,
                            timer: 7000,
                            timerProgressBar: true,
                            confirmColorButton: "#B70811"
                        });
                    } else {
                        
                        const promises = [];
                        items.forEach(input => {
                            
                            let id_it = input.getAttribute('data-id');
                            
                            let id_chk = id_it + "chk"
                            let check_act = document.getElementById(id_chk).checked;
                            if (check_act) {
                                const dataToSend2 = {
                                    id: id_it,
                                    id_plant: plan,
                                    check: check_act
                                }
                                promises.push(                                    
                                    fetch('/api/updatePlant_Item', {
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
                                    window.location.href = "/revision/" + plan;
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

            /*if(calificacionNumero < 3){
                Swal.fire({
                    text: 'Que mal!',
                    icon: 'error',
                    backdrop: false,
                    timer: 7000,
                    confirmButtonColor: '#B70811'
                });
            }else if(calificacionNumero >= 3 && calificacionNumero < 4){
                Swal.fire({
                    text: 'Nada mal',
                    icon: 'warning',
                    backdrop: false,
                    timer: 7000,
                    confirmButtonColor: '#B70811'
                });
            }else{
                Swal.fire({
                    text: 'Excelente',
                    icon: 'success',
                    backdrop: false,
                    timer: 7000,
                    confirmButtonColor: '#B70811'
                });
            }*/
        }
    });
});



