$(document).ready(function() {

	$("input[name='optoutall']").change(function(event) {
		if($("input[name='optoutall']").checked == true)
			$("#submit").removeAttr("disabled");
		else
			$("#submit").attr("disabled", "disabled");
	});

	
});