document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('btnAsignar');

    button.addEventListener("click", function(event) {
        var inputYear = document.getElementById('año');
        var inputSemester = document.getElementById('semestre');
    
        var yearValue = inputYear.value.trim();
        var semesterValue = inputSemester.value.trim();
    
        if (yearValue === "" || semesterValue === "") {
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
            Swal.fire({
                title: 'Excelente',
                icon: 'success',
                backdrop: false,
                timer: 4500,
                timerProgressBar: true,
                confirmButtonColor: '#B70811'
            }).then((result) => {
                if (result.isConfirmed) {
                    inputYear.value = "";
                    inputSemester.value = "";
                }
            });
        }    
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
    event.preventDefault();
});

