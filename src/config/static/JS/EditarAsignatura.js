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
            areaDropdown.innerHTML = "";
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

                    const select = document.getElementById('areas')
                    areaDropdown.innerHTML = "";

                    const Optionfl = document.createElement('option');
                    Optionfl.value = "";
                    Optionfl.text = "Elige una opción";
                    
                    if (data.areas.length > 0) {
                        for (let i in data.areas) {
                            const newOption = document.createElement('option');
                            newOption.value = data.areas[i].codigo;
                            newOption.text = data.areas[i].nombre;
                            select.appendChild(newOption);
                        }
                        areaDropdown.value = data.areas[0].codigo;
                    } else {
                        alert("No se encontraron áreas asociadas a la asignatura.");
                    }            
                })
                .catch(error => console.error('Error:', error));
        }
    });
    buttonEdit.addEventListener("click", function (event) {
        event.preventDefault();

        var NombreAsig = document.getElementById(codigoInput.value).getAttribute("data-name");
        var AreaId = areaDropdown.options[areaDropdown.selectedIndex].value;

        var editedData = {
            code: codigoInput.value,
            name: NombreAsig,
            hours: hrsInput.value,
            credits: creditoInput.value,
            area: AreaId
        };
    
    
        fetch("/api/updateasignatura", {  
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        }).then(response => {
            if (response.ok) {
                Swal.fire({ 
                    icon: 'success',
                    title: 'Éxito!',
                    text: 'Datos actualizados con éxito.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al actualizar los datos.'
                });
            }
        }).catch(error => console.error('Error:', error));
    });
});

