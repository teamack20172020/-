var address_prefecture="北海道";
var address_city="";
//都道府県セレクトが変更されたら
document.addEventListener('init', function(event) {
	var page= event.target;
	//質問ページの時のみ処理
	if(page.matches('#address')){
		city_ajax("01");
		$("#add_prefecture").change(function(){
				var result=$("#add_prefecture").val().split(",");
				address_prefecture=result[0];
				city_ajax(result[1]);
		});
		$("#city").change(function(){
				var result=$("#city").val();
				address_city=result;
				console.log(address_prefecture+address_city);
		});
	}
});
$(document).on("click","#submit_address",function(){
	var addin=$("#in_address").val();
	console.log(addin);
	if(addin=="" || addin==null){
		alert("住所が入力されていません");
	}else{
		latlng_ajax(address_prefecture+address_city+addin);
	}

});

//市区町村取得API
function city_ajax(num){
	$.ajax({
		type: "GET",
		url: "http://www.land.mlit.go.jp/webland/api/CitySearch?area="+num,
		dataType:"json",
		timeout: 30000,
	}).done(function(data) {
		console.log(data);
		var elem="";
		address_city=data['data'][0]['name'];
		console.log(address_prefecture+address_city);
		for(var i=0;i<data['data'].length;i++){
			elem+="<option value='"+data['data'][i]['name']+"'>"+data['data'][i]['name']+"</option>";
		}
		$("#city select").html(elem);
	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
	});
}

/*緯度経度取得API*/
function latlng_ajax(str){
	$.ajax({
		type: "GET",
		url: "https://map.yahooapis.jp/geocode/V1/geoCoder",
		data:{
			appid:"dj00aiZpPUc2STZsb0Vpa3JobSZzPWNvbnN1bWVyc2VjcmV0Jng9Nzk-",
			query:str
		},
		dataType:"xml",
		timeout: 30000,
	}).done(function(data) {
		console.log(data);
		var count=$(data).find("ResultInfo").find("Count").text();
		if(count==0){
			//検索結果が0件の場合
			alert("検索結果がありませんでした。");
		}else{
			//検索結果が1件以上の場合
				let work=$(data).find("Feature:first Geometry Coordinates").text().split(",");
				console.log($(data).find("Feature:first >Name").text());
				console.log("緯度:"+work[1]);
				console.log("経度:"+work[0]);
				lat=work[1];
				lng=work[0];
				departure_type="station";
				document.getElementById("main").pushPage("purpose.html");
		}
	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
	});
}
