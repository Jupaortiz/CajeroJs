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

// Realizar operaciones
function operaciones() {
    let monto = Number(document.querySelector('#monto').value);
    let movimiento = document.querySelector('#tipotransaccion').value;
    let fechaOperacion = new Date().toLocaleString();

    switch (movimiento) {
        case 'adicion':
            guardarMovimientos(usuarioTransaccional.nombreusuario, monto, 'Consignación', fechaOperacion);
            alert('Consignación realizada exitosamente');
            document.getElementById('formulario').reset();
            break;

        case 'retiro':
            guardarMovimientos(usuarioTransaccional.nombreusuario, monto, 'Retiro', fechaOperacion);
            alert('Retiro realizado exitosamente');
            document.getElementById('formulario').reset();
            break;

        case 'transferencia':
            let receptor = document.getElementById('receptor').value.trim();
            if (verificarUsuarioExistente(receptor)) {
                guardarMovimientos(usuarioTransaccional.nombreusuario, monto, `Transferencia a ${receptor}`, fechaOperacion);
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

    movimientos.forEach(movimiento => {
        let fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${movimiento.fecha}</td>
            <td>${movimiento.usuario}</td>
            <td>${movimiento.tipoMovimiento}</td>
            <td>${movimiento.valorOperacion}</td>
        `;

        tablaBody.appendChild(fila);
    });

    if (movimientos.length === 0) {
        alert('No hay movimientos registrados.');
    }
}
