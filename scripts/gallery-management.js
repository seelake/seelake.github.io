// JavaScript Document
// end of page events

(function($) {
	$(document).ready(function () {
		var galleryTick = 0; //tick in ms per la rotazione della gallery
								// se zero disattiva il ticker
		
	
		//COOKIES
		originalPic = parseInt($.cookie("as-galleryBookmark")) || 0;
		
		//posizioniamo la gallery
		//if($.cookie("as-gallery"))
		//	$('#slideshow').css('background-position', $.cookie("as-gallery"));
		$('#slideshow').css('background-position', (-gallWidth*originalPic) + 'px 0px');
		//e le thumbs

		$('A#gal-thumb-' + (originalPic + 1)).addClass('selected');
		
		
		// recuperiamo il valore del cookie "as-scroll", se esiste
		// e lo usiamo come scroll dell'intera pagina
		//if($.cookie("as-scroll"))
		//	$('html,body').scrollTop($.cookie("as-scroll"));
		// 	//scrolling animato
			/*$('html,body').animate(
				{scrollTop : $.cookie("as-scroll")},
				 300 
			);*/
		
		// ticker per alternare random le immagini della gallery
		/*
		var ticker = function() {
		  setTimeout(function() {
			  var listElements = 9 || $('#inline-list UL > LI').size()+1;
			  			  
			  var tgt = Math.floor(Math.random()* listElements);
			  $('#gal-thumb-' + tgt).click();
			  ticker();
		}, galleryTick);
	   };
	   
	   if(galleryTick > 0)	// attiviamo il ticker solo con tempi > zero
		   ticker();
		*/
	});
	
	$(window).unload(function () {
		// memorizziamo nel cookie "scroll" l'attuale scroll della pagina
		//$.cookie("as-scroll", $(window).scrollTop(), { expires: 7 });
		
		// id dell'immagine selezionata
		$.cookie("as-galleryBookmark", originalPic, { expires: 60 });	// nb.: in secondi! :)
		
	});
})(jQuery)