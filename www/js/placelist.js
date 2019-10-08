$(function(){
	$('#placelist').on('click', function() {
		var url = "place/getList";
		ajax(url);
		
	});
});
var result = "";

function setRes(resList){
	resList.forEach(function( row ) {
		result += "<p>" + row["name"] + "</p>";
	});
	viewRes();
}

function viewRes(){
	alert('検索が正常に完了しました');
	$("#main").html(result);
}