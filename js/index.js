//controla elementos de tooltip y popover
//script para hacer funcionar el tooltip 
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover({
        placement: "right",
        trigger: "hover"
        })

    $('.carousel').carousel({
        interval: 5000
        })
})

//funcion que controla eventos del modal

$(function (){
    $('#exampleModalCenter').on('show.bs.modal', function(e){
        console.log('el modal suscribirse se esta mostrando show');
        $('#suscripcionbtn').removeClass('btn-primary')
        $('#suscripcionbtn').addClass('btn-info')
        $('#suscripcionbtn').css({'background-color':'rgb(156, 122, 189)'})
        $('#suscripcionbtn').prop('disabled',true)
        })
    $('#exampleModalCenter').on('shown.bs.modal', function(e){
        console.log('el modal suscribirse se esta mostrando shown');
        })
        
    $('#exampleModalCenter').on('hide.bs.modal', function(e){
        console.log('el modal suscribirse se esta cerrando hide');
        })
        
    $('#exampleModalCenter').on('hidden.bs.modal', function(e){
        console.log('el modal suscribirse se esta cerrando hidden');
        
        $('#suscripcionbtn').prop('disabled',false)
        $('#suscripcionbtn').removeClass('btn-info')
        $('#suscripcionbtn').addClass('btn-primary')
        $('#suscripcionbtn').css({'background-color':'#B6E6DE'})
        })

        
})