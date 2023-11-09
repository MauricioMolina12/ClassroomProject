document.getElementById("cantidad").addEventListener("input", function() {
    var cantidad = parseInt(this.value);
    
    var contenedorInputs = document.getElementById("inputs-generate");
    contenedorInputs.innerHTML = "";
    
    for (var i = 0; i < cantidad; i++) {
        var nuevoInput = document.createElement("input"); 
        nuevoInput.type = "text";
        nuevoInput.className = "style-input";
        nuevoInput.placeholder = "Input " + (i + 1); 
        contenedorInputs.appendChild(nuevoInput);
    }
});

