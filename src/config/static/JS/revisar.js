const detailsArray = document.querySelectorAll('.detalles');
    

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