var itemArrObj=[];
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

    //add cart button from tile itself
    $(document).off('click', '[data-add-cart]')
    $(document).on('click', '[data-add-cart]', function(e){
        e.preventDefault();
        e.stopPropagation();
        var tabName = $("[data-tab-btn].active").attr('data-tab-btn');
        var cartId = $(this).attr('data-add-cart');
        var cartData;
        if(tabName == 'Perishable') {
        	cartData = perishableData;
        } else {
        	cartData = nonPerishableData;
        }
        console.log(cartData[cartId].productname);
        var item = cartData[cartId].productname;
        var price = cartData[cartId].price;
        var existvalue = $('[data-order-count]').text();
        $('[data-order-count]').text(parseInt(existvalue)+1);
        var itemExistVal = checkItemExist(item); 
        if(itemExistVal == 'notfound'){
        	var qty = 1;
        } else {
        	var qty = parseInt(itemArrObj[itemExistVal].qty + 1); 
        }
        addToCart(item, qty , price);
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
    
    //When tile click modal get shown with dynamic details for perishable
    $(document).off('click', '[data-sub-tile]')
    $(document).on('click', '[data-sub-tile]', function(){
    	var itemId = $(this).attr('data-sub-tile');
    	console.log("Perishable Data - ", perishableData[itemId].productname);
    	var modal = $('#infomodal');
    	
    	modal.find("[data-prasad-name]").text(perishableData[itemId].productname);
    	modal.find("[data-prasad-desc]").text(perishableData[itemId].productdesc);
    	modal.find("[data-prasad-img]").attr('src', perishableData[itemId].imagename);
    	modal.find("[data-prasad-price]").text(perishableData[itemId].price);
    	modal.modal();
    });
    
    //When tile click modal get shown with dynamic details for non perishable
    $(document).off('click', '[data-sub-tile-non]')
    $(document).on('click', '[data-sub-tile-non]', function(){
    	var itemId = $(this).attr('data-sub-tile-non');
    	console.log("Non Perishable Data - ", nonPerishableData[itemId].productname);
    	var modal = $('#infomodal');
    	
    	modal.find("[data-prasad-name]").text(nonPerishableData[itemId].productname);
    	modal.find("[data-prasad-desc]").text(nonPerishableData[itemId].productdesc);
    	modal.find("[data-prasad-img]").attr('src', nonPerishableData[itemId].imagename);
    	modal.find("[data-prasad-price]").text(nonPerishableData[itemId].price);
    	modal.modal();
    });

    //when add to cart icon click from modal this function get called
    $(document).off('click', '[data-custom-cart]');
    $(document).on('click', '[data-custom-cart]', function(){
    	var modal = $('#infomodal');
    	var table = $('[data-order-list]');
    	var qty = parseInt(modal.find('#qty').val());
    	var existvalue = $('[data-order-count]').text();
    	var item = modal.find("[data-prasad-name]").text();
    	var price = modal.find("[data-prasad-price]").text();
    	$('[data-order-count]').text(parseInt(existvalue)+parseInt(qty));
    	var itemExistVal = checkItemExist(item); 
        if(itemExistVal == 'notfound'){
        	var qty = qty;
        } else {
        	var qty = parseInt(itemArrObj[itemExistVal].qty + qty); 
        }
        addToCart(item, qty , price);
        modal.modal('hide');
        $("select").each(function() { this.selectedIndex = 0 });
    });
    
    //when cart icon click this function get called
    $(document).off('click', '[data-cart]')
    $(document).on('click', '[data-cart]', function(){
    	var table = $('[data-order-list]');
    	table.find('tbody').empty();
    	var totalPrice = 0;
    	for(var i=0; i<itemArrObj.length; i++){
        	totalPrice += itemArrObj[i].price;
    		table.find('tbody').append('<tr><td>'+ itemArrObj[i].name +'</td><td>'+ itemArrObj[i].qty +'</td></tr>')
    	}
        $('[data-total-order]').text(totalPrice);
    });
    
});

//reusable for checking item exist
function checkItemExist(item){
	if(itemArrObj.length){
		for(var i=0; i<itemArrObj.length; i++){
	    	if(itemArrObj[i].name == item){
	    		return i;
	    	} 
	    }
		return 'notfound';
	} else {
		return 'notfound';
	}
	
}

//function for adding items to cart
function addToCart(item, qty, price) {
	var itemObj = {};
    var itemExistVal = checkItemExist(item);
    
    if( itemExistVal!= 'notfound'){
    	itemArrObj[itemExistVal].qty = qty;
    	itemArrObj[itemExistVal].price = Math.floor(price*qty);
    } else {
    	itemObj.name = item;
        itemObj.qty = qty;
        itemObj.price = Math.floor(price*qty);
        itemArrObj.push(itemObj);
    }
}

//page redirection based on url
function pageRedirect(arg){
    switch(arg){
        case 'menu':
            location.href = 'menu.html';
            break;
        case 'English':
            location.href = "pages/home.html";
            break;
        case 'submenu':
            location.href = "submenu.html";
            break;
        default:
            location.href = "/";
            break;
    }
}