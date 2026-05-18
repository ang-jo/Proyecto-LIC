





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

        // validar
        const errores = validate(usuarioObjeto, constraints);

        // resultado
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



// registrar
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

    
    // VERIFICAR SI EL USUARIO EXISTE
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

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let numeroCuenta;
    let existe;

    do{

        numeroCuenta = Math.floor(
            10000000 + Math.random() * 90000000
        );

        existe = false;

for(let i = 0; i < usuarios.length; i++){

    if(usuarios[i].numeroCuenta === numeroCuenta){

        existe = true;
        break;

    }
        }
            }while(existe);

    return numeroCuenta;

}

function mostrarMensaje(texto, tipo){

    const mensaje = document.getElementById("mensaje");

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
