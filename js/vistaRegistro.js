// Validación de que las contraseñas coincidan
function validarCoincidenciaContrasenas(contrasenia, confirmarContrasenia) {
    return contrasenia === confirmarContrasenia;
}

// Validación si el nombre de usuario ya está registrado
function verificarUsuarioExistente(nombreusuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some(usuario => usuario.nombreusuario === nombreusuario);
}

// Almacenamiento de los elementos del objeto usuario en el localStorage
function guardarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para manejar el registro
function registrarUsuario(event) {
    event.preventDefault();

    let nombreusuario = document.getElementById('nombreusuario').value.trim();
    let contrasenia = document.getElementById('contrasenia').value.trim();
    let confirmarContrasenia = document.getElementById('confirmarcontrasenia').value.trim();
    let fecha = new Date().toLocaleDateString(); // Guardar la fecha como cadena de texto

    // Validar que las contraseñas coincidan
    if (!validarCoincidenciaContrasenas(contrasenia, confirmarContrasenia)) {
        alert('Las contraseñas no coinciden. Por favor, verifica nuevamente.');
        document.getElementById('contrasenia').value = '';
        document.getElementById('confirmarcontrasenia').value = '';
        return;
    }

    // Validar que el nombre de usuario no esté duplicado
    if (verificarUsuarioExistente(nombreusuario)) {
        alert('El nombre de usuario ya está registrado.');
        document.getElementById('formulario').reset();
        return;
    }

    // Crear el objeto de usuario
    let nuevoUsuario = {
        nombreusuario: nombreusuario,
        contrasenia: contrasenia,
        fecha: fecha,
        movimiento: 'adicion',
        saldo: 200000
    };

    // Guardar el usuario en el localStorage
    guardarUsuario(nuevoUsuario);

    // Mostrar un mensaje de éxito
    alert('Usuario registrado con éxito.');

    // Limpiar los campos del formulario
    document.getElementById('formulario').reset();
}

// Agregar el evento al formulario
document.getElementById('formulario').addEventListener('submit', registrarUsuario);

// Redirigir al hacer clic en el botón "Continuar"
document.getElementById("continuar").addEventListener("click", function () {
    window.location.href = "vistaIngreso.html";
});
