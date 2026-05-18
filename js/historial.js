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

    const tabla = document.getElementById("tablaTransacciones");

    
    tabla.innerHTML = "";

    
    if(
        !usuarioActivo.historial ||
        usuarioActivo.historial.length === 0
    ){

        tabla.innerHTML = `

            <tr>
                <td colspan="4">
                    No hay transacciones
                </td>
            </tr>

        `;

        return;
    }

    
    usuarioActivo.historial.forEach(function(transaccion, index){

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
                <td>
                    <button
                        class="btn btn-danger btn-sm"
                        onclick="generarPDF(${index})">
                        PDF
                    </button>

                </td>

            </tr>

        `;

    });

}

function generarPDF(index){

    const transaccion =
        usuarioActivo.historial[index];

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // TITULO
    doc.setFontSize(18);

    doc.text(
        "Comprobante de Transacción",
        20,
        20
    );

    // DATOS USUARIO
    doc.setFontSize(12);

    doc.text(
        "Usuario: " + usuarioActivo.usuario,
        20,
        40
    );

    doc.text(
        "Cuenta: #" +
        usuarioActivo.numeroCuenta,
        20,
        50
    );

    doc.text(
        "Fecha: " +
        transaccion.fecha,
        20,
        70
    );

    doc.text(
        "Tipo: " +
        transaccion.tipo,
        20,
        80
    );

    doc.text(
        "Monto: $" +
        transaccion.monto,
        20,
        90
    );

    doc.text(
        "Saldo actual: $" +
        usuarioActivo.Balance,
        20,
        110
    );

    doc.save(
        "transaccion_" + index + ".pdf"
    );

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