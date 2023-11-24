document.addEventListener("DOMContentLoaded", function () {
    var buttonEdit = document.getElementById("edit_asig");
    var buttonDelete = document.getElementById("delete_asig");
    var asignaturaDropdown = document.getElementById("asignaturas");
    var areaDropdown = document.getElementById("areas");
    var codigoInput = document.getElementById("codigo");
    var hrsInput = document.getElementById("hrs");
    var creditoInput = document.getElementById("credito");

    asignaturaDropdown.addEventListener("change", function () {
        var seleccion = asignaturaDropdown.value;

        if (seleccion === "") {
            buttonEdit.disabled = true;
            buttonEdit.style.opacity = "0.5";
            buttonEdit.style.cursor = "not-allowed";
            codigoInput.value = "";
            hrsInput.value = "";
            creditoInput.value = "";
        } else {
            buttonEdit.style.opacity = "1";
            buttonEdit.disabled = false;
            buttonEdit.style.cursor = "pointer";

            var AsignaturaId = seleccion;

            fetch(`/api/asignatura/${AsignaturaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    codigoInput.value = data.codigo;
                    hrsInput.value = data.horas;
                    creditoInput.value = data.creditos;

                    alert(data.areas[0].nombre)

                    const select = document.getElementById('areas')

                    for (let i in data.areas) {
                        const newOption = document.createElement('option');
                        newOption.value = data.areas[i].id;
                        newOption.text = data.areas[i].nombre; 
                        
                        select.appendChild(newOption);
                    }

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

