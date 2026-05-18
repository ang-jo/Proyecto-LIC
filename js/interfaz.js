const usuarioActivo = JSON.parse(
    localStorage.getItem("sesionActiva")
);

if(usuarioActivo){

        document.getElementById("Usuario-activo").innerText =

            usuarioActivo.usuario +
            " #" +
            usuarioActivo.numeroCuenta;
    
        document.getElementById("saldo").innerText =
             
        "$" + usuarioActivo.Balance;


    }

// DEPOSITAR
function depositar(){

    let monto = Number(
        document.getElementById("deposito").value
    );

    if(monto <= 0){

        mostrarMensaje(
            "Ingrese un monto válido",
            "warning"
        );

        return;
    }

    usuarioActivo.Balance += monto;
    
    //push al historial
    usuarioActivo.historial.push({

    tipo: "Depósito",
    monto: monto,
    fecha: new Date().toLocaleString()

});
    //actializar el balance
    document.getElementById("saldo").innerText =
    "$" + usuarioActivo.Balance;
    
    localStorage.setItem(
        "sesionActiva",
        JSON.stringify(usuarioActivo)
    );

    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    for(let i = 0; i < usuarios.length; i++){

        if(
            usuarios[i].numeroCuenta ===
            usuarioActivo.numeroCuenta
        ){

             usuarios[i] = usuarioActivo;

            break;
        }

    }

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    mostrarMensaje(
        "Depósito realizado",
        "success"
    );

    document.getElementById("deposito").value = "";

}


function mostrarMensaje(texto, tipo){

    const mensaje = document.getElementById("mensaje");

    swal({
        title: texto,
        icon: tipo,
        button: "Aceptar"
    });
}

// Retirar
function retirar(){

    let monto = Number(
        document.getElementById("retiro").value
    );

    if(monto <= 0){

        mostrarMensaje(
            "Ingrese un monto válido",
            "warning"
        );

        return;
    }

    usuarioActivo.Balance -= monto;
    
    
    //push al historial
    usuarioActivo.historial.push({

    tipo: "retiro",
    monto: monto,
    fecha: new Date().toLocaleString()

});
    //actializar el balance
    document.getElementById("saldo").innerText =
    "$" + usuarioActivo.Balance;
    
    localStorage.setItem(
        "sesionActiva",
        JSON.stringify(usuarioActivo)
    );

    // actualiz el ussuario
    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    for(let i = 0; i < usuarios.length; i++){

        if(
            usuarios[i].numeroCuenta ===
            usuarioActivo.numeroCuenta
        ){

            usuarios[i] = usuarioActivo;

            break;
        }

    }

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    mostrarMensaje(
        "Retiro realizado",
        "success"
    );

    document.getElementById("deposito").value = "";

}


//Pago de servicios

function pagarServicio(){

    const tipoServicio = document.getElementById("tipoServicio").value;

    const monto = Number(
        document.getElementById("servicio").value
    );

    
    if(tipoServicio === ""){

        mostrarMensaje(
            "Seleccione un servicio",
            "warning"
        );

        return;
    }

    if(monto <= 0){

        mostrarMensaje(
            "Ingrese un monto válido",
            "warning"
        );

        return;
    }

    if(monto > usuarioActivo.Balance){

        mostrarMensaje(
            "Saldo insuficiente",
            "error"
        );

        return;
    }

    usuarioActivo.Balance -= monto;
    
    usuarioActivo.historial.push({

    tipo: tipoServicio,
    monto: monto,
    fecha: new Date().toLocaleString()

});

    //actualiza el saldo o balance
    document.getElementById("saldo").innerText =
        "$" + usuarioActivo.Balance;

    localStorage.setItem(
        "sesionActiva",
        JSON.stringify(usuarioActivo)
    );

    
    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    for(let i = 0; i < usuarios.length; i++){

        if(
            usuarios[i].numeroCuenta ===
            usuarioActivo.numeroCuenta
        ){

            usuarios[i] = usuarioActivo;

            break;
        }
    }

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    mostrarMensaje(
        "Pago de " + tipoServicio + " realizado",
        "success"
    );

    document.getElementById("tipoServicio").value = "";
    document.getElementById("servicio").value = "";
}


function mostrarMensaje(texto, tipo){

    //const mensaje = document.getElementById("mensaje");

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