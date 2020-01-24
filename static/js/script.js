class Usuario {

    constructor(nombre, dni, usuario, password) {

        this.nombre = nombre;
        this.dni = dni;
        this.usuario = usuario;
        this.password = password;
    }
}

function logeo() {

    event.preventDefault()

    let usuario = document.getElementById("loginUsuario").value
    let password = document.getElementById("loginPassword").value
    if (usuario != "" && password != "") {

        if (usuario == "admin" && password == "admin") {

            window.location.href = "index-user.html";

        }
    } else {
        console.log("complete todos los campos")
    }

}

function agregarUsuario() {
    event.preventDefault();
    let nombre = document.getElementById('agregarNombreUsuario');
    let dni = document.getElementById('agregarDniUsuario');
    let usuario = document.getElementById('agregarUsuarioUsuario');
    let password = usuario;

    //Verifico que estén todos los campos
    if (nombre.value != "" && dni.value != "" && usuario.value != "") {
        if (nombre.value.length < 60) {
            if (usuario.value.length < 30) {

                let nuevoUsuario = new Usuario(
                    nombre.value,
                    dni.value,
                    usuario.value,
                    password.value
                );

                let usuarios = JSON.parse(localStorage.getItem('usuarios'));
                let indexUsuario = usuarios.find(u => u.usuario == usuario.value)
                let indexDni = usuarios.find(u => u.dni == dni.value)
                
                if (!indexUsuario) {

                    if(!indexDni){

                        
                        usuarios.push(nuevoUsuario);
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));
                        
                        location.reload();
                    }else{
                        alert("dni ya registrado")
                    }
                } else {
                    alert("usuario ya existe")

                }
            } else {
                alert("usuario demasiado largo")
            }

        } else {
            alert("nombre demasiado largo")
        }
    } else {
        alert("complete todos los campos")
    }
}
