function ingreso() {
    // Paso 1: Obtener el valor de 'usuarios' del localStorage
    let usuariosCon = localStorage.getItem('usuarios');

    // Paso 2: Comprobar si se obtuvieron datos
    if (usuariosCon) {
        // Paso 3: Parsear el valor JSON
        const usuarios = JSON.parse(usuariosCon);

        // Paso 4: Obtener los valores de los campos
        let nombreUsuario = document.getElementById('nombreusuario').value.trim();
        let clave = document.getElementById('clave').value.trim();

        // Validar si los campos están vacíos
        if (!nombreUsuario || !clave) {
            alert('Por favor, ingrese nombre de usuario y contraseña.');
            return;
        }

        // Paso 5: Buscar el usuario en el arreglo
        let usuario = usuarios.find(u => u.nombreusuario === nombreUsuario && u.contrasenia === clave);

        // Paso 6: Comprobar si se encontró el usuario
        if (usuario) {
            // Guardar el usuario activo en el localStorage
            localStorage.setItem("nombreUsuarioActivo", JSON.stringify(usuario));

            // Redirigir al usuario a la página de operaciones
            window.location.href = 'vistaOperaciones.html';

            console.log('Usuario encontrado:', usuario);
            console.log('Saldo:', usuario.saldo);
        } else {
            // Si no se encuentra el usuario, mostrar un mensaje
            console.log('Usuario o contraseña incorrectos');
            alert('Usuario o contraseña incorrectos');
        }
    } else {
        console.log('No se encontraron usuarios en el localStorage');
        alert('No se han registrado usuarios');
    }
}
