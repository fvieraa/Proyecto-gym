function proximasClases() {

    let fechaMañana = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 /* Pasa las horas del dia a milisegundos */)
    let mañana = fechaMañana.toString().split(" ")[2] + " " + fechaMañana.toString().split(" ")[1]
    
    let contenidoMañana = "";
    contenidoMañana += `<h5>Mañana : ${mañana}</h5>`
    let agenda = JSON.parse(localStorage.getItem('agenda'))

    for (let index = 0; index < agenda.length; index++) {
        const element = agenda[index];

        if (element.fecha.split(" ")[0] == fechaMañana.toString().split(" ")[0] && element.fecha.split(" ")[1] == fechaMañana.toString().split(" ")[1] && element.fecha.split(" ")[2] == fechaMañana.toString().split(" ")[2]) {

          contenidoMañana += `<h6>${element.clase} ${element.turno}</h6>`
        }

    }
    
    document.getElementById('mañana').innerHTML = contenidoMañana;


}