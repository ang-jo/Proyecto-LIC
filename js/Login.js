




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

            console.log("Errores encontrados:");

            for(let campo in errores){
                console.log(errores[campo][0]);
            }

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
        password: document.getElementById("passwordRegistro").value

    };

    // Validar antes de guardar
    if(!validarUsuario(nuevoUsuario)){
        mostrarMensaje("Datos inválidos", "red");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //guarda el ussuario
    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("Usuario registrado", "green");
    
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
                    "green"
                    
                    
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
                    "red"
                );

            }

        } //termina funcion inicio se sesion (login)

function limpiarMensaje(){

            document.getElementById("mensaje").innerText = "";

        }

        // LIMPIAR
function limpiarCampos(){

            document.getElementById("nombreRegistro").value = "";
            document.getElementById("apellidoRegistro").value = "";
            document.getElementById("usuarioRegistro").value = "";
            document.getElementById("passwordRegistro").value = "";

        }

function mostrarMensaje(texto, color){

    const mensaje = document.getElementById("mensaje");

    mensaje.innerText = texto;
    mensaje.style.color = color;

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
