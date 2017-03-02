$(document).ready(function(){
    // toggle on left side
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").addClass("toggled");
    }).blur(function(e){
        e.preventDefault();
        $("#wrapper").removeClass("toggled");
    });


    //tab content based on button click
    $(document).off('click','.menucont [data-tab-btn]');
    $(document).on('click','.menucont [data-tab-btn]', function(){
        $('[data-tab-btn]').removeClass('active')
        $(this).addClass('active');
        var clicked = $(this).attr('data-tab-btn');
        $('.tabcontent [data-tab-content]').fadeOut();
        $('.tabcontent [data-tab-content="'+clicked+'"]').fadeIn();
    });
    
    $(document).off('click', '[data-main-tile]');
    $(document).on('click', '[data-main-tile]', function(){
        var temp = $(this).attr('data-main-tile');
        pageRedirect(temp);
    });

    $(document).off('click', '[data-sub-tile]');
    $(document).on('click', '[data-sub-tile]', function(){
        var temp = $(this).attr('data-sub-tile');
        pageRedirect('detail');
    });
});

function pageRedirect(arg){
    switch(arg){
        case 'menu':
            location.href = 'pages/menu.html';
            break;
        case 'detail':
            location.href = "pages/detail.html";
            break;
        default:
            location.href = "/";
            break;
    }
}