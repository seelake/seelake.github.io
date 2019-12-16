// restituisce il nomefile della pagina web
function GetFilename(url) {
   if (url)
   {
      var m = url.toString().match(/.*\/(.+?)\./);
      if (m && m.length > 1)
      {
         return m[1];
      }
   }
   return "";
}


function setSelected() {
	var currentPage = GetFilename(document.location.href);
	
	//alert(currentPage);
	
	$("#header-"+currentPage).addClass("selected");
		
	if(currentPage.substr(0,3) == 'as-') {
		
		currentPage = currentPage.replace("as-","");
		$("#header-products").addClass("selected");
		$("#cap-"+currentPage).addClass("selected");
	}
}