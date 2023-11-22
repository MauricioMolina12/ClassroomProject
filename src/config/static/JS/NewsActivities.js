var inputOptions = document.getElementById("activities-opcionales");

function fun_acti(){
    var cantidadInputsOpcion = parseInt(document.getElementById("activities-opcionales").value);
    var contenedorInputs = document.getElementById("generate");
    var cantidadNormales = parseInt(document.getElementById("cantidad").value);
    contenedorInputs.innerHTML = "";
    
    for (var i = 0; i < cantidadNormales; i++) {
        var nuevoInput = document.createElement("input");
        nuevoInput.type = "text";
        nuevoInput.className = "style-input-3";
        nuevoInput.style.marginBottom = "10px";
        nuevoInput.placeholder = "Actividad " + (i + 1);
        nuevoInput.id = "actividad" + (i + 1)
        contenedorInputs.appendChild(nuevoInput);
    }

    for(var i = 0; i < cantidadInputsOpcion; i++){
        var InputOpcionNew = document.createElement("input");
        InputOpcionNew.type = "text";
        InputOpcionNew.className = "style-input-3";
        InputOpcionNew.style.marginBottom = "10px";
        InputOpcionNew.placeholder = "Actividad opcional " + (i + 1);
        InputOpcionNew.id = "actividad_opcional" + (i + 1)
        contenedorInputs.appendChild(InputOpcionNew);
    }
}

document.getElementById("cantidad").addEventListener("input", fun_acti);

inputOptions.addEventListener("input", fun_acti);


document.getElementById("clear").addEventListener("click", function(){
    event.preventDefault();
    document.getElementById("actividad").value="";
    document.getElementById("cantidad").value="";

    var contenedorInputs = document.getElementById("generate");
    contenedorInputs.innerHTML = "";

});

var checkbox = document.getElementById("check-option");
var inputOptions = document.getElementById("activities-opcionales");

checkbox.addEventListener("change",function(){
    inputOptions.disabled = !checkbox.checked;

    if(!checkbox.checked && inputOptions.value!=="0"){
        inputOptions.value="0";
        fun_acti()
    } else {
        inputOptions.value="";
    }
});

document.getElementById("register_act").addEventListener("click", function (event) {

    const act_ = document.getElementById('actividad').value;
    const cant_ = parseInt(document.getElementById('cantidad').value);
    const cant_op = parseInt(document.getElementById("activities-opcionales").value);
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
    for (var i = 0; i < cant_op; i++) {
        const act = "actividad_opcional" + (i + 1)
        const acts = document.getElementById(act).value;
        activi.push(acts)
        if (acts.trim() === ''){
            cont++;
        }
    }

    if (!act_|| !cant_ || (!cant_op && checkbox.checked)) {

        Swal.fire({
            title: 'Faltan datos',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            backdrop: false,
            timer: 4500,
            timerProgressBar: true,
            confirmColorButton: "#B70811"
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
            confirmColorButton: "#B70811"
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
                    confirmColorButton: "#B70811"
                });
            } else {
                const arrayOfDataToSend2 = [];
                const cant_tot = cant_+cant_op;
                for (let i = 0; i < cant_tot; i++) { 
                    arrayOfDataToSend2.push(i);
                }
        
                const promises = arrayOfDataToSend2.map(data2 => {

                    let select1 = false;
                    if (checkbox.checked && data2 >= cant_){
                        select1 = true
                    }
                    const dataToSend2 = {
                        name: activi[data2],
                        id_TipodeActividad: data.mensaje,
                        one_select: select1
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
                                confirmColorButton: "#B70811"
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
                                confirmColorButton: "#B70811"
                            });
                        }else{
                            Swal.fire({
                                title: data.mensaje,
                                text: 'Creacion de actividades exitosa',
                                icon: 'success',
                                backdrop: false,
                                timer: 3500,
                                confirmColorButton: "#B70811"
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
