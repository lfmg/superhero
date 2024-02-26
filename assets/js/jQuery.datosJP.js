jQuery.fn.datosJP = function() {

     var element = this;
     $.ajax({        
          type: "GET",
          url: "https://jsonplaceholder.typicode.com/users",
          dataType: "json",
          success: function(data){
               data.forEach(datos => {
                    element.append(`<p>${datos.id} - ${datos.email} - ${datos.address.city}</p>`)
               })
          },
          error: {

          },
     })
     return this;

}