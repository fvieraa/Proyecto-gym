function proximasClases() {

  let fechaMañana = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 /* Pasa las horas del dia a milisegundos */)
  let mañana = fechaMañana.toString().split(" ")[2] + " " + fechaMañana.toString().split(" ")[1]

  let contenidoMañana = "";
  contenidoMañana += `<h6 class="card-subtitle mb-2 text-muted"> ${mañana}</h6>`
  let agenda = JSON.parse(localStorage.getItem('agenda'))

  for (let index = 0; index < agenda.length; index++) {
    const element = agenda[index];

    if (element.fecha.split(" ")[0] == fechaMañana.toString().split(" ")[0] && element.fecha.split(" ")[1] == fechaMañana.toString().split(" ")[1] && element.fecha.split(" ")[2] == fechaMañana.toString().split(" ")[2]) {

      contenidoMañana += `<h6>${element.clase} ${element.turno}</h6>`
    }

  }

  document.getElementById('mañana').innerHTML = contenidoMañana;


}

function ultimosUsuarios() {

  let usuarios = JSON.parse(localStorage.getItem('usuarios'))
  let reverse = usuarios.reverse()
  // console.log(usuarios)

  let contenido = ""

  for (let index = 0; index < 3; index++) {

    const element = reverse[index];

    contenido += `<h6>${element.usuario}</h6>`
  }

  document.getElementById('ultimoUsuario').innerHTML = contenido;

}

function reservas() {

  let fechaMañana = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 /* Pasa las horas del dia a milisegundos */)
  // let mañana = fechaMañana.toString().split(" ")[0] + " " + fechaMañana.toString().split(" ")[1] + fechaMañana.toString().split(" ")[2]
  let agenda = JSON.parse(localStorage.getItem('agenda'))
  let clasesManana = agenda.filter(element => element.fecha.split(" ")[1] == fechaMañana.toString().split(" ")[1]
    && element.fecha.split(" ")[2] == fechaMañana.toString().split(" ")[2])

  let tabla = ""

  for (let index = 0; index < clasesManana.length; index++) {
    const clase = clasesManana[index];
    console.log(clase.id)

    if (clase.reservado.length) {

      for (let index = 0; index < clase.reservado.length; index++) {
        const usuario = clase.reservado[index];

        tabla += `
        <tr>
        <th scope="row">${clase.clase}</th>
        
        <td>${clase.turno}</td>
        <td>${usuario}</td>
        <td><button type="button" onclick="cancelarReserva('${usuario}','${clase.id}')" class="btn btn-warning">Cancelar Reserva</button></td>

        </tr>
        `
      }

    }

  }

  document.getElementById("tablaReserva").innerHTML = tabla

}

function cancelarReserva(usuarioActivo, id) {

  let agenda = JSON.parse(localStorage.getItem('agenda'))
  let indiceClase = agenda.findIndex(e => e.id == id)
  let reservados = agenda[indiceClase].reservado
  let indiceReservado = reservados.findIndex(e => e == usuarioActivo);
  if (confirm("desea cancelar la reserva?")) {

    reservados.splice(indiceReservado, 1)
    localStorage.setItem('agenda', JSON.stringify(agenda));
    console.log(reservados);
    reservas()
  } else {
    reservas()
  }
}