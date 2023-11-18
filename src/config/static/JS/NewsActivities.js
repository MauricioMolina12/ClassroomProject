
document.getElementById("cantidad").addEventListener("input", function() {
    var cantidad = parseInt(this.value);
    var contenedorInputs = document.getElementById("generate");
    contenedorInputs.innerHTML = "";

    for (var i = 0; i < cantidad; i++) {
        var nuevoInput = document.createElement("input");
        nuevoInput.type = "text";
        nuevoInput.className = "style-input-3";
        nuevoInput.style.marginBottom = "10px";
        nuevoInput.placeholder = "Actividad " + (i + 1);
        nuevoInput.id = "actividad" + (i + 1)
        contenedorInputs.appendChild(nuevoInput);
    }
});

document.getElementById("clear").addEventListener("click", function(){
    event.preventDefault();
    var activities = document.getElementById("actividad").value="";
    var cantidadItems = document.getElementById("cantidad").value="";

    var contenedorInputs = document.getElementById("generate");
    contenedorInputs.innerHTML = "";

})

document.getElementById("register_act").addEventListener("click", function (event) {

    const act_ = document.getElementById('actividad').value;
    const cant_ = document.getElementById('cantidad').value;
    let cont = 0;
    var activi = []
    for (var i = 0; i < cant_; i++) {
        const act = "actividad" + (i + 1)
        const acts = document.getElementById(act).value;
        activi.push(acts)
        if (acts.trim() === ''){
            cont++;
        }
    }

    if (act_.trim() === '' || cant_.trim() === '') {

        Swal.fire({
            title: 'Faltan datos',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            backdrop: false,
            timer: 4500,
            timerProgressBar: true,
        })
        
    }
    else if ( cont > 0){
        Swal.fire({
            title: 'Faltan datos',
            text: 'Por favor, ingrese todos las actividades',
            icon: 'error',
            backdrop: false,
            timer: 4500,
            timerProgressBar: true,
        })
    }
    else {
        const dataToSend = {
            name: act_
        };
        
        fetch('/api/saveTipodeActividad', {
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
                    text: 'Ingrese otro nombre para la categoria',
                    icon: 'error',
                    backdrop: false,
                    timer: 7000,
                    timerProgressBar: true,
                });
            } else {
                // Generar datos para el array usando un bucle
                const arrayOfDataToSend2 = [];
                for (let i = 0; i < cant_; i++) { // Por ejemplo, se generan 5 valores diferentes
                    arrayOfDataToSend2.push(i); // Ajusta aquí cómo quieres generar los valores
                }
        
                const promises = arrayOfDataToSend2.map(data2 => {
                    const dataToSend2 = {
                        name: activi[data2],
                        id_TipodeActividad: data.mensaje
                    }
                    return fetch('/api/saveItem', {
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
                                text: 'Ingrese otro nombre para la actividad',
                                icon: 'error',
                                backdrop: false,
                                timer: 7000,
                                timerProgressBar: true,
                            });
                        }
                    })
                    .catch(error => console.error(error));
                });
        
                Promise.all(promises)
                    .then(data => {
                        if (data.error) {
                            Swal.fire({
                                title: data.error,
                                text: 'Ingrese otro nombre para la actividad',
                                icon: 'error',
                                backdrop: false,
                                timer: 7000,
                                timerProgressBar: true,
                            });
                        }else{
                            Swal.fire({
                                title: data.mensaje,
                                text: 'Creacion de actividades exitosa',
                                icon: 'success',
                                backdrop: false,
                                timer: 3500,
                            }).then((result) => {
                                window.location.href = "/actividades";
                            });
                        }
                        
                    });
            }
        })
        .catch(error => console.error(error));
        
    }

    event.preventDefault();
}); 
