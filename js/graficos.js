const usuarioActivo = JSON.parse(
    localStorage.getItem("sesionActiva")
);

if(usuarioActivo){

        document.getElementById("Usuario-activo").innerText =

            usuarioActivo.usuario +
            " #" +
            usuarioActivo.numeroCuenta;
    


    }

generarGrafico();

function generarGrafico(){

    // CONTADORES
    let depositos = 0;
    let retiros = 0;
    let agua = 0;
    let internet = 0;
    let telefonica = 0;
    let electricidad = 0; 

    // RECORRER HISTORIAL
    usuarioActivo.historial.forEach(function(transaccion){

        const tipo = transaccion.tipo.toLowerCase();

        if(tipo.includes("depósito")){

            depositos++;

        }else if(tipo.includes("retiro")){

            retiros++;

        }else if(tipo.includes("agua")){

            agua++;

        }else if(tipo.includes("electricidad")){

            electricidad++;

        }else if(tipo.includes("telefonica")){

            telefonica++;

        }else if(tipo.includes("internet")){

            internet++;

        }

    });

    // OBTENER CANVAS
    const ctx = document.getElementById(
        "graficoTransacciones"
    );

    // CREAR GRAFICO
    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
               "depositos",
                "retiros",
                "agua",
                "internet",
                "telefonica",
                "electricidad"
            ],

            datasets: [{

                label: "Cantidad de transacciones",

                data: [
                    depositos,
                    retiros,
                    agua,
                    internet,
                    telefonica,
                    electricidad
                ],

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {
                    beginAtZero: true
                }

            }

        }

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