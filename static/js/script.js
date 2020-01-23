function logeo() {

    event.preventDefault()

    let usuario = document.getElementById("loginUsuario").value
    let password = document.getElementById("loginPassword").value

    if (usuario == "admin" && password == "admin") {
        
        console.log(usuario,password)
    }

}