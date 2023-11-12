document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('overlay');
        var modal = document.getElementById('modal');
        var verTitulos = document.getElementById('titles');

        verTitulos.addEventListener('click', function () {
            event.preventDefault();
            Swal.fire({
                title: "Titulos del docente Adalberto Álvarez",
                text: "-Ingeniero de sistemas",
                
              });
        });
    });
