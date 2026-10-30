    const formularioLogin = document.getElementById('form-login');

    formularioLogin.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const correoIngresado = document.getElementById('correo').value;
        const contrasenaIngresada = document.getElementById('contraseña').value;

        const correoReal = localStorage.getItem('correoGuardado');
        const contrasenaReal = localStorage.getItem('contrasenaGuardada');

        if (correoIngresado === correoReal && contrasenaIngresada === contrasenaReal) {
            alert('¡Inicio de sesión exitoso! Bienvenido.');
            // window.location.href = 'tienda parte de cañete xd .html';
        } else {
            alert('Correo o contraseña incorrectos. Inténtalo de nuevo.');
        }
    });