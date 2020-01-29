class Agenda {

  constructor(fecha, turno, clase, cupo) {


    this.fecha = fecha;
    this.turno = turno;
    this.clase = clase;
    this.cupo = cupo;
  }
}

function fechaHoy() {
  // var hoy = new Date(new Date().getTime() + 144 * 60 * 60 * 1000)
  var hoy = new Date()
  var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + 'hs-' + hoy.getMinutes() + 'min';
  var fechaHora = fecha + ' ' + hora;

  // console.log(hoy.toString().split(' ')[0])
  // console.log(hoy.toString().split(' '))

  // return fechaHora;
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
  console.log(agenda)
  for (let index = 0; index < agenda.length; index++) {
    const element = agenda[index];
    console.log(element.fecha.split(" ")[0], element.turno)
    
  }
  if (!agenda) {
    agenda = []
  };

  let lunes = document.getElementById('lunes').checked;
  let martes = document.getElementById('martes').checked;
  let miercoles = document.getElementById('miercoles').checked;
  let jueves = document.getElementById('jueves').checked;
  let viernes = document.getElementById('viernes').checked;
  let dia = 24
  let semana = []
  for (let index = 0; index < 30; index++) {


    let fechaHoy = new Date(new Date().getTime() + dia * 60 * 60 * 1000)
    let nameDay = fechaHoy.toString().split(" ")[0]
    dia = dia + 24
    semana.push(fechaHoy.toString())

  }
  if (lunes) {

    for (let index = 0; index < semana.length; index++) {
      const element = semana[index].split(" ")[0];
      if (element == "Mon") {

        let fecha = semana[index];
        let turno = document.getElementById('optionTurno').value;
        let clase = document.getElementById('optionClases').value;
        let cupo = 10;



        let nuevaEntrada = new Agenda(
          fecha,
          turno,
          clase,
          cupo
        )

        agenda.push(nuevaEntrada);
        localStorage.setItem('agenda', JSON.stringify(agenda));
      }

    }
  }

  if (martes) {

    for (let index = 0; index < semana.length; index++) {
      const element = semana[index].split(" ")[0];
      if (element == "Tue") {

        let fecha = semana[index];
        let turno = document.getElementById('optionTurno').value;
        let clase = document.getElementById('optionClases').value;
        let cupo = 10;



        let nuevaEntrada = new Agenda(
          fecha,
          turno,
          clase,
          cupo
        )

        agenda.push(nuevaEntrada);
        localStorage.setItem('agenda', JSON.stringify(agenda));
      }

    }
  }
  if (miercoles) {

    for (let index = 0; index < semana.length; index++) {
      const element = semana[index].split(" ")[0];
      if (element == "Wed") {

        let fecha = semana[index];
        let turno = document.getElementById('optionTurno').value;
        let clase = document.getElementById('optionClases').value;
        let cupo = 10;



        let nuevaEntrada = new Agenda(
          fecha,
          turno,
          clase,
          cupo
        )

        agenda.push(nuevaEntrada);
        localStorage.setItem('agenda', JSON.stringify(agenda));
      }

    }
  }
  if (jueves) {

    for (let index = 0; index < semana.length; index++) {
      const element = semana[index].split(" ")[0];
      if (element == "Thu") {

        let fecha = semana[index];
        let turno = document.getElementById('optionTurno').value;
        let clase = document.getElementById('optionClases').value;
        let cupo = 10;



        let nuevaEntrada = new Agenda(
          fecha,
          turno,
          clase,
          cupo
        )

        agenda.push(nuevaEntrada);
        localStorage.setItem('agenda', JSON.stringify(agenda));
      }

    }
  }
  if (viernes) {

    for (let index = 0; index < semana.length; index++) {
      const element = semana[index].split(" ")[0];
      if (element == "Fri") {

        let fecha = semana[index];
        let turno = document.getElementById('optionTurno').value;
        let clase = document.getElementById('optionClases').value;
        let cupo = 10;



        let nuevaEntrada = new Agenda(
          fecha,
          turno,
          clase,
          cupo
        )

        agenda.push(nuevaEntrada);
        localStorage.setItem('agenda', JSON.stringify(agenda));
      }

    }
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
