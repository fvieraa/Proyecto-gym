function listarClasesDisponibles() {

    let agenda = JSON.parse(localStorage.getItem('agenda'))
    let sesiones = JSON.parse(localStorage.getItem('sesiones'))
    let usuarioActivo = sesiones[0].usuario

    let tablaBody = ""
    if (sesiones[0].estado) {

        let maniana = moment(new Date()).add(1, 'days')
        let nombres_dias = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')
        var nombres_meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre')
        let dia = moment(maniana).date()
        let mes = moment(maniana).month()
        let anio = moment(maniana).year()

        for (let i = 0; i < agenda.length; i++) {

            let actividad = agenda[i];
            let newFecha = new Date(actividad.fecha);
            let reservado = false
            if (actividad.reservado.length) {
                let encontrado = actividad.reservado.find(e => e == usuarioActivo)
                if(encontrado){
                    reservado= true
                    

                }
            }


            if ((dia == moment(newFecha).date()) && (mes == moment(newFecha).month()) && (anio == moment(newFecha).year())) {

                if (reservado) {
                    tablaBody += `<tr>
                <th scope="row">${actividad.clase}</th>
                <td>${nombres_dias[newFecha.getDay()]} ${newFecha.getDate()} de ${nombres_meses[newFecha.getMonth()]} de ${newFecha.getFullYear()} </td>
                <td>${actividad.turno}</td>
                <td><button type="button" onclick="cancelarReserva('${usuarioActivo}',${i})" class="btn btn-warning">Cancelar</button></td>
                </tr>`
                } else {


                    tablaBody += `<tr>
                <th scope="row">${actividad.clase}</th>
                <td>${nombres_dias[newFecha.getDay()]} ${newFecha.getDate()} de ${nombres_meses[newFecha.getMonth()]} de ${newFecha.getFullYear()} </td>
                <td>${actividad.turno}</td>
                <td><button type="button" onclick="reservarClase('${newFecha}','${actividad.turno}','${actividad.clase}')" class="btn btn-primary">Reservar</button></td>
                </tr>`
                }
            }

        }

        document.getElementById('ClasesDisponibles').innerHTML = tablaBody;
    } else {

        tablaBody += '<tr><td><h1>NO ESTAS HABILITADO PARA INSCRIBIRTE A LAS CLASES</h1></td></tr>'


        document.getElementById('ClasesDisponibles').innerHTML = tablaBody;

    }


}
function cancelarReserva(usuarioActivo, i) {

    let agenda = JSON.parse(localStorage.getItem('agenda'))

    for (let index = 0; index < agenda[i].reservado.length; index++) {
        const element = agenda[i].reservado[index];

        if (element == usuarioActivo) {

            agenda[i].reservado.splice(index, 1)


            localStorage.setItem('agenda', JSON.stringify(agenda));

            listarClasesDisponibles()


        }
        alert("Su turno ha sido cancelado")
    }
    


}
function reservarClase(fechaClase, turnoClase, Clase) {

    let agenda = JSON.parse(localStorage.getItem('agenda'))
    let sesiones = JSON.parse(localStorage.getItem('sesiones'))
    let indiceClase = agenda.findIndex(f => (moment(f.fecha).format('YYYYMMDD') == moment(fechaClase).format('YYYYMMDD')) && (f.turno == turnoClase) && (f.clase == Clase))
    let reservas = agenda[indiceClase].reservado
    let usuarioSesionado = sesiones[0].usuario
    let usuarioConReserva = agenda[indiceClase].reservado.find(f => f == usuarioSesionado)

    if (usuarioSesionado != usuarioConReserva) {
        if ((reservas.length < agenda[indiceClase].cupo)) {

            agenda[indiceClase].reservado.push(usuarioSesionado)
            localStorage.setItem('agenda', JSON.stringify(agenda));
            // alert("Turno reservado")
            listarClasesDisponibles()



        } else {
            alert("Ya esta lleno el cupo de esta clases")
        }
    } else {
        alert("Ya reservaste el turno")
    }

}