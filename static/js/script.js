class Usuario {

    constructor(nombre, dni, usuario, password) {

        this.nombre = nombre;
        this.dni = dni;
        this.usuario = usuario;
        this.password = password;
    }
}

class Clase {
    constructor(nombre) {
        this.nombre = nombre;
    }
}
class Sesion {
    constructor(id, usuario, administrador) {


        this.id = id
        this.usuario = usuario;
        this.administrador = administrador
    }
}

function verSesiones() {
    let sesiones = JSON.parse(localStorage.getItem('sesiones'))
    let s = sesiones.findIndex(sesion => sesion.id == 0)
    let a = sesiones.find(adm => adm.id == s)

    if (a.administrador) {
        console.log("eres administrador")
    }




}


function logeo() {
    event.preventDefault()

    let usuario = document.getElementById("loginUsuario").value
    let password = document.getElementById("loginPassword").value
    if (usuario != "" && password != "") {

        if (usuario == "admin" && password == "admin") {

            window.location.href = "index-user.html";

            let sesiones = []
            let nuevaSesion = new Sesion(0,
                "admin", true)
            sesiones.push(nuevaSesion)
            localStorage.setItem('sesiones', JSON.stringify(sesiones));





        } else {

            let usuarios = JSON.parse(localStorage.getItem('usuarios'))
            if (!usuarios) {
                usuarios = []
            };
            console.log(usuarios)
            let indexUsuario = usuarios.find(u => u.usuario == usuario && u.password == password)
            console.log(indexUsuario)

            if (!indexUsuario) {

                alert("usuario o contraseña invalidos")

            }

        }
    } else {
        alert("complete todos los campos")
    }

}

function cerrarSesion() {
    let sesiones = []
    localStorage.setItem('sesiones', JSON.stringify(sesiones));

    window.location.href = "index.html";


}

function agregarClase() {
    event.preventDefault();
    let nombre = document.getElementById('agregarNombreClase');

    if (nombre.value != "") {

        let nuevaClase = new Clase(
            nombre.value
        );

        let clases = JSON.parse(localStorage.getItem('clases'))
        if (!clases) {
            clases = []
        };

        let indexClase = clases.find(c => c.nombre == nombre.value)

        if (!indexClase) {

            clases.push(nuevaClase);
            localStorage.setItem('clases', JSON.stringify(clases));
            location.reload();

        } else {
            alert("clase ya existe")

        }

    } else {
        alert("complete todos los campos")
    }
}

function listarClases() {

    let clases = JSON.parse(localStorage.getItem('clases'));
    //Controlo si no tengo aún notas almacenadas
    if (!clases) {
        clases = [];
    }

    //Genero el contenido de la tabla
    let tabla = "";
    for (let index = 0; index < clases.length; index++) {
        let clase = clases[index];
        tabla += `<tr"><td>${clase.nombre}</td>`;
        tabla += `
        <td class="center btn-group footable-visible footable-last-column">
                                <a data-status="1" class="btn btn-default moderate" role="button" data-toggle="tooltip"
                                    title="" data-original-title="Acceso"><i class="fa fa-circle text-success"></i></a>
                                <a href="" onclick="editarUsuario()" class="btn btn-info" role="button" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Editar"><i class="fa fa-edit"></i></a>
                                <a onclick="eliminarUsuario()" class="btn btn-danger delete" role="button" data-toggle="tooltip"
                                    data-placement="top" title="" data-original-title="Borrar"><i
                                        class="fa fa-trash-o"></i></a>
                            </td></tr>
        `

    }

    //Muestro el contenido de la tabla
    document.getElementById('tablaClases').innerHTML = tabla;
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

                let usuarios = JSON.parse(localStorage.getItem('usuarios'))
                if (!usuarios) {
                    usuarios = []
                };

                let indexUsuario = usuarios.find(u => u.usuario == usuario.value)
                let indexDni = usuarios.find(u => u.dni == dni.value)

                if (!indexUsuario) {

                    if (!indexDni) {


                        usuarios.push(nuevoUsuario);
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));
                        location.reload();

                    } else {
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

function listarUsuarios() {

    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    //Controlo si no tengo aún notas almacenadas
    if (!usuarios) {
        usuarios = [];
    }

    //Genero el contenido de la tabla
    let tabla = "";
    for (let index = 0; index < usuarios.length; index++) {
        let usuario = usuarios[index];
        tabla += `<tr id="${usuario.dni}"><td>${usuario.nombre}</td><td>${usuario.usuario}</td><td>${usuario.dni}</td>`;
        tabla += `
        <td class="center btn-group footable-visible footable-last-column">
                                <a data-status="1" class="btn btn-default moderate" role="button" data-toggle="tooltip"
                                    title="" data-original-title="Acceso"><i class="fa fa-circle text-success"></i></a>
                                <a href="" onclick="editarUsuario(${usuario.dni})" class="btn btn-info" role="button" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Editar"><i class="fa fa-edit"></i></a>
                                <a onclick="eliminarUsuario(${usuario.dni})" class="btn btn-danger delete" role="button" data-toggle="tooltip"
                                    data-placement="top" title="" data-original-title="Borrar"><i
                                        class="fa fa-trash-o"></i></a>
                            </td></tr>
        `

    }

    //Muestro el contenido de la tabla
    document.getElementById('tablaUsuarios').innerHTML = tabla;
}


function editarUsuario(dni) {

    event.preventDefault()

    let usuarios = JSON.parse(localStorage.getItem("usuarios"))

    if (!usuarios) {
        usuarios = []
    }

    let tabla = ""
    let idUsuarios = usuarios.findIndex(u => u.dni == dni)
    console.log(idUsuarios)
    let usuario = usuarios[idUsuarios];
    console.log(usuarios[idUsuarios].dni)
    tabla += `<tr id="${usuario.dni}"><td><input value="${usuario.nombre}"></td><td><input value="${usuario.usuario}"></td><td><input value="${usuario.dni}"></td>`;
    tabla += `
        <td class="center btn-group footable-visible footable-last-column">
                                <a data-status="1" class="btn btn-default moderate" role="button" data-toggle="tooltip"
                                    title="" data-original-title="Acceso"><i class="fa fa-circle text-success"></i></a>
                                <a href="" onclick="editarUsuario(${usuario.dni})" class="btn btn-info" role="button" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Editar"><i class="fa fa-edit"></i></a>
                                <a onclick="eliminarUsuario(${usuario.dni})" class="btn btn-danger delete" role="button" data-toggle="tooltip"
                                    data-placement="top" title="" data-original-title="Borrar"><i
                                        class="fa fa-trash-o"></i></a>
                            </td></tr>
        `

    document.getElementById(dni).innerHTML = tabla


}

function eliminarUsuario() {

    console.log("funciona")
}
