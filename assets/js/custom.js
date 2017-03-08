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

    // $(document).off('click', '[data-sub-tile]');
    // $(document).on('click', '[data-sub-tile]', function(){
    //     var temp = $(this).attr('data-sub-tile');
    // });

    $(document).on('click', '[data-add-cart]', function(e){
        e.preventDefault();
    });

    // language selection
    $(document).off('change', '#selectlang');
    $(document).on('change', '#selectlang', function(){
        pageRedirect($(this).val());
    });

    $(document).off('click','[data-target-menu]');
    $(document).on('click','[data-target-menu]', function(){
        pageRedirect('submenu');
    });
});

function pageRedirect(arg){
    switch(arg){
        case 'menu':
            location.href = 'menu.html';
            break;
        case 'English':
            location.href = "login.html";
            break;
        case 'submenu':
            location.href = "submenu.html";
            break;
        default:
            location.href = "/";
            break;
    }
}