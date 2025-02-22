window.addEventListener("load", loadData);
HOST = window.location.host;

function loadData(){

    $.get("http://"+HOST+"/prestamo/prestamoSrv", (data, status) => {
        //console.log(data);
        cargarDataPrestamoget(data);
    });
}

function setSelection(aux,inten){
    switch (inten) {
        case "Edit" :
            document.getElementById("tileModal").innerHTML = "Editar Solicitud de Prestamos";
            document.getElementById("btnTitleModal").innerHTML = "Editar Solicitud de Prestamos";
            $.get("http://"+HOST+"/prestamo/prestamoSrv/"+aux.trim(), (data, status) => {
                setDataModal(data);
            });
            break;
        default :
            //Crear
            document.getElementById("tileModal").innerHTML = "Solicitud de Prestamos";
            document.getElementById("btnTitleModal").innerHTML = "Crear";
            document.getElementById("btnTitleModal").onclick = crearRegistro;
            break;
    }
}

function deleteConfirm(id, method, nombre, apellido) {
    
    msg = "Estas seguro que quieres eliminar el registro de: " + nombre + " " + apellido;
    if (confirm(msg) == true){
        RequestJSON(method, {"ID":id}, function (res) {
            alert("Registro eliminado con exito");
            loadData();
        })
    }

}

function editarPrestamo() {
    var idPrestamoInput = document.getElementById("id_prestamo").value;
    var nombreInput = document.getElementById("nombre").value;
    var apellidoInput = document.getElementById("apellido").value;
    var DniInput = document.getElementById("dni").value;
    var EmailInput = document.getElementById("email").value;
    var tipoPersonaInput = document.getElementById("tipoPersona").value;
    var salarioMensualInput = document.getElementById("salarioMensual").value;
    var montoPrestamoInput = document.getElementById("montoPrestamo").value;
    var obj = {
        "ID" : idPrestamoInput,
        "nombre" : nombreInput,
        "apellido" : apellidoInput,
        "dni" : parseInt(DniInput),
        "email" : EmailInput,
        "tipoPersona" : tipoPersonaInput,
        "salarioMensual" : parseFloat(salarioMensualInput),
        "montoPrestamo"  : parseFloat(montoPrestamoInput)
    }

    RequestJSON("PUT",obj, function(res){
        loadData();
        document.getElementById("cerrarModal").click();
    });    
}

function crearRegistro() {

    var nombreInput = document.getElementById("nombre").value;
    var apellidoInput = document.getElementById("apellido").value;
    var DniInput = document.getElementById("dni").value;
    var EmailInput = document.getElementById("email").value;
    var tipoPersonaInput = document.getElementById("tipoPersona").value;
    var salarioMensualInput = document.getElementById("salarioMensual").value;
    var montoPrestamoInput = document.getElementById("montoPrestamo").value;

    var obj = {
        "nombre" : nombreInput,
        "apellido" : apellidoInput,
        "dni" : parseInt(DniInput),
        "email" : EmailInput,
        "tipoPersona" : tipoPersonaInput,
        "salarioMensual" : parseFloat(salarioMensualInput),
        "montoPrestamo"  : parseFloat(montoPrestamoInput)
    }

    RequestJSON("POST",obj, function(res){
        loadData();
        document.getElementById("cerrarModal").click();
    });
    
}


async function RequestJSON(method, data, callBack) {
    var endPoint = "";
    switch (method) {
        case "PUT":
            endPoint = "http://" + HOST + "/prestamo/prestamoSrv/" + data.ID.trim();
            break;
        case "DELETE":
            endPoint = "http://" + HOST + "/prestamo/prestamoSrv/" + data.ID.trim();
            break;
        default:
            endPoint = "http://"+HOST+"/prestamo/prestamoSrv";
            break;
    }

    try{
        const response = await fetch(endPoint, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        callBack();
    } catch (error) {
        console.log("Error: ", error);
        callBack({"Error: ":"Falla de servicio"});
    }
}

function setDataModal (data) {
    console.log()
    var idPrestamoInput = document.getElementById("id_prestamo");
    var nombreInput = document.getElementById("nombre");
    var apellidoInput = document.getElementById("apellido");
    var DniInput = document.getElementById("dni");
    var emailInput = document.getElementById("email");
    var tipoPersonaInput = document.getElementById("tipoPersona");
    var salarioMensualInput = document.getElementById("salarioMensual");
    var montoPrestamoInput = document.getElementById("montoPrestamo");

    idPrestamoInput.value = data.ID;
    nombreInput.value = data.nombre;
    apellidoInput.value = data.apellido;
    DniInput.value = parseInt(data.dni);
    emailInput.value = data.email;
    tipoPersonaInput.value = data.tipoPersona;
    salarioMensualInput.value = parseFloat(data.salarioMensual);
    montoPrestamoInput.value = parseFloat(data.montoPrestamo);

}

function cargarDataPrestamoget(data){

    var item = '<tr>' +
                    '<td>{{Nombre}}</td>' +
                    '<td>{{Apellido}}</td>' +
                    '<td>{{DNI}}</td>' +
                    '<td>{{Email}}</td>' +
                    '<td>{{TipoPersona}}</td>' +
                    '<td>{{salarioMensual}}</td>' +
                    '<td>{{MontoPrestamo}}</td>' +
                    '<td>' +
                        '<a href="#" class="edit" title="Edit" data-toggle="modal" data-target="#editPrestamo" onclick="setSelection(\' {{ID}} \',\'Edit\')"><i class="material-icons">&#xE254;</i></a>' +
                        '<a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons" onclick="deleteConfirm(\' {{ID}} \',\'DELETE\',\'{{Nombre}}\',\'{{Apellido}}\')">&#xE872;</i></a>' +
                    '</td>' +
                '</tr>';
    var objArray=[];
    data.value.forEach(element => {
        let aux = item;
        aux = aux.replaceAll("{{ID}}", element.ID);
        aux = aux.replaceAll("{{Nombre}}", element.nombre);
        aux = aux.replaceAll("{{Apellido}}", element.apellido);
        aux = aux.replace("{{DNI}}", element.dni);
        aux = aux.replace("{{Email}}", element.email);
        aux = aux.replace("{{TipoPersona}}", element.tipoPersona);
        aux = aux.replace("{{salarioMensual}}", element.salarioMensual);
        aux = aux.replace("{{MontoPrestamo}}", element.montoPrestamo);
        objArray.push(aux);
    });
    document.getElementById("dataPrestamo").innerHTML = objArray.join("");

}