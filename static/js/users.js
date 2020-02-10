function listarClasesDisponibles() {

    let agenda = JSON.parse(localStorage.getItem('agenda'))

    let tablaBody = ""

    for (let i = 0; i < agenda.length; i++) {

        
        let hoy = new Date()
        var manana=new Date(hoy.getTime() + 24*60*60*1000)
        let nombres_dias = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')
        let dias = agenda[i];
        let newFecha = new Date(dias.fecha);
        console.log(manana);
        console.log(newFecha);

        if (manana.getDate() == newFecha.getDate() ) {
            
            tablaBody += `<tr>
                            <th scope="row">${dias.clase}</th>
                            <td>${nombres_dias[newFecha.getDay()]} ${newFecha.getDate()} de ${newFecha.getFullYear()} </td>
                            <td>${dias.turno}</td>
                          </tr>`
        }
    
    }



    document.getElementById('ClasesDisponibles').innerHTML = tablaBody;


}