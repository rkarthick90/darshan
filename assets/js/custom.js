$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").addClass("toggled");
}).blur(function(e){
    e.preventDefault();
    $("#wrapper").removeClass("toggled");
});