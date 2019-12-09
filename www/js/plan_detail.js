//1施設情報が入っている配列
var de_array;

//ページが読み込まれたときの処理
document.addEventListener('init', function (event) {
	var page = event.target;
	if (page.matches('#plan_detail')) {
		de_array = page.data.de_work;
		//施設情報が入っている配列
		//console.log(de_array);
		let latlng_work=de_array["latlng"].split(",");
		pd_Ymap(latlng_work[0], latlng_work[1]);
		$("#pd_name").html(de_array["name"]);
		$("#pd_url").html("<a href='#' id='detail_url'>" + de_array["site-url"]+"</a>");
		$("#pd_tel").html("<a href='tel:" + de_array["number"] + "'>" + de_array["number"] +"</a>");
	}
});

//URLが押されたときInAppBrowserを開く
$(document).on("click","#detail_url",function(){
	let de_url=$(this).text();
	//URLをコンソールに出す
	//console.log(de_url);
	in_app_browser(de_url);
});