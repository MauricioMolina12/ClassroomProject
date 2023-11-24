document.addEventListener("DOMContentLoaded", function() {
    var buttonEdit = document.getElementById("edit_asig");
    var asignaturaDropdown = document.getElementById("asignaturas");
    var areaDropdown = document.getElementById("areas");
    var codigoInput = document.getElementById("codigo");
    var nombreInput = document.getElementById("nombre");
    var hrsInput = document.getElementById("hrs");
    var creditoInput = document.getElementById("credito");

    asignaturaDropdown.addEventListener("change", function() {
        var seleccion = asignaturaDropdown.value;

        if (seleccion === "") {
            buttonEdit.disabled = true;
            buttonEdit.style.opacity = "0.5";
            buttonEdit.style.cursor = "not-allowed";
            codigoInput.value = "";
            nombreInput.value = "";
            hrsInput.value = "";
            creditoInput.value = "";
        } else {
            buttonEdit.style.opacity = "1";
            buttonEdit.disabled = false;
            buttonEdit.style.cursor = "pointer";

            var AsignaturaId = seleccion;

            fetch(`/asignatura/${AsignaturaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    codigoInput.value = data.codigo;
                    nombreInput.value = data.nombre;
                    hrsInput.value = data.horas;
                    creditoInput.value = data.creditos;

                    var areaCodigo = data.id_area;
                    var areaOption = Array.from(areaDropdown.options).find(option => option.value === areaCodigo);
                    if (areaOption) {
                        areaOption.selected = true;
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    });
});

