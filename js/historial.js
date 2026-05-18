const usuarioActivo = JSON.parse(
    localStorage.getItem("sesionActiva")
);

if(usuarioActivo){

        document.getElementById("Usuario-activo").innerText =

            usuarioActivo.usuario +
            " #" +
            usuarioActivo.numeroCuenta;
    


    }

mostrarHistorial();

function mostrarHistorial(){

    const tabla = document.getElementById(
        "tablaTransacciones"
    );

    // LIMPIAR TABLA
    tabla.innerHTML = "";

    // VALIDAR SI HAY HISTORIAL
    if(
        !usuarioActivo.historial ||
        usuarioActivo.historial.length === 0
    ){

        tabla.innerHTML = `

            <tr>
                <td colspan="3">
                    No hay transacciones
                </td>
            </tr>

        `;

        return;
    }

    // RECORRER HISTORIAL
    usuarioActivo.historial.forEach(function(transaccion){

        tabla.innerHTML += `

            <tr>

                <td>
                    ${transaccion.fecha}
                </td>

                <td>
                    ${transaccion.tipo}
                </td>

                <td>
                    $${transaccion.monto}
                </td>

            </tr>

        `;

    });

}


function mostrarMensaje(texto, tipo){

    swal({
        title: texto,
        icon: tipo,
        button: "Aceptar"
    });
}

function salir (){
    window.location.href = "index.html";
    localStorage.removeItem("sesionActiva");
}
function Irhistorial (){
    window.location.href = "Historial.html";
    
}

function Irgraficos (){
    window.location.href = "Graficos.html";
    
}

function Irinterfaz (){
    window.location.href = "interfaz.html";
    
}