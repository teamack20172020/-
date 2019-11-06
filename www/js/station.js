var station_prefecture = "北海道";
//都道府県から駅路線取得APIのURL
var route_url = "http://www.ekidata.jp/api/p/";
//路線から駅取得APIのURL
var details_url = "http://www.ekidata.jp/api/l/";
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

		//駅路線セレクトボックスが変更された時
		$("#sta_route").change(function () {
			$('#modal').show();
			let work = $("#sta_route").val();
			ajax(details_url + work + ".xml", "station_details", "out", "xml");
		});

	}
});

//都道府県から駅路線取得ajax通信の結果退避
function setResSR(data) {
	console.log(data);
	viewRoute(data);
}

//路線情報をセレクトボックスに表示
function viewRoute(data) {
	var elem = "";
	$(data).find("line").each(function () {
		console.log($(this).find("line_name").text());
		elem += "<option value='" + $(this).find("line_cd").text() + "'>" + $(this).find("line_name").text() + "</option>";
	});
	$("#sta_route select").html(elem);
	ajax(details_url + $(data).find("line:first line_cd").text() + ".xml", "station_details", "out", "xml");
}

//路線から駅取得APIajax通信の結果退避
function setResSD(data) {
	console.log(data);
	viewDetails(data);
}

//駅詳細をセレクトボックスに表示
function viewDetails(data) {
	var elem = "";
	$(data).find("station").each(function () {
		elem += "<option value='" + $(this).find("station_name").text() + "," + $(this).find("lat").text() + "," + $(this).find("lon").text() + "'>"
			+ $(this).find("station_name").text() + "</option>";
	});
	$("#sta_station select").html(elem);
	$('#modal').hide();
}


//決定ボタンクリック処理
$(document).on("click", "#submit_station", function () {
	let work = $("#sta_station").val().split(",");
	console.log($("#sta_station"));
	console.log(work);
	lat = work[1];
	lng = work[2];
	departure_type = work[0];
	document.getElementById("main").pushPage("purpose.html");
});
