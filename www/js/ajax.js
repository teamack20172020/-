function ajax(url){
	var res;
	$.ajax({
		type: "GET",
		url: "https://www.autotravelplan.com/" + url,
		dataType:"json",
		scriptCharset: "utf-8",
		timeout: 30000,
	}).done(function(data,textStatus,jqXHR) {
		if(data.length > 0 ){
			setRes(data);
			console.log(data);
		}
	}).fail(function(jqXHR, textStatus, errorThrown){
			$("#p1").text("err:"+jqXHR.status); //例：404
			$("#p2").text(textStatus); //例：error
			$("#p3").text(errorThrown); //例：NOT FOUND
	}).always(function(){
	});
}
