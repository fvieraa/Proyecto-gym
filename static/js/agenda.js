class Agenda {

  constructor(fecha, turno, clase, cupo) {
    this.fecha = fecha;
    this.turno = turno;
    this.clase = clase;
    this.cupo = cupo;
  }
}


function llenarModal() {

  let clases = JSON.parse(localStorage.getItem('clases'));

  let option = "";
  for (let index = 0; index < clases.length; index++) {
    let clase = clases[index];

    option += ' <option>' + clase.nombre + '</option>';
  }
  document.getElementById('optionClases').innerHTML = option;


}

function cargar() {


  event.preventDefault();

  let agenda = JSON.parse(localStorage.getItem('agenda'))
  if (!agenda) {
    agenda = []
  };
  console.log(agenda)
  let lunes = document.getElementById('lunes').checked;
  let martes = document.getElementById('martes').checked;
  let miercoles = document.getElementById('miercoles').checked;
  console.log(lunes)
  let jueves = document.getElementById('jueves').checked;
  let viernes = document.getElementById('viernes').checked;
  let dia = 24
  let mes = []
  for (let index = 0; index < 30; index++) {
    let fechaHoy = new Date(new Date().getTime() + dia * 60 * 60 * 1000)
    dia = dia + 24
    mes.push(fechaHoy.toString())
  }
  if (lunes) {

    let turno = document.getElementById('optionTurno').value;
    let clase = document.getElementById('optionClases').value;
    let cupo = 10;
    let cont = 0
    let nuevaEntrada
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Mon") {
        let fecha = mes[index];
        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)
        agenda.forEach(element => {
          if ((element.fecha.split(" ")[0] == "Mon") && (element.turno == turno)) {
            cont++
          }
        })
      }
    }
    if (cont > 3) {
      console.log("ya hay algo en esa fecha y horario")
    } else {
      for (let index = 0; index < 4; index++) {

        agenda.push(nuevaEntrada);
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }


  if (martes) {
    let turno = document.getElementById('optionTurno').value;
    let clase = document.getElementById('optionClases').value;
    let cupo = 10;
    let cont = 0
    let nuevaEntrada
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Tue") {
        let fecha = mes[index];
        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)
        agenda.forEach(element => {
          if ((element.fecha.split(" ")[0] == "Tue") && (element.turno == turno)) {
            cont++
          }
        })
      }
    }
    if (cont > 3) {
      console.log("ya hay algo en esa fecha y horario")
    } else {
      for (let index = 0; index < 4; index++) {

        agenda.push(nuevaEntrada);
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }
  if (miercoles) {
    let turno = document.getElementById('optionTurno').value;
    let clase = document.getElementById('optionClases').value;
    let cupo = 10;
    let cont = 0
    let nuevaEntrada
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Wed") {
        let fecha = mes[index];
        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)
        agenda.forEach(element => {
          if ((element.fecha.split(" ")[0] == "Wed") && (element.turno == turno)) {
            cont++
          }
        })
      }
    }
    if (cont > 3) {
      console.log("ya hay algo en esa fecha y horario")
    } else {
      for (let index = 0; index < 4; index++) {

        agenda.push(nuevaEntrada);
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }
  if (jueves) {
    let turno = document.getElementById('optionTurno').value;
    let clase = document.getElementById('optionClases').value;
    let cupo = 10;
    let cont = 0
    let nuevaEntrada
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Thu") {
        let fecha = mes[index];
        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)
        agenda.forEach(element => {
          if ((element.fecha.split(" ")[0] == "Thu") && (element.turno == turno)) {
            cont++
          }
        })
      }
    }
    if (cont > 3) {
      console.log("ya hay algo en esa fecha y horario")
    } else {
      for (let index = 0; index < 4; index++) {

        agenda.push(nuevaEntrada);
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }
  if (viernes) {
    let turno = document.getElementById('optionTurno').value;
    let clase = document.getElementById('optionClases').value;
    let cupo = 10;
    let cont = 0
    let nuevaEntrada
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Fri") {
        let fecha = mes[index];
        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)
        agenda.forEach(element => {
          if ((element.fecha.split(" ")[0] == "Fri") && (element.turno == turno)) {
            cont++
          }
        })
      }
    }
    if (cont > 3) {
      console.log("ya hay algo en esa fecha y horario")
    } else {
      for (let index = 0; index < 4; index++) {

        agenda.push(nuevaEntrada);
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }
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
      id = clases.length + 1,
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

function listarEntradas() {

  let agenda = JSON.parse(localStorage.getItem('agenda'));
  //Controlo si no tengo aún notas almacenadas
  if (!agenda) {
      agenda = [];
  }

  //Genero el contenido de la tabla
  let tabla = "";
  for (let index = 0; index < agenda.length; index++) {
      let agen = agenda[index];
      if(agenda[index].fecha.split(" ")[0] == "Mon"){
        agen.fecha = "Lunes"
      }
      if(agenda[index].fecha.split(" ")[0] == "Tue"){
        agen.fecha = "Martes"
      }
      if(agenda[index].fecha.split(" ")[0] == "Wed"){
        agen.fecha = "Miercoles"
      }
      if(agenda[index].fecha.split(" ")[0] == "Thu"){
        agen.fecha = "Jueves"
      }
      if(agenda[index].fecha.split(" ")[0] == "Fri"){
        agen.fecha = "Viernes"
      }

      tabla += `<tr><td>${agen.fecha}</td><td>${agen.clase}</td><td>${agen.turno}</td><td>${agen.cupo}</td>`;
  }

  //Muestro el contenido de la tabla
  document.getElementById('tablaAgenda').innerHTML = tabla;
}
