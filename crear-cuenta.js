    const formularioRegistro = document.getElementById('form-registro');
    formularioRegistro.addEventListener('submit', function(evento) {
        evento.preventDefault();
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contraseña').value;
        localStorage.setItem('correoGuardado', correo);
        localStorage.setItem('contrasenaGuardada', contrasena);
        alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
        window.location.href = 'inicio-sesion.html';
    });