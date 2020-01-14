var station_prefecture = "北海道";
//都道府県から駅路線取得APIのURL
var route_url = "https://www.ekiapi.net/api/p/";
//路線から駅取得APIのURL
var details_url = "https://www.ekiapi.net/api/l/";
//都道府県から駅路線取得APIの結果を入れる配列
var route_list = null;
//路線から駅取得APIの結果を入れる配列
var details_list = [];

//都道府県セレクトが変更されたら
document.addEventListener('init', function (event) {
	var page = event.target;
	//駅ページの時のみ処理
	if (page.matches('#station')) {
		ajax(route_url + "1.xml", "station_route", "out", "xml");

		//都道府県セレクトボックスが変更された時
		$("#sta_prefecture").change(function () {
			$('#modal').show();
			let work = $("#sta_prefecture").val().split(",");
			ajax(route_url + work[1] + ".xml", "station_route", "out", "xml");
		});
		$("#sta_prefecture").selModal();

	}
});

//駅路線セレクトボックスが変更された時
$(document).on("change","#sta_route",function () {
	$('#modal').show();
	let work = $("#sta_route").val();
	ajax(details_url + work + ".xml", "station_details", "out", "xml");
});

//都道府県から駅路線取得ajax通信の結果退避
function setResSR(data) {
	viewRoute(data);
}

//路線情報をセレクトボックスに表示
function viewRoute(data) {
	$("#sta_route_box").empty();
	var elem = '<select id="sta_route" name="sta_route_name">';
	$(data).find("line").each(function () {
		elem += "<option value='" + $(this).find("line_cd").text() + "'>" + $(this).find("line_name").text() + "</option>";
	});
	elem +="</select>";
	$("#sta_route_box").html(elem);
	$("#sta_route").selModal();
	ajax(details_url + $(data).find("line:first line_cd").text() + ".xml", "station_details", "out", "xml");
}

//路線から駅取得APIajax通信の結果退避
function setResSD(data) {
	viewDetails(data);
}

//駅詳細をセレクトボックスに表示
function viewDetails(data) {
	$("#sta_station_box").empty();
	var elem = '<select id="sta_station" name="sta_station_name">';
	$(data).find("station").each(function () {
		elem += "<option value='" + $(this).find("station_name").text() + "," + $(this).find("lat").text() + "," + $(this).find("lon").text() + "'>"
			+ $(this).find("station_name").text() + "</option>";
	});
	elem +="</select>";
	$("#sta_station_box").html(elem);
	$("#sta_station").selModal();
	$('#modal').hide();
}


//決定ボタンクリック処理
$(document).on("click", "#submit_station", function () {
	let work = $("#sta_station").val().split(",");
	//緯度、経度を出すコンソール
	//console.log("緯度経度:"+work);
	lat = work[1];
	lng = work[2];
	departure_type = work[0];
	document.getElementById("main").pushPage("purpose.html");
});
