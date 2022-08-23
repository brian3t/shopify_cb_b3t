/*-----------------------------------------------------------------------------/
/ Custom Theme JS
/-----------------------------------------------------------------------------*/

// Insert any custom theme js here...

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
  	//$(".js-home-carousel").slick("resize");
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });


    $('.image-bar__item').click(function(e){
        e.preventDefault();
        window.open($(this).data('url'), '_blank');
    });


    $('.customize-review-section').each(function() {
        let NumberOfStarts = $(this).attr('data');
        $(this).find('.icon--star-full').each(function() {
            if (NumberOfStarts >= $(this).data('value')) {
                $(this).addClass('checked');
            }
        });
    });
  if (window.location.href.indexOf('#judgeme_product_reviews') === -1) {
  	  	$('.show-product-reviews').trigger('click');
  }    
  	$('.blog-select').change(function(){ 
        var value = $(this).val();
      	window.location.href = value;
    });
  	if ($('#shopify-section-1606895355a926f586').children().length <= 0) {
      $('#shopify-section-1606895355a926f586').css('margin-bottom', '0');
  	}
//   	var width = $(window).width();
//   	console.log(width < 767);
//   	if (width < 767) {
//       	console.log(123);
//   		$('.template-index .blog__media .home-blog__media-img.js').addClass('no-crop').removeClass('blog__img');
//     }
  	var width = $(window).width();
  	if (width <= 767) {
        $('.section--161510498463d6c70e .o-layout').slick({infinite: true, dots: true, arrows: false});
      	$('.section--161721511158e58ac2 .o-layout').slick({infinite: true, dots: true, arrows: false});
  	}
  setTimeout(theme.masonryLayout, 4000) //BN fix 5/6/21
  setTimeout(()=>{  $('img:not([alt])').attr('alt','img_alt') }, 500) //BN 7/8/21 
  setTimeout(()=>{  $('img:not([alt])').attr('alt','img_alt') }, 1500) //BN 7/8/21 
  setTimeout(()=>{  $('img:not([alt])').attr('alt','img_alt') }, 2500) //BN 7/8/21 
  setTimeout(()=>{  $('img:not([alt])').attr('alt','img_alt') }, 3500) //BN 7/8/21 
  setTimeout(()=>{  $('img:not([alt])').attr('alt','img_alt') }, 4500) //BN 7/8/21 
  setTimeout(()=>{  $('img[alt=""]').attr('alt','img_alt') }, 500) //BN 7/8/21
  setTimeout(()=>{  $('img[alt=""]').attr('alt','img_alt') }, 1500) //BN 7/8/21
  setTimeout(()=>{  $('img[alt=""]').attr('alt','img_alt') }, 2500) //BN 7/8/21
  setTimeout(()=>{  $('img[alt=""]').attr('alt','img_alt') }, 3500) //BN 7/8/21
  setTimeout(()=>{  $('img[alt=""]').attr('alt','img_alt') }, 4500) //BN 7/8/21
  setTimeout(()=> $('#instafeed').prepend($('#stories')), 2500)
});
 /*Scroll to top when arrow up clicked END*/
 