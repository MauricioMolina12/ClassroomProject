document.getElementById('toggleButton').addEventListener('click', function() {
    var menuBar = document.querySelector('.menu-bar');
    var items = document.querySelectorAll('.items span');

    menuBar.classList.toggle('collapsed');

    items.forEach(function(item) {
      item.classList.toggle('hidden');
    });
  });