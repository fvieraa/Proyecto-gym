function generarId(length) {
    var id = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var caracteresLength = caracteres.length;
    for (var i = 0; i < length; i++) {
        id += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    return id;
}

class Usuario {

    constructor(nombre, dni, usuario, password) {

        this.id = generarId(10)
        this.nombre = nombre;
        this.dni = dni;
        this.usuario = usuario;
        this.password = password;
        this.estado = true;
    }
}

class Clase {
    constructor(nombre) {
        this.id = generarId(5)
        this.nombre = nombre;
    }
}
class Sesion {
    constructor(id, usuario, estado, administrador) {


        this.id = id
        this.usuario = usuario;
        this.estado = estado;
        this.administrador = administrador
    }
}

function verSesiones() {
    // let a = sesiones.find(adm => adm.id == s)



    let sesiones = JSON.parse(localStorage.getItem('sesiones'))


    let usuario = " "

    usuario += ` <i class="fas fa-user"></i>  `
    usuario += sesiones[0].usuario
    document.getElementById('dropdownMenuLink').innerHTML = usuario;



    console.log()

}


function logeo() {
    event.preventDefault()

    let usuario = document.getElementById("loginUsuario").value
    let password = document.getElementById("loginPassword").value
    if (usuario != "" && password != "") {

        if (usuario == "admin" && password == "admin") {

            window.location.href = "index-admin.html";

            // let sesiones = []
            // let nuevaSesion = new Sesion(0,
            //     "admin", true)
            // sesiones.push(nuevaSesion)
            // localStorage.setItem('sesiones', JSON.stringify(sesiones));


        } else {

            let usuarios = JSON.parse(localStorage.getItem('usuarios'))
            if (!usuarios) {
                usuarios = []
            };
            console.log(usuarios)
            let indexUsuario = usuarios.find(u => (u.usuario == usuario && u.password == password))
            console.log(indexUsuario)

            if (!indexUsuario) {

                alert("usuario o contraseña invalidos")

            } else {
                window.location.href = "index-user.html";
                let usuarioSesionAbierta = usuarios.find(u => (u.usuario == usuario))
                let sesiones = []
                let nuevaSesion = new Sesion(usuarioSesionAbierta.id,
                    usuarioSesionAbierta.usuario, usuarioSesionAbierta.estado, false)
                sesiones.push(nuevaSesion)
                localStorage.setItem('sesiones', JSON.stringify(sesiones));
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


        let clases = JSON.parse(localStorage.getItem('clases'))
        if (!clases) {
            clases = []
        };
        let nuevaClase = new Clase(
            nombre.value
        );

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
        tabla += `<tr><td id="clase${clase.id}">${clase.nombre}</td>`;
        tabla += `
        <td id="botonesClases${clase.id}" class="center btn-group footable-visible footable-last-column">
                                
                                <a href="" onclick="editarClase('${clase.id}')" class="btn btn-info" role="button" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Editar"><i class="fa fa-edit"></i></a>
                                <a href="" onclick="eliminarClase('${clase.nombre}')" class="btn btn-danger delete" role="button" data-toggle="tooltip"
                                    data-placement="top" title="" data-original-title="Borrar"><i
                                        class="fas fa-trash text-white"></i></a>
                            </td>
        `

    }

    //Muestro el contenido de la tabla
    document.getElementById('tablaClases').innerHTML = tabla;
}

function editarClase(id) {

    event.preventDefault()
    listarClases()
    document.getElementById("botonesClases" + id).innerHTML = ""

    let clases = JSON.parse(localStorage.getItem("clases"))

    if (!clases) {
        clases = []
    }

    let tabla = ""
    let idClase = clases.findIndex(c => c.id == id)
    let clase = clases[idClase];
    tabla += `<tr><td ><input id="c${clase.id}" value="${clase.nombre}"> </td>`;
    tabla += `
        <td class="center btn-group footable-visible footable-last-column">
            <a data-status="1" class="btn btn-default moderate" role="button" data-toggle="tooltip"
                title="" data-original-title="Acceso"><i class="fa fa-circle text-success"></i></a>
            <a href="" onclick="guardarClaseEditada('${clase.id}')" class="btn btn-info" role="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="Editar"><i class="fa fa-edit"></i> guardar</a>
            <a href=""  class="btn btn-danger delete" role="button" data-toggle="tooltip"
                data-placement="top" title="" data-original-title="Borrar"><i class="fas fa-ban"></i>Cancelar</a>
        </td>
        `


    document.getElementById("clase" + id).innerHTML = tabla


}

function guardarClaseEditada(id) {

    event.preventDefault()
    let nombre = document.getElementById("c" + id).value.toUpperCase();
    let clases = JSON.parse(localStorage.getItem('clases'));
    let index = clases.findIndex(c => c.id == id);

    let indexClase = clases.find(c => c.nombre.toUpperCase() == nombre)
    if (indexClase) {
        if(clases[index].nombre.toUpperCase() == nombre){
            listarClases();
        } else{
        alert("clase ya existe");
    }} else {
        clases[index].nombre = nombre;

        localStorage.setItem('clases', JSON.stringify(clases));
        location.reload();
    }
}

function eliminarClase(nombreClase) {
    event.preventDefault()
    if(!confirm("Estas Seguro?")) return
    let agenda = JSON.parse(localStorage.getItem('agenda'))
    let bandera = false
    let clases = agenda.filter(c => {
        if (c.clase == nombreClase && c.reservado.length) bandera = true
        return c.clase != nombreClase
    })

    if (bandera) {
        alert("No puedes eliminar, asegurate de cancelar las reservas activas de esta clase!")
        return
    }
    localStorage.setItem('agenda', JSON.stringify(clases))

    let actividades = JSON.parse(localStorage.getItem('clases'))
    let indceActividad = actividades.findIndex(a => a.nombre == nombreClase)
    actividades.splice(indceActividad,1)

    localStorage.setItem('clases', JSON.stringify(actividades))
    listarClases()






    // let eliminar = agenda.filter(c => c.clase != nombreClase)
    // console.log(clases);


    // for (let index = 0; index < clases.length; index++) {
    //     const actividad = clases[index];

    //     if (actividad.reservado.length) {

    //         console.log(actividad.reservado)
    //     } else {
    //         console.log(eliminar);





    //     }
    // }
    //   let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    //   let index = usuarios.findIndex(c => c.id == codigo);

    //   if (confirm("¿Desea eliminar Usuario?")) {

    //       usuarios.splice(index, 1)
    //       console.log(usuarios)
    //       localStorage.setItem('usuarios',JSON.stringify(usuarios))
    //       listarUsuarios();

    //   }


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

                let usuarios = JSON.parse(localStorage.getItem('usuarios'))
                if (!usuarios) {
                    usuarios = []
                };
                let nuevoUsuario = new Usuario(
                    nombre.value,
                    dni.value,
                    usuario.value,
                    password.value
                );


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

        if (usuario.estado) {
            tabla += `<tr id="fila${usuario.id}"><td>${usuario.nombre}</td><td>${usuario.usuario}</td><td>${usuario.dni}</td>`;
            tabla += `
            <td class="center btn-group footable-visible footable-last-column">
                                    <a data-status="1" onclick="suspensionUsuario('${usuario.id}')" class="btn btn-default moderate" role="button" data-toggle="tooltip"
                                        title="" data-original-title="Acceso"><i class="fa fa-circle text-success"></i></a>
                                    <a href="" onclick="editarUsuario('${usuario.id}')" class="btn btn-info" role="button" data-toggle="tooltip" data-placement="top"
                                        title="" data-original-title="Editar"><i class="fa fa-edit"></i></a>
                                    <a href="" onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger" role="button" data-toggle="tooltip"
                                        data-placement="top" title="" data-original-title="Borrar"><i
                                            class="fa fa-trash"></i></a>
                                </td></tr>
            `
        } else {
            tabla += `<tr id="fila${usuario.id}"><td>${usuario.nombre}</td><td>${usuario.usuario}</td><td>${usuario.dni}</td>`;
            tabla += `
            <td class="center btn-group footable-visible footable-last-column">
                                    <a data-status="1" onclick="suspensionUsuario('${usuario.id}')" class="btn btn-default moderate" role="button" data-toggle="tooltip"
                                        title="" data-original-title="Acceso"><i class="fa fa-circle text-danger"></i></a>
                                    <a href="" onclick="editarUsuario('${usuario.id}')" class="btn btn-info" role="button" data-toggle="tooltip" data-placement="top"
                                        title="" data-original-title="Editar"><i class="fa fa-edit"></i></a>
                                    <a href="" onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger delete" role="button" data-toggle="tooltip"
                                        data-placement="top" title="" data-original-title="Borrar"><i
                                            class="fa fa-trash"></i></a>
                                </td></tr>
            `
        }

    }

    //Muestro el contenido de la tabla
    document.getElementById('tablaUsuarios').innerHTML = tabla;
}


function editarUsuario(codigo) {

    listarUsuarios()
    event.preventDefault()
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    let index = usuarios.findIndex(c => c.id == codigo);
    console.log(index)

    let tabla = ""
    let idUsuarios = usuarios.findIndex(u => u.id == codigo)
    let usuario = usuarios[idUsuarios];
    tabla += `<tr id="f${usuario.id}"><td><input id="${usuario.id}" value="${usuario.nombre}"><td>${usuario.usuario}</td><td>${usuario.dni}</td>`;
    tabla += `
        <td class="center btn-group footable-visible footable-last-column">
                                <a data-status="1" onclick="suspensionUsuario('${usuario.id}')" class="btn btn-default moderate" role="button" data-toggle="tooltip"
                                    title="" data-original-title="Acceso"><i class="fa fa-circle text-success"></i></a>
                                <a href="" onclick="guardarUsuarioEditado('${usuario.id}')" class="btn btn-info" role="button" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Editar"><i class="fa fa-edit"></i>Aceptar</a>
                                <a href="" onclick="listarUsuarios()" class="btn btn-danger delete" role="button" data-toggle="tooltip"
                                    data-placement="top" title="" data-original-title="Borrar"><i
                                        class="fas fa-ban"></i>Cancelar</a>
                                        
                            </td></tr>
        `

    document.getElementById("fila" + codigo).innerHTML = tabla
}

function guardarUsuarioEditado(codigo) {

    event.preventDefault()
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    let nombre = document.getElementById(codigo).value;
    let index = usuarios.findIndex(c => c.id == codigo);
    console.log(index)
    if (confirm("Desea modificar el nombre del usuario?")) {
        usuarios[index].nombre = nombre;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        listarUsuarios()
    } else {
        listarUsuarios()
    }


}

function eliminarUsuario(codigo) {

    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    let index = usuarios.findIndex(c => c.id == codigo);

    if (confirm("¿Desea eliminar Usuario?")) {

        usuarios.splice(index, 1)
        console.log(usuarios)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        listarUsuarios();

    }
}

function suspensionUsuario(codigo) {

    event.preventDefault()

    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    let idUsuarios = usuarios.findIndex(u => u.id == codigo);
    let usuario = usuarios[idUsuarios];

    if (usuario.estado) {

        if (confirm("¿Desea suspender el usuario?")) {

            usuario.estado = false;
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            listarUsuarios()
        }

    } else {
        if (confirm("¿Desea habilitar el usuario?")) {

            usuario.estado = true;
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            listarUsuarios()
        }
    }






}

function cambiarPassword() {
    let sesiones = JSON.parse(localStorage.getItem('sesiones'))
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (!usuarios) {
        usuarios = [];
    }
    let usuarioActivo = usuarios.find(u => (u.id == sesiones[0].id))
    // console.log(usuarioActivo);    
    if (usuarioActivo.password == usuarioActivo.usuario) {
        $('#modalCambiarPassword').modal('show');
    }
}

function guardarNuevoPassword() {
    let nuevoPassword = document.getElementById('nuevaClave').value;
    let confirmaNuevoPassword = document.getElementById('confirmaNuevaClave').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    let sesiones = JSON.parse(localStorage.getItem('sesiones'));
    for (let index = 0; index < usuarios.length; index++) {

        if (sesiones[0].id == usuarios[index].id) {
            if (confirmaNuevoPassword == nuevoPassword) {
                if (usuarios[index].usuario == nuevoPassword) {
                    alert('La clave no puede ser igual al nombre de usuario');
                    document.getElementById('nuevaClave').value = '';
                    document.getElementById('confirmaNuevaClave').value = '';
                } else if (nuevoPassword == '') {
                    alert('Debe ingresar una clave');
                    document.getElementById('nuevaClave').value = '';
                    document.getElementById('confirmaNuevaClave').value = '';
                } else {
                    usuarios[index].password = nuevoPassword;
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    document.getElementById('nuevaClave').value = '';
                    $('#modalCambiarPassword').modal('hide');
                }
            } else {
                alert('Las clave y su confirmacion son diferentes');
                document.getElementById('nuevaClave').value = '';
                document.getElementById('confirmaNuevaClave').value = '';

            }
        }
    }
}

function verClave() {
    let verClave = document.getElementById('mostrarClave').checked;
    if (verClave) {
        let nuevoPassword = document.getElementById('nuevaClave');
        let confirmaNuevoPassword = document.getElementById('confirmaNuevaClave');
        nuevoPassword.setAttribute('type', 'text');
        confirmaNuevoPassword.setAttribute('type', 'text');

    } else {
        let nuevoPassword = document.getElementById('nuevaClave');
        let confirmaNuevoPassword = document.getElementById('confirmaNuevaClave');
        nuevoPassword.setAttribute('type', 'password');
        confirmaNuevoPassword.setAttribute('type', 'password');

    }

}

function cerrarModalCambioClave() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    let sesiones = JSON.parse(localStorage.getItem('sesiones'));
    for (let index = 0; index < usuarios.length; index++) {

        if (sesiones[0].id == usuarios[index].id) {
            if (usuarios[index].usuario == usuarios[index].password) {
                alert('Debes cambiar la clave')
            } else {

                document.getElementById('nuevaClave').value = '';
                document.getElementById('confirmaNuevaClave').value = '';
                document.getElementById('mostrarClave').checked = false;
                $('#modalCambiarPassword').modal('hide');
            }
        }
    }
}

