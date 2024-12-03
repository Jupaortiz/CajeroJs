let usuarioTransaccional = JSON.parse(localStorage.getItem("nombreUsuarioActivo"));

// Guardar movimientos
function guardarMovimientos(usuarioActivo, monto, movimiento, fechaOperacion) {
    let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
    let nuevoMovimiento = {
        fecha: fechaOperacion,
        usuario: usuarioActivo,
        valorOperacion: monto,
        tipoMovimiento: movimiento,
    };
    movimientos.push(nuevoMovimiento);
    localStorage.setItem('movimientos', JSON.stringify(movimientos));
}

// Verificar usuario receptor
function verificarUsuarioExistente(nombreusuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some(usuario => usuario.nombreusuario === nombreusuario);
}

// Actualizar saldo del usuario
function actualizarSaldo(nombreusuario, monto, operacion) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuario = usuarios.find(u => u.nombreusuario === nombreusuario);

    if (usuario) {
        if (operacion === 'adicion') {
            usuario.saldo += monto;
        } else if (operacion === 'retiro' || operacion === 'transferencia') {
            usuario.saldo -= monto;
        }
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

// Realizar operaciones
function operaciones() {
    let monto = Number(document.querySelector('#monto').value);
    let movimiento = document.querySelector('#tipotransaccion').value;
    let fechaOperacion = new Date().toLocaleString();

    switch (movimiento) {
        case 'adicion':
            guardarMovimientos(usuarioTransaccional.nombreusuario, monto, 'Consignación', fechaOperacion);
            actualizarSaldo(usuarioTransaccional.nombreusuario, monto, 'adicion');
            alert('Consignación realizada exitosamente');
            document.getElementById('formulario').reset();
            break;

        case 'retiro':
            guardarMovimientos(usuarioTransaccional.nombreusuario, monto, 'Retiro', fechaOperacion);
            actualizarSaldo(usuarioTransaccional.nombreusuario, monto, 'retiro');
            alert('Retiro realizado exitosamente');
            document.getElementById('formulario').reset();
            break;

        case 'transferencia':
            let receptor = document.getElementById('receptor').value.trim();
            if (verificarUsuarioExistente(receptor)) {
                guardarMovimientos(usuarioTransaccional.nombreusuario, monto, `Transferencia a ${receptor}`, fechaOperacion);
                guardarMovimientos(receptor, monto, `Transferencia de ${usuarioTransaccional.nombreusuario}`, fechaOperacion);
                actualizarSaldo(usuarioTransaccional.nombreusuario, monto, 'transferencia');
                actualizarSaldo(receptor, monto, 'adicion');
                alert('Transferencia realizada exitosamente');
            } else {
                alert('El usuario receptor no existe.');
            }
            document.getElementById('formulario').reset();
            break;

        default:
            alert('Opción de operación no válida.');
            document.getElementById('formulario').reset();
            break;
    }
}

// Cargar movimientos en la tabla
function cargarTablaMovimientos() {
    let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
    let tablaBody = document.querySelector('#tablamovimientos tbody');
    tablaBody.innerHTML = '';

    // Filtrar movimientos del usuario actual
    let movimientosUsuario = movimientos.filter(movimiento => movimiento.usuario === usuarioTransaccional.nombreusuario);

    movimientosUsuario.forEach(movimiento => {
        let fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${movimiento.fecha}</td>
            <td>${movimiento.usuario}</td>
            <td>${movimiento.tipoMovimiento}</td>
            <td>${movimiento.valorOperacion}</td>
        `;

        tablaBody.appendChild(fila);
    });

    if (movimientosUsuario.length === 0) {
        alert('No hay movimientos registrados.');
    }

    // Redirigir a la sección de movimientos
    document.getElementById('movimientos').scrollIntoView({ behavior: 'smooth' });
}

// Modulo consulta saldos
function saldo() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuario = usuarios.find(u => u.nombreusuario === usuarioTransaccional.nombreusuario);
    if (usuario) {
        alert('El saldo de ' + usuario.nombreusuario + " es de " + usuario.saldo);
    } else {
        alert('Usuario no encontrado.');
    }
}
