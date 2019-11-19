//1施設情報が入っている配列
var de_array;

document.addEventListener('init', function (event) {
	var page = event.target;
	if (page.matches('#plan_detail')) {
		de_array = page.data.de_work;
		//施設情報が入っている配列
		//console.log(de_array);
		pd_Ymap(de_array[0]["lat"],de_array[0]["lng"]);
		$("#pd_name").html(de_array["name"]);
		$("#pd_url").html("<a href='#' id='detail_url'>" + de_array["site-url"]+"</a>");
		$("#pd_tel").html(de_array["number"]);
	}
});

$(document).on("click","#detail_url",function(){
	let de_url=$(this).text();
	console.log(de_url);
	var ref = cordova.InAppBrowser.open(de_url, 
		'_blank', 'location=no,closebuttoncaption=戻る,toolbarposition=top');
});