NacimientoDeAsh();
function NacimientoDeAsh(){

    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];
    const existe = usuarios.some(

        usuario => usuario.numeroCuenta === "0987654321"

    );

    if(!existe){

        const usuarioBase = {

            nombre: "Ash",
            apellido: "Ketchum",
            usuario: "Ash Ketchum",
            password: "1234",
            numeroCuenta: "0987654321",
            Balance: 500,
            historial: []
            
        };

        usuarios.push(usuarioBase);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

    }
}





// validatejs
function validarUsuario(usuarioObjeto){

        
        const constraints = {

            nombre: {
                    presence: {
                    allowEmpty: false,
                    message: "campo obligatorio"
                    }
                },

            apellido: {
                    presence: {
                    allowEmpty: false,
                    message: "campo obligatorio"
                    }
                },
            usuario: {
                    presence: {
                    allowEmpty: false,
                    message: "campo obligatorio"
                    },
                    length: {
                    minimum: 4,
                    maximum: 15,
                    message: "debe tener entre 4 y 15 caracteres"
                }
            },

            password: {
                presence: {
                    allowEmpty: false,
                    message: "campo obligatorio"
                },
                format: {
                    pattern: "^[0-9]{4}$",
                    message: "ingrese un ping de 4 números"

                }
                
            }

        };

        const errores = validate(usuarioObjeto, constraints);

        if(errores){

            let mensajes = "";

            for(let campo in errores){

                mensajes += errores[campo][0] + "\n";

            }

            mostrarMensaje(mensajes, "warning");

            return false;

        }

        return true;
    }



// fun registrar
function registrar(){

    const nuevoUsuario = {
        nombre: document.getElementById("nombreRegistro").value,
        apellido: document.getElementById("apellidoRegistro").value,
        usuario: document.getElementById("usuarioRegistro").value,
        password: document.getElementById("passwordRegistro").value,
        numeroCuenta: generarNumeroCuenta(),
        Balance: 500,
        historial: []

    };

    // Validar antes de guardar
    if(!validarUsuario(nuevoUsuario)){
        return;
    }

    //
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    
    // verifiiicaar
    const existe = usuarios.find(

        u => u.usuario === nuevoUsuario.usuario

    );

    if(existe){

        mostrarMensaje(
            "Ese nombre de usuario ya existe",
            "error"
        );

        return;
    }
    
    

    //guarda el ussuario
    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("Usuario registrado", "success");
    
    limpiarCampos();
    
    setTimeout(() => {

                mostrarLogin();

            }, 1000);


}//termina funcion de registrar


//Funcion de login 


 function iniciarSesion(){

     
            const usuario = document.getElementById("usuario").value;

            const password = document.getElementById("pin").value;

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const encontrado = usuarios.find(

                u =>
                    u.usuario === usuario &&
                    u.password === password

            );

            if(encontrado){
                //Genuinamente no se porque se repite el consol log para ver los ususarios, lo puse para saber si se estaban guardando los dartos en el LS pero repite la accion varias veces en la consola al apretar INICIAR SESION

                console.log(localStorage.getItem("usuarios"));
                mostrarMensaje(
                    "Bienvenido " + encontrado.nombre,
                    "success"
                    
                    
                );
                    
                localStorage.setItem(
                    "sesionActiva",
                    JSON.stringify(encontrado)
                    );

            
                setTimeout(() => {

                    window.location.href = "interfaz.html";

                        }, 1000);
            }else{
                console.log(localStorage.getItem("usuarios"));
                mostrarMensaje(
                    "Usuario o PIN incorrectos",
                    "error"
                );

            }

        } //termina funcion inicio se sesion (login)

/*function limpiarMensaje(){

            document.getElementById("mensaje").innerText = "";

        }*/

        // LIMPIAR
function limpiarCampos(){

            document.getElementById("nombreRegistro").value = "";
            document.getElementById("apellidoRegistro").value = "";
            document.getElementById("usuarioRegistro").value = "";
            document.getElementById("passwordRegistro").value = "";

        }


//Funcion para asignarle numero aleatorio a las cuentas

function generarNumeroCuenta(){

      const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    let numeroCuenta;
    let existe = true;

    while(existe){

        numeroCuenta = "";

        for(let i = 0; i < 10; i++){

            numeroCuenta += Math.floor(
                Math.random() * 10
            );

        }
        
        const cuentaGenerada = numeroCuenta;

        existe = usuarios.some(function(usuario){

            return (
                usuario.numeroCuenta ===
                cuentaGenerada
            );

        });

    }

    return numeroCuenta;

}

function mostrarMensaje(texto, tipo){

    //const mensaje = document.getElementById("mensaje");

    swal({
        title: texto,
        icon: tipo,
        button: "Aceptar"
    });
}



 function mostrarRegistro(){

            document.getElementById("loginBox").classList.add("hidden");
            document.getElementById("registroBox").classList.remove("hidden");

            limpiarMensaje();
        }
function mostrarLogin(){

            document.getElementById("registroBox").classList.add("hidden");
            document.getElementById("loginBox").classList.remove("hidden");

            limpiarMensaje();
        }
