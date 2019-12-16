/// sostituisce il link di switch della lingua
/// se la pagina è in it => il link diventa en
/// e viceversa
/// NOTA: è un po' barbaro, nel caso di più lingue meglio rivederlo
/// con uno switcher da array
function langLinker() {
	var currentPage = document.location.href;
	$("#lang_en").attr("href",currentPage.replace('/it/', '/en/'));
	$("#lang_it").attr("href",currentPage.replace('/en/', '/it/'));
	
	if(currentPage.indexOf('/en') != -1) {
		$("#lang_en").parent().addClass("selected");
	}
	if(currentPage.indexOf('/it') != -1) {
		$("#lang_it").parent().addClass("selected");
	}
}