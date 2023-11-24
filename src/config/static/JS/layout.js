document.addEventListener("DOMContentLoaded", function() {
    var url = window.location.pathname;

    var enlaces = document.querySelectorAll('.link');
    enlaces.forEach(function(enlace) {
      if (enlace.getAttribute('href') === url) {
        enlace.classList.add('pagina-actual');
      }
    });
  });