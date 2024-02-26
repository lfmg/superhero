// 1. Crear la estructura básica para la página web implementando HTML, que incluya un formulario de búsqueda. Utilizar etiquetas semánticas de HTML5 para definir y separar las secciones. (1 Punto)
// 2. Agregar estilos mediante frameworks o librería de CSS, implementando por ejemplo menús de navegación y botones. Los estilos los puedes agregar a tu gusto. Como se muestra en la siguiente imagen de referencia. (1 Punto)
// 3. Una vez ingresado el número del héroe a buscar y después de realizar un click sobre el botón de búsqueda, se debe capturar y validar la información para evitar búsquedas que contengan algún texto diferente a números y mostrar la información dinámicamente mediante la librería jQuery y CanvasJS con un gráfico de pastel. Para lograr todo esto se debe: (8 Puntos)
// 3.1 Capturar la información ingresada mediante eventos del DOM con jQuery. (1 Punto)
// 3.2 Implementar funciones para separar la captura de la información ingresada por el usuario con la consulta a la API. (1 Punto)
// 3.3 Comprobar la información ingresada por el usuario, la cual, solo debe ser un número. (0.5 Puntos)
// 3.4 Consultar la API mediante AJAX con la sintaxis de jQuery. (1 Punto)
// 3.5 Renderizar la información recibida por la API dinámicamente utilizando tarjetas (card) de Bootstrap. (1 Punto)
// 3.7 Emplear la librería de gráficos CanvasJS, para mostrar dinámicamente información específica de cada superhéroe. (2 Puntos)
/* 3.6 Utilizar ciclos y métodos para arreglos u objetos que permitan recorrer, ordenar y mostrar la información. (1 Punto) */
// 3.8 Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda. (0.5 Puntos) 

$(document).ready(function(){ 

     $('#buscarHeroe').on('submit', 
          function(event){
               event.preventDefault();  
               var superheroId = $("#superId").val();
               superheroId = parseInt(superheroId);

               if ( superheroId >= 733 ) { 
                    $('#alerta').html('<p>El número ingresado dede ser mayor que cero y menor que 733</p>');
                    console.log(superheroId)
               } else { };
               
               if ( superheroId < 733 ) { 

     const url = 'https://superheroapi.com/api/4905856019427443/'; 
     const corsProxyUrl = 'https://fixcors.site/';
     const apiUrl = `${corsProxyUrl}${url}${superheroId}`; 


          $.ajax({
               type:"GET",
               url: apiUrl, //corsProxyUrl + url, //apiUrl,
               dataType:"json",
               success: function(datosApi) {
                    //si todo sale bien, se agrega la funcionalidad aquí.
                    //console.log(datosApi);
                    $('#titulo-biografia').html(`Superhéroe Encontrado: ${datosApi.name}`);
                    $('#superFoto').html(`<img id="superFoto" src="${datosApi.image.url}" alt="">`);
                    $('#bio').html(`<ul class="list-group">
                    <li class="list-group-item">Conexiones: ${datosApi.connections["group-affiliation"]}</li>
                    <li class="list-group-item">Publicado por: ${datosApi.biography.publisher}</li>
                    <li class="list-group-item">Ocupación: ${datosApi.work.occupation}</li>
                    <li class="list-group-item">Primera Aparición: ${datosApi.biography["first-appearance"]}</li>
                    <li class="list-group-item">Altura: ${datosApi.appearance.height}</li>
                    <li class="list-group-item">Peso: ${datosApi.appearance.weight}</li>
                    <li class="list-group-item">También se le conoce como: ${datosApi.biography.aliases}</li>
                    </ul>`);
                    
                    $('#titulo-poderes').html(`Superpoderes`);
                    let powers = '<ul class="list-group">';
                    $.each(datosApi.powerstats, function (ind, elem) { 
                         powers += `<li class="list-group-item"> ${ind} : ${elem}`;
                       });
                    powers += '</ul>';
                    $('#poderes').html(powers);
                    
                    $( "li" ).filter( ":odd" ).css('background-color','#f8f8f8');

                    //let poderes = datosApi.powerstats;
                    //console.log(poderes.speed);

                    var options = {
                         animationEnabled: true,
                         theme: "light2",
                         title: { text: "" },
                         axisY: {
                              tickThickness: 0,
                              lineThickness: 0,
                              valueFormatString: " ",
                              includeZero: true,
                              gridThickness: 0                    
                         },
                         axisX: {
                              tickThickness: 0,
                              lineThickness: 0,
                              labelFontSize: 14,
                              labelFontColor: "#000000",
                              labelFontFamily: "Montserrat",			
                         },
          
                         data: [{ 
                              indexLabelFontSize: 16,
                              toolTipContent: '',
                              indexLabelPlacement: "inside",
                              indexLabelFontColor: "white",
                              indexLabelFontWeight: 500,
                              indexLabelFontFamily: "Montserrat",
                              color: "#D20002",
                              type: "bar",
                              dataPoints: [
                                   { y: parseInt(datosApi.powerstats.combat), label: (`Capacidad combativa: ${datosApi.powerstats.combat}%`), indexLabel: "Capacidad combativa" },
                                   { y: parseInt(datosApi.powerstats.power), label: (`Poder: ${datosApi.powerstats.power}%`), indexLabel: "Poder" },
                                   { y: parseInt(datosApi.powerstats.durability), label: (`Resistencia: ${datosApi.powerstats.durability}%`), indexLabel: "Resistencia" },
                                   { y: parseInt(datosApi.powerstats.speed), label: (`Velocidad: ${datosApi.powerstats.speed}%`), indexLabel: "Velocidad" },
                                   { y: parseInt(datosApi.powerstats.strength), label: (`Fortaleza: ${datosApi.powerstats.strength}%`), indexLabel: "Fortaleza" },
                                   { y: parseInt(datosApi.powerstats.intelligence), label: (`Inteligencia: ${datosApi.powerstats.intelligence}%`), indexLabel: "Inteligencia" },
                              ],
                         }] }; 

                         
                              $("#chartContainer").CanvasJSChart(options);


                    },                 

               error: function(datosApi) {
                    $('#titulo-biografia').html('Superhéroe No Encontrado');
                    //console.log('no se encontró superhéroe con ese ID');
                    },
               }); // cierra llamado ajax

          };
 
          }); // cierra evento buscar

}); // Cierra document.ready