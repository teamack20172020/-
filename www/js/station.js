var station_prefecture="北海道";
var station_route="";
//都道府県セレクトが変更されたら
document.addEventListener('init', function(event) {
	var page= event.target;
	//質問ページの時のみ処理
	if(page.matches('#station')){
		route_ajax("1");
		$("#sta_prefecture").change(function(){
			let work=$("#sta_prefecture").val().split(",");
			route_ajax(work[1]);
		});
		$("#sta_route").change(function(){
			let work=$("#sta_route").val();
			station_ajax(work);
		});
	}
});
//決定ボタンクリック処理
$(document).on("click","#submit_station",function(){
	let work=$("#sta_station").val().split(",");
	console.log(work);
	lat=work[0];
	lng=work[1];
	document.getElementById("main").pushPage("purpose.html");
});

//都道府県から駅路線取得API
function route_ajax(num){
	$.ajax({
		type: "GET",
		url: "http://www.ekidata.jp/api/p/"+num+".xml",
		dataType:"xml",
		timeout: 30000,
	}).done(function(data) {
		console.log(data);
		var elem="";
		$(data).find("line").each(function(){
			console.log($(this).find("line_name").text());
			elem+="<option value='"+$(this).find("line_cd").text()+"'>"+$(this).find("line_name").text()+"</option>";
		});
		$("#sta_route select").html(elem);
		station_ajax($(data).find("line:first line_cd").text());
	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
	});
}

/*路線から駅取得API*/
function station_ajax(num){
	$.ajax({
		type: "GET",
		url: "http://www.ekidata.jp/api/l/"+num+".xml",
		dataType:"xml",
		timeout: 30000,
	}).done(function(data) {
		console.log(data);
		var elem="";
		$(data).find("station").each(function(){
			elem+="<option value='"+$(this).find("lat").text()+","+$(this).find("lon").text()+"'>"
				+$(this).find("station_name").text()+"</option>";
		});
		$("#sta_station select").html(elem);
	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
	});
}
