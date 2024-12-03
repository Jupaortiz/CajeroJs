   // Modulo consulta saldos
   let usuarioTransaccional=JSON.parse(localStorage.getItem("nombreUsuarioActivo"));
    console.log(usuarioTransaccional);

    function saldo(){
        alert('el saldo de '+usuarioTransaccional.nombreusuario+" es de "+usuarioTransaccional.saldo)
    }
    // Modulo Consulta movimientos


    // Modulo Transacciones

    function operaciones(){
        let monto= Number(document.querySelector('#monto').value);
        let movimiento=document.querySelector('#tipotransaccion').value;
    // operaciones
    let transferencia;
    let consignacion;
    let retiro;

    switch(movimiento){
        case 'adicion':
            //Consignar
            console.log('voy a consignar')
            // limpia el formulario
            document.getElementById('formulario').reset();

        break;

        case 'retiro':
            //Retirar
            console.log('voy a retirar')
            // limpia el formulario
            document.getElementById('formulario').reset();

        break

        case 'transferencia':
            //transferir
            console.log('voy a tranferir')
            // limpia el formulario
            document.getElementById('formulario').reset();

        break
    
    default:
        alert('Opción incorrecta. Intente nuevamente.');
        // limpia el formulario
        document.getElementById('formulario').reset();
        break;
    }

    }

