class Agenda {
  constructor(fecha, turno, clase, cupo) {
    this.fecha = fecha;
    this.turno = turno;
    this.clase = clase;
    this.cupo = cupo;
    this.reservado = [];
  }
}

// function domingo(){

//   let agenda = JSON.parse(localStorage.getItem('agenda'))
//   let nueva = new Agenda('Sun Feb 16 2020 16:07:29 GMT-0300 (hora estándar de Argentina)', "10:00", "crossfit", 5)
//   let nueva2 = new Agenda('Sun Feb 16 2020 16:07:29 GMT-0300 (hora estándar de Argentina)', "08:00", "funcional", 5)
//   let nueva3 = new Agenda('Sun Feb 16 2020 16:07:29 GMT-0300 (hora estándar de Argentina)', "16:00", "boxeo", 5)
//   agenda.push(nueva);
//   agenda.push(nueva2);
//   agenda.push(nueva3);
//   localStorage.setItem('agenda', JSON.stringify(agenda));


// }

/* Esta funcion se encarga de colocar las clases que se cargaron, en el modal del alta de horarios */
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
  /* Buscar/Crear la agenda en el LocalStorage */
  let agenda = JSON.parse(localStorage.getItem('agenda'))
  if (!agenda) {
    agenda = []
  };
  console.log(agenda)

  /* Definir las variables true para cada dia */
  let lunes = document.getElementById('lunes').checked;
  let martes = document.getElementById('martes').checked;
  let miercoles = document.getElementById('miercoles').checked;
  let jueves = document.getElementById('jueves').checked;
  let viernes = document.getElementById('viernes').checked;

  // Crea el mes
  let dia = 24
  let mes = []
  for (let index = 0; index < 30; index++) {
    let fechaHoy = new Date(new Date().getTime() + dia * 60 * 60 * 1000 /* Pasa las horas del dia a milisegundos */)
    dia = dia + 24
    mes.push(fechaHoy.toString())
  }


  // Cuando Selecciona lunes
  if (lunes) {


    let turno = document.getElementById('optionTurno').value;
    let cont = 0
    console.log(agenda)
    agenda.forEach(element => {
      if ((element.fecha.split(" ")[0] == "Mon") && (element.turno == turno)) {
        cont = cont + 1
      }
    })
    console.log("contador", cont)
    let clase = document.getElementById('optionClases').value;
    let cupo = 1;
    let nuevaEntrada = []
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Mon") {
        let fecha = mes[index];

        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)

        if (cont >= 3) {
          alert("ya hay algo en esa fecha y horario")
        } else {

          agenda.push(nuevaEntrada);
        }
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }


  if (martes) {


    let turno = document.getElementById('optionTurno').value;
    let cont = 0
    console.log(agenda)
    agenda.forEach(element => {
      if ((element.fecha.split(" ")[0] == "Tue") && (element.turno == turno)) {
        cont = cont + 1
      }
    })
    console.log("contador", cont)
    let clase = document.getElementById('optionClases').value;
    let cupo = 1;
    let nuevaEntrada = []
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Tue") {
        let fecha = mes[index];

        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)

        if (cont >= 3) {
          console.log("ya hay algo en esa fecha y horario")
        } else {

          agenda.push(nuevaEntrada);
        }
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }
  if (miercoles) {


    let turno = document.getElementById('optionTurno').value;
    let cont = 0
    console.log(agenda)
    agenda.forEach(element => {
      if ((element.fecha.split(" ")[0] == "Wed") && (element.turno == turno)) {
        cont = cont + 1
      }
    })
    console.log("contador", cont)
    let clase = document.getElementById('optionClases').value;
    let cupo = 1;
    let nuevaEntrada = []
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Wed") {
        let fecha = mes[index];

        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)

        if (cont >= 3) {
          console.log("ya hay algo en esa fecha y horario")
        } else {

          agenda.push(nuevaEntrada);
        }
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }
  if (jueves) {


    let turno = document.getElementById('optionTurno').value;
    let cont = 0
    console.log(agenda)
    agenda.forEach(element => {
      if ((element.fecha.split(" ")[0] == "Thu") && (element.turno == turno)) {
        cont = cont + 1
      }
    })
    console.log("contador", cont)
    let clase = document.getElementById('optionClases').value;
    let cupo = 1;
    let nuevaEntrada = []
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Thu") {
        let fecha = mes[index];

        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)

        if (cont >= 3) {
          console.log("ya hay algo en esa fecha y horario")
        } else {

          agenda.push(nuevaEntrada);
        }
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }
  if (viernes) {


    let turno = document.getElementById('optionTurno').value;
    let cont = 0
    console.log(agenda)
    agenda.forEach(element => {
      if ((element.fecha.split(" ")[0] == "Fri") && (element.turno == turno)) {
        cont = cont + 1
      }
    })
    let clase = document.getElementById('optionClases').value;
    let cupo = 1;
    let nuevaEntrada = []
    for (let index = 0; index < mes.length; index++) {
      const element = mes[index].split(" ")[0];
      if (element == "Fri") {
        let fecha = mes[index];

        nuevaEntrada = new Agenda(
          fecha, turno, clase, cupo)

        if (cont >= 3) {
          console.log("ya hay algo en esa fecha y horario")
        } else {

          agenda.push(nuevaEntrada);
        }
      }
    }
    localStorage.setItem('agenda', JSON.stringify(agenda));
  } $('#modalCambiarPassword').modal('hide');
  window.location.href = "agenda.html";
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
      alert("clase ya existe");

    }

  } else {
    alert("complete todos los campos")
  }
}

function listarEntradas(indice) {

  let agenda = JSON.parse(localStorage.getItem('agenda'));
  agenda = ordenarAgenda(indice);

  let clases = JSON.parse(localStorage.getItem('clases'));
  // console.log(clases)
  let botonCollapse = ""
  
  for (let index = 0; index < clases.length; index++) {
    const clase = clases[index];
    // console.log(clase)


    botonCollapse += `
    <a class="btn btn-primary" data-toggle="collapse" href="#collapseClases${clase.nombre}" role="button"
    aria-expanded="false" aria-controls="collapseClases${clase.nombre}">
    ${clase.nombre}</a>
    `
    botonCollapse += `
    <div class="collapse" id="collapseClases${clase.nombre}">
    <table class="table table-sm-responsive table-borderless text-left font-weight-bold text-uppercase bg-white text-success mt-3">
    <thead class="thead-light">
    <tr><th>${clase.nombre}</th></tr>
    <th scope="col">Dia</th>
    <th scope="col">Fecha</th>
    <th scope="col">Turno</th>
                <th scope="col">Cupo</th>
    </thead>
    <tbody>
    `
    for (let index = 0; index < agenda.length; index++) {
      const agen = agenda[index];
      
      // console.log(clase)
      if (agenda[index].fecha.split(" ")[0] == "Mon") {
        agen.dia = "Lunes" + " " 
        agen.fecha = agenda[index].fecha.split(" ")[2] + " " + agenda[index].fecha.split(" ")[1]
      }
      if (agenda[index].fecha.split(" ")[0] == "Tue") {
        agen.dia = "Martes" + " " 
        agen.fecha = agenda[index].fecha.split(" ")[2] + " " + agenda[index].fecha.split(" ")[1]
        
      }
      if (agenda[index].fecha.split(" ")[0] == "Wed") {
        agen.dia = "Miercoles" + " " 
        agen.fecha = agenda[index].fecha.split(" ")[2] + " " + agenda[index].fecha.split(" ")[1]
        
      }
      if (agenda[index].fecha.split(" ")[0] == "Thu") {
        agen.dia = "Jueves" + " " 
        agen.fecha = agenda[index].fecha.split(" ")[2] + " " + agenda[index].fecha.split(" ")[1]
        
      }
      if (agenda[index].fecha.split(" ")[0] == "Fri") {
        agen.dia = "Viernes" + " " 
        agen.fecha = agenda[index].fecha.split(" ")[2] + " " + agenda[index].fecha.split(" ")[1]
        
      }
      
      if (clase.nombre == agen.clase) {
        botonCollapse += `<tr><td class="text-justify">${agen.dia}</td><td>${agen.fecha}</td><td>${agen.turno}</td><td><button class= 'btn btn-success' data-target='#modalInscriptos' data-toggle="modal" onClick= 'mostrarInscriptos(${agenda[index].id})'>${agen.cupo - agenda[index].reservado.length}</button> </td>`;
        
      }

    }
    botonCollapse += "</tbody></table>"
    botonCollapse += `</div>`
  }

  document.getElementById('collapseClases').innerHTML = botonCollapse;

}

function ordenarAgenda(indice) {
  let agenda = JSON.parse(localStorage.getItem('agenda'));
  let agendaOrdenada;
  if (indice == 1) {
    agendaOrdenada = agenda.sort(function (a, b) {
      if (new Date(a.fecha).getDate() != new Date(b.fecha).getDate()) {
        if ((new Date(a.fecha)) < (new Date(b.fecha))) {
          return -1;
        } else {
          return 1;
        }
      } else if (a.turno < b.turno) {
        return -1
      }
      else if (a.turno > b.turno) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    agendaOrdenada = agenda.sort(function (a, b) {
      if (a.clase < b.clase) {
        return -1;
      } else if (a.clase > b.clase) {
        return 1;
      } else {
        return 0;
      }
    })
  }

  return agendaOrdenada;
}

function mostrarInscriptos(id){
let tabla = document.getElementById('tablaInscriptos')

let agenda = JSON.parse(localStorage.getItem('agenda'))
if(!agenda){
  agenda = [];
}
let claseAMostrar = agenda.find(clase => clase.id == id)
let contenidoTabla = '';
for (let index = 0; index < claseAMostrar.reservado.length; index++) {
  contenidoTabla += `
  <tr>
  <th class='text-white' scope="row">${claseAMostrar.reservado[index].toUpperCase()}</th>
  </tr>`
}
tabla.innerHTML = contenidoTabla;
}