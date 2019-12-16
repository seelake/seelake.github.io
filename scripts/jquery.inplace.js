// ajax inplace content loading management
// by raffaele turra 2011 (CC)

var targetAjax = "#pagina";
var errorHtml = '<p>Mmmm... try to reload a few moments later</p>';

function inPlaceLoad(theURL) {
	//rimuoviamo il selected dall'elemento attuale
	$("#capitoli LI.selected").removeClass("selected");
	
	var selectID = theURL.replace(".html","");
	
	//ogni capitolo ha id cap-nomecapitolo, ogni pagina si chiama as-nomecapitolo
	selectID = "#"+selectID.replace("as-", "cap-");
	
	theURL = theURL + " " + targetAjax;
	//alert(theURL);
	
	$(targetAjax).load(theURL, "", function(responseText, textStatus, XMLHttpRequest) {	//on complete
			if(textStatus == 'error')
				$(targetAjax).html(errorHtml);
			
			// smooth scrolling
			$("html").animate({scrollTop: 200}, 1000);
			
			// applichiamo il selected all'elemento corretto
			$(selectID).addClass("selected");
		});
		
	return false;
}

function startBlink(){
	window.blinker = setInterval(function(){
		if(window.blink){
		   $('.blink').css('color','blue');
		   window.blink=false;
		 }
		else{
				$('.blink').css('color','white');
				window.blink = true;
		}
	},50);
}

function stopBlink(){
if(window.blinker) clearInterval(window.blinker);
}

function myFunc() {
	var inplaceURL =  $(this).attr('href');
	$(this).attr('href','#');
	$(this).click(function() {
		inPlaceLoad(inplaceURL);
		return false;
	});
}