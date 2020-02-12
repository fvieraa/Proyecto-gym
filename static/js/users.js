function listarClasesDisponibles() {

    let agenda = JSON.parse(localStorage.getItem('agenda'))

    let tablaBody = ""
    let hoy = moment(new Date()).add(1,'days')
    let nombres_dias = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')
    var nombres_meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre')
    /* var manana = new Date(hoy.getTime() + 24*60*60*1000) */
    let dia = moment(hoy).date()
    let mes = moment(hoy).month()
    let anio = moment(hoy).year()
    
    console.log(dia);
    console.log(mes);
    console.log(anio);
    
    for (let i = 0; i < agenda.length; i++) {
        
        let actividad = agenda[i];
        let newFecha = new Date(actividad.fecha);
        console.log(moment(newFecha).date());
        console.log(moment(newFecha).month());
        console.log(moment(newFecha).year());
    
       
        if ( ( dia == moment(newFecha).date() ) && ( mes == moment(newFecha).month() ) && ( anio == moment(newFecha).year() ) ) {
            
            console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            tablaBody += `<tr>
                            <th scope="row">${actividad.clase}</th>
                            <td>${nombres_dias[newFecha.getDay()]} ${newFecha.getDate()} de ${nombres_meses[newFecha.getMonth()+1]} de ${newFecha.getFullYear()} </td>
                            <td>${actividad.turno}</td>
                            <td><button type="button" class="btn btn-primary">Reservar</button></td>
                          </tr>`
        } else {
            console.log("no pasa nada");
        }
    
    }



    document.getElementById('ClasesDisponibles').innerHTML = tablaBody;


}