class MeteoJSON{

    constructor(ciudad){

        this.apiKey =  "0419435f3a38309de9ce2dbb51426449";
        this.ciudad = ciudad;
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad  + this.unidades + this.idioma + "&APPID=" + this.apiKey;
        this.datos;
        this.error = "<h2>¡Problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
        this.executed = false;

    }


    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    this.datos = datos;
                
                    var listaDatos = "<ol><li><ul><li>Ciudad: " + datos.name + "</li>";
                    listaDatos += "<li>País: " + datos.sys.country + "</li>";
                    listaDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                    listaDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                    listaDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                    listaDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                    listaDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                    listaDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                    listaDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                    listaDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                    listaDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                    listaDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                    listaDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                    listaDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                    listaDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                    listaDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                    listaDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                    listaDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li>";
                    listaDatos += "<li><img src=\"https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png\" alt=\"Icono del tiempo\"></li></ul></li></ol>";
                $("h2:last").after(listaDatos);
            }, 
            error: function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
               
            }
          
        });
    }


}


class ArrayCiudades{

    constructor(array){
        this.ciudades = array;
    }


    mostrarTodas(){

        if(!this.executed){

            let i = 0;

            for(i = 0; i<this.ciudades.length ; i++){
                this.ciudades[i].cargarDatos();
            }
        }

        
        this.executed = true;
        

    }
}

		


var oviedo = new MeteoJSON("Oviedo");
var leon = new MeteoJSON("León");
var madrid = new MeteoJSON("Madrid");
var barcelona = new MeteoJSON("Barcelona");
var gijon = new MeteoJSON("Gijón")

var clusterCiudades = new ArrayCiudades([oviedo,leon,madrid,barcelona,gijon]);