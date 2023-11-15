
document.getElementById("cantidad").addEventListener("input", function() {
    var cantidad = parseInt(this.value);
    
    var contenedorInputs = document.getElementById("generate");
    contenedorInputs.innerHTML = "";
    
    for (var i = 0; i < cantidad; i++) {
        var nuevoInput = document.createElement("input"); 
        nuevoInput.type = "text";
        nuevoInput.className = "style-input-3";
        nuevoInput.style.marginBottom = "10px";
        nuevoInput.placeholder = "Item " + (i + 1); 
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

