/**
 * Product fetching functions
 */

var productData;
var perishableData;
var nonPerishableData;

$(document).ready(function(){
	loadProducts();
});

function generateTabContent(content, isPerish) {
	var productName = '';
	var tag = '<div class="tiles-cont">';
	for (var i = 0; i < content.length; i++) {
		productName = content[i].productname;
		console.log("Product Name : "+content[i].productname);
		if (i % 2 == 0) {
			tag += '<div class="sub-tiles" id="test-sub"><div class="row"><div class="col-xs-6 m_both"><div class="tile tile-small bg-laddu disp-table" style="background:url('
					+ content[i].imagename
					+ ') center center no-repeat" ';
			if(isPerish)
				tag += 'data-sub-tile';
			else
				tag += 'data-sub-tile-non';
			tag += '="'+i+'" data-toggle="modal" data-target="#infomodal"><h3 class="title table-cell vert-middle"> '
					+ productName
					+ ' </h3><div class="price-cart"><span class="amount"> $ '
					+ content[i].price
					+ ' </span><a class="btn btn-info cart-btn" data-add-cart="'
					+ i
					+ '"> ADD TO CART </a><input type="hidden" id="isPerish" value="'
					+ content[i].perishable + '"></div></div></div>';
		} else {
			tag += '<div class="col-xs-6 m_both"><div class="tile tile-small bg-laddu disp-table" style="background:url('
					+ content[i].imagename
					+ ') center center no-repeat" '
			if(isPerish)
				tag += 'data-sub-tile';
			else
				tag += 'data-sub-tile-non';
			tag += '="'+i+'" data-toggle="modal" data-target="#infomodal"><h3 class="title table-cell vert-middle"> '
					+ productName
					+ ' </h3><div class="price-cart"><span class="amount"> $ '
					+ content[i].price
					+ ' </span><a class="btn btn-info cart-btn" data-add-cart="'
					+ i
					+ '"> ADD TO CART </a><input type="hidden" id="isPerish" value="'
					+ content[i].perishable + '"></div></div></div>';
		}
		if (i % 2 != 0) {
			tag += '</div></div>';
		}
	}
	tag += '</div>';
	if(isPerish) {
		//console.log("Product Items "+tag);
		$(tag).insertAfter($("#perishTiles .row"));
	} else {
		//console.log("No Perishable Product Items "+tag);
		$(tag).insertAfter($("#nonPerishTiles .row"));
	}
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
					perishableData = perish;
					nonPerishableData = nonPerish;
					generateTabContent(perish, true);
					generateTabContent(nonPerish, false);
					productData = data;
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				var err = eval("(" + jqXHR.responseText + ")");
			}

		});
	});
}