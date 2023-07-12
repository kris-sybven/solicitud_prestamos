window.addEventListener("load", loadData);
HOST = window.location.host; //configuracion de ruta http://localhost:4004/odata/v4/dataprestamos/prestamos
var conteoNatural = "";
var conteoJuridica = "";

function loadData() {
  //trae la data del servicio con un get
  $.get(
    "http://" + HOST + "/prestamo/prestamoSrv",
    (data, status) => {
        console.log("kacm "+data);
        contarTipoPersona(data);
      dona();
    }
  );
}

function contarTipoPersona(data) {
  var contador = 0;
  var contadorJ = 0;
  // Recorrer el arreglo de objetos
  for (var i = 0; i < data.value.length; i++) {
    var registro = data.value[i];
    // Verificar si la propiedad "tipopersona" tiene el valor "natural"
    if (registro.tipoPersona === "Natural") {
      contador++;
    }else if(registro.tipoPersona === "Juridico"){
        contadorJ++;
    }
  }
  // Mostrar el resultado
  console.log(
    "Número de registros que tienen 'ejemplo' en la propiedad 'nombre': " +
      contador
  );

  document.getElementById("cuentaNatural").innerHTML = contador;
  conteoNatural = contador;
  document.getElementById("cuentaJuridica").innerHTML = contadorJ;
  conteoJuridica = contadorJ;
}

function dona() {
  //////////////CODIGO DE LLENADO DE DONA
  // Obtén una referencia al elemento de lienzo
  var donaCanvas = document.getElementById("donaChart");

  // Configura los datos del gráfico
  var datos = {
    labels: ["Persona Natural", "Persona Juridica"],
    datasets: [
      {
        data: [conteoNatural, conteoJuridica],
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  };

  // Configura las opciones del gráfico
  var opciones = {
    responsive: true,
  };

  // Crea el gráfico de dona
  var donaChart = new Chart(donaCanvas, {
    type: "doughnut",
    data: datos,
    options: opciones,
  });
}

