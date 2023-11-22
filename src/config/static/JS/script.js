document.getElementById("signin").addEventListener("click", function (event) {
    event.preventDefault();
    const user = document.getElementById('User').value;
    const password = document.getElementById('Password').value;
  
    const userData = {
      user: user,
      password: password
    };
  
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          Swal.fire({
            title: data.error,
            text: 'Credenciales incorrectas. Vuelve a intertarlo.',
            icon: 'error',
            backdrop: false,
            confirmButtonColor: "#b70811",
            timer: 7000,
            timerProgressBar: true,
          })
        } else {
          Swal.fire({
            title: data.mensaje,
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            backdrop: false,
            confirmButtonColor: "#b70811",
            timer: 3500,
            customClass: {
              confirmButton: 'custom-confirm-button-class'
            }
          }).then((result) => {
            window.location.href = "/";
          });           
        }            
      })
      .catch(error => console.error(error));
            
  });