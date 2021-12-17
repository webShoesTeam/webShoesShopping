 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

jQuery(document).ready(function($) {

	"use strict";

	var slider = function() {
		$('.nonloop-block-3').owlCarousel({
	    center: false,
	    items: 1,
	    loop: false,
			stagePadding: 15,
	    margin: 20,
	    nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
	    responsive:{
        600:{
        	margin: 20,
          items: 2
        },
        1000:{
        	margin: 20,
          items: 3
        },
        1200:{
        	margin: 20,
          items: 3
        }
	    }
		});
	};
	slider();


	var siteMenuClone = function() {

		$('<div class="site-mobile-menu"></div>').prependTo('.site-wrap');

		$('<div class="site-mobile-menu-header"></div>').prependTo('.site-mobile-menu');
		$('<div class="site-mobile-menu-close "></div>').prependTo('.site-mobile-menu-header');
		$('<div class="site-mobile-menu-logo"></div>').prependTo('.site-mobile-menu-header');

		$('<div class="site-mobile-menu-body"></div>').appendTo('.site-mobile-menu');

		

		$('.js-logo-clone').clone().appendTo('.site-mobile-menu-logo');

		$('<span class="ion-ios-close js-menu-toggle"></div>').prependTo('.site-mobile-menu-close');
		

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() > 1  ) {				
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
				$( ".form-control" ).change();
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(1));
				$( ".form-control" ).change();
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
			$( ".form-control" ).change();
		});
	};
	sitePlusMinus();


	


	// var addToCart = function() {
    //     $('.buy-now').on('click', function(e){
    //         e.preventDefault();
    //         $(this).closest('.form-addtocart').find('.input-quantity').val($('.input-group').find('.form-control').val());
	// 		const quantity = $(this).closest('.form-addtocart').find('.input-quantity').val()
	// 		const id = $(this).closest('.form-addtocart').find('.input-id').val()
			
	// 		$.post( "/cart/add", { 
	// 			quantity: quantity, id: id 
	// 		}, function(cart) {				
	// 			const countItems = cart.totalItems;	
	// 			// console.log(countItems);		
	// 			document.getElementsByClassName("count")[0].innerHTML = countItems;	
				
	// 			$( "#total-in-cart" ).change();
	// 		}).fail(function(data) {
	// 			if (data.status === 401) {
	// 				window.location.href = `login?redirect=${window.location.href}`
	// 			}
	// 		});
	// 	})
	// };
    // addToCart();

	// var displayCountCart = function() {	
	// 	var totalItems = {{cart.totalItems}};	
	// 	$( "#total-in-cart" ).change(function() {
	// 		var item = document.getElementById("total-in-cart");
	// 		var count = item.textContent;
	// 		console.log("item count: " + count);
	// 		if (count == "0" || count == "") {
	// 			item.style.display = "none";
	// 		} else {
	// 			item.style.display = "block";
	// 		}
	// 	});
	// }
	// displayCountCart();

	var getQuantity = function() {	
		//console.log("change")
		$("#number-to-add").change(function() {
			console.log("old quantity: " + $('.input-quantity').val());
			const q = $("#number-to-add").val();
			$('#input-qty').val(q);
			const newQ = $('#input-qty').val();
			
		})
	 };
	getQuantity ();

	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	siteSliderRange();


	var siteMagnificPopup = function() {
		$('.image-popup').magnificPopup({
	    type: 'image',
	    closeOnContentClick: true,
	    closeBtnInside: false,
	    fixedContentPos: true,
	    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
	     gallery: {
	      enabled: true,
	      navigateByImgClick: true,
	      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	    },
	    image: {
	      verticalFit: true
	    },
	    zoom: {
	      enabled: true,
	      duration: 300 // don't foget to change the duration also in CSS
	    }
	  });

	  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
	    disableOn: 700,
	    type: 'iframe',
	    mainClass: 'mfp-fade',
	    removalDelay: 160,
	    preloader: false,

	    fixedContentPos: false
	  });
	};
	siteMagnificPopup();


	$(`#comment-form input[type=submit]`).on('click',function(event){
		event.preventDefault();
		
		$.post(`/product/${$(`#product-id`).val()}/comment`,{
			content: $(`#comment-content`).val(),
			username: $(`#comment-username`).val(),
		},function (data){
			const commentTemplate = Handlebars.compile(document.getElementById("comment-template").innerHTML)
			const commentHtml = commentTemplate(data)
			$(`#comment-list`).prepend(commentHtml);
		}).fail( function(data){
			console.log("fail",data)
		})
	
	})

	// $(`#listcomment a`).on('click',function(event){
	// 	event.preventDefault();
	// 	console.log($(this).attr("href"))

	// 	$.get($(this).attr("href"),function (data){
	// 		console.log(data);
	// 		$('#comment-list').empty()
	// 		for(i = 0 ; i < data.length;i++){
	// 			const commentTemplate = Handlebars.compile(document.getElementById("comment-template").innerHTML)
	// 			const commentHtml = commentTemplate(data[i])
	// 			$(`#comment-list`).prepend(commentHtml);
	// 		}
	// 	})

	// })
	
});

