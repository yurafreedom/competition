var lastId,
 topMenu = $(".gmsNavbarList"),
 topMenuHeight = topMenu.outerHeight()+150,
 // All list items
 menuItems = topMenu.find("a"),
 // Anchors corresponding to menu items
 scrollItems = menuItems.map(function(){
   var item = $($(this).attr("href"));
    if (item.length) { return item; }
 });

// Bind click handler to menu items
// so we can get a fancy menu scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 850);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
});


// Starter validation
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false ) {
          event.preventDefault();
          event.stopPropagation();
			jQuery.noConflict(); 
			$('#modalFieldError').modal('show');		  
        }
		else {
			jQuery.noConflict(); 
			$('#modalSuccess').modal('show');
			form.classList.add('is-success');
		}
        form.classList.add('was-validated');

      }, false);
    });
  }, false);
})();


//Show uploaded files on upload btn click - just for mockup
(function() {
	$('#fileUpload').click(function() {
		$('#addedFiles').css('display', 'block');
	});
})();

//Demo-delete uploaded files on close button
(function() {
	$('#addedFiles .close').click(function() {
		$(this).parent().parent().css('display', 'none');
	});
})();

//nominees replicate
	$(document).ready(function() {
    var e = $('.nominees');
    for (var i = 1; i < 5; i++) {
      e.clone().insertBefore(e);
    }
});

//ceremony carousel 
 if (window.matchMedia('(min-width: 992px)').matches) {
		$('.carousel-ceremony .carousel-item').each(function(){
		  var next = $(this).next();
		  if (!next.length) next = $(this).siblings(':first');
		  next.children(':first-child').clone().appendTo($(this));
		});
		$('.carousel-ceremony .carousel-item').each(function(){
		  var prev = $(this).prev();
		  if (!prev.length) prev = $(this).siblings(':last');
		  prev.children(':nth-last-child(2)').clone().prependTo($(this));
		});	
  };
  
  //Step5.2 Gallery thumbnails
	$('.lightbox').each(function() {
		var imgbg = $(this).attr('href');
		$(this).css('background','url('+imgbg+') no-repeat center');
	}, false);