/**
 * Product fetching functions
 */

var productData;

$(document).ready(function(){
	loadProducts();
});

function togglePerish() {
	var percols = document.getElementsByClassName('perishable');
	for (i = 0; i < percols.length; i++) {
		percols[i].style.visibility = 'visible';
	}
	/*var perols = $(".perishable");
	var perColslen = percols.length;
	for(var i= 0; i < perColslen; i++){
		percols[i].removeClass('hide');
	}*/
	var nonpercols = document.getElementsByClassName('nonperishable');
	for (i = 0; i < nonpercols.length; i++) {
		nonpercols[i].style.visibility = 'hidden';
	}
}

function toggleNonPerish() {
	var nonpercols = document.getElementsByClassName('nonperishable');
	for (i = 0; i < nonpercols.length; i++) {
		nonpercols[i].style.visibility = 'visible';
	}
	var percols = document.getElementsByClassName('perishable');
	for (i = 0; i < percols.length; i++) {
		percols[i].style.visibility = 'hidden';
	}
}

function addToCart(productid, productname) {
	alert(productid + " --- " + productname);
}

function generatePerish(perish) {
	var productName = '';
	var tag = '<div class="tiles-cont">';
	for (var i = 0; i < perish.length; i++) {
		productName = perish[i].productname;
		if (i % 2 == 0) {
			tag += '<div class="sub-tiles perishable" id="test-sub"><div class="row"><div class="col-xs-6 m_both"><div class="tile tile-small bg-laddu disp-table" style="background:url('
					+ perish[i].imagename
					+ ') center no-repeat" data-sub-tile="'+i+'" data-toggle="modal" data-target="#infomodal"><h3 class="title table-cell vert-middle"> '
					+ productName
					+ ' </h3><div class="price-cart"><span class="amount"> $ '
					+ perish[i].price
					+ ' </span><a class="btn btn-info cart-btn" data-add-cart="'
					+ i
					+ '"> ADD TO CART </a><input type="hidden" id="isPerish" value="'
					+ perish[i].perishable + '"></div></div></div>';
		} else {
			tag += '<div class="col-xs-6 m_both"><div class="tile tile-small bg-laddu disp-table" style="background:url('
					+ perish[i].imagename
					+ ') center center no-repeat" data-sub-tile="'+i+'" data-toggle="modal" data-target="#infomodal"><h3 class="title table-cell vert-middle"> '
					+ productName
					+ ' </h3><div class="price-cart"><span class="amount"> $ '
					+ perish[i].price
					+ ' </span><a class="btn btn-info cart-btn" data-add-cart="'
					+ i
					+ '"> ADD TO CART </a><input type="hidden" id="isPerish" value="'
					+ perish[i].perishable + '"></div></div></div>';
		}
		if (i % 2 != 0) {
			tag += '</div></div>';
		}
	}
	tag += '</div>';
	// console.log("Perishable Items "+tag);
	//$("#myModalLabel").html(productName);
	$(tag).insertAfter($("#perishTiles .row"));	//$(tag).insertAfter($("#perishTiles .row"));
	// document.getElementById("perishTiles").innerHTML = tag;
}

function generateNonPerish(nonPerish) {
	var productName = '';
	var nonPertag = '<div class="tiles-cont">';
	for (var i = 0; i < nonPerish.length; i++) {
		productName = nonPerish[i].productname;
		if (i % 2 == 0) {
			nonPertag += '<div class="sub-tiles nonperishable" id="test-sub"><div class="row"><div class="col-xs-6 m_both"><div class="tile tile-small bg-laddu disp-table" style="background:url('
					+ nonPerish[i].imagename
					+ ') center center no-repeat" data-sub-tile="'+i+'" data-toggle="modal" data-target="#infomodal"><h3 class="title table-cell vert-middle"> '
					+ productName
					+ ' </h3><div class="price-cart"><span class="amount"> $ '
					+ nonPerish[i].price
					+ ' </span><a class="btn btn-info cart-btn" data-add-cart="'
					+ i
					+ '"> ADD TO CART </a><input type="hidden" id="isPerish" value="'
					+ nonPerish[i].perishable + '"></div></div></div>';
		} else {
			nonPertag += '<div class="col-xs-6 m_both"><div class="tile tile-small bg-laddu disp-table" style="background:url('
					+ nonPerish[i].imagename
					+ ') center center no-repeat" data-sub-tile="'+i+'" data-toggle="modal" data-target="#infomodal"><h3 class="title table-cell vert-middle"> '
					+ productName
					+ ' </h3><div class="price-cart"><span class="amount"> $ '
					+ nonPerish[i].price
					+ ' </span><a class="btn btn-info cart-btn" data-add-cart="'
					+ i
					+ '"> ADD TO CART </a><input type="hidden" id="isPerish" value="'
					+ nonPerish[i].perishable + '"></div></div></div>';
		}
		if (i % 2 != 0) {
			nonPertag += '</div></div>';
		}
	}
	nonPertag += '</div>';
	// console.log("Non Perishable Items "+nonPertag);
	$(nonPertag).insertAfter($("#nonPerishTiles .row"));
	// document.getElementById("nonPerishTiles").innerHTML = nonPertag;
}

function loadProducts() {
	// 'http://ec2-54-187-15-155.us-west-2.compute.amazonaws.com:8080/PoCAppServer/products/getperishableproducts'//
	$(function() {
		$.ajax({
			type : 'GET',
			contentType : 'application/html',
			url : 'http://localhost:8080/PoCAppServer/products/getallproducts',
			success : function(data, textStatus, jqXHR) {
				if(data) {
					localStorage.setItem("productData", data);
					var perish = new Array();
					var nonPerish = new Array();
					var j = 0;
					var k = 0;
					for (var i = 0; i < data.length; i++) {
						if (data[i].perishable == 'true') {
							perish[j] = data[i];
							j++;
						} else {
							nonPerish[k] = data[i];
							k++;
						}
					}
					generatePerish(perish);	//generateTabContent(perish, "perishTiles");
					generateNonPerish(nonPerish);	//generateTabContent(perish, "nonPerishTiles");
					productData = data;
				}
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Failure Status " + jqXHR.status);
				alert("Error Thrown " + errorThrown);
				var err = eval("(" + jqXHR.responseText + ")");
				alert(err.Message);
			}

		});
	});
}