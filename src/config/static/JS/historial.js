var selectedDocente = document.querySelector('.scroll-child');

selectedDocente.addEventListener("click",function(){
    if(selectedDocente){
        var docenteId = selectedDocente.getAttribute('data-id');
        window.location.href = '/revision/' + docenteId;
    }
});


