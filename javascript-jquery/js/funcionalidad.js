$(document).ready(function() {

    $("#tarea").on("focus", function(e) {
        $(this).css("background-color", "yellow");
    });

    $("#editar").on("mouseenter", function(e) {
        $(this).css("text-transform", "uppercase")
    });


    $("#editar").on("click", function(e) {
        var txt = $(this).text();

        if (txt === "Editar") {
            $(this).text("Finalizar");
            $("#agregar").removeAttr("disabled");
            $("#tarea").css("boder", "1px solid red");
        } else {
            $(this).text("Editar");
            $("#agregar").attr("disabled", "disable");
        }

    });

    $('#agregar').on("click", function(e){
        var t = $("#tarea").val();
    $('#cosas').append("<li>" + t + "</li>");
    })
});

   $("#lista").on("DOMSubtreeModified",function(){
       $("#lista>li").on("click",function(e){
           $("#realizadas").append(this);
       });

    
   });
