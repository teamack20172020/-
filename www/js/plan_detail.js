document.addEventListener('init', function (event) {
	var page = event.target;
	//質問ページの時のみ処理
	if (page.matches('#plan_detail')) {
		let check_data = page.data.work_check;
		let work_time = check_data['time_second']/60;
		console.log(check_data);
		planMap(check_data["startPoint"]["lat"], check_data["startPoint"]["lng"]
			, check_data["endPoint"]["lat"], check_data["endPoint"]["lng"], work_time);
	}
});

//プランの経路探索マップ
function planMap(Slat, Slng, Glat, Glng, time) {
	console.log(time);
	let center_lat = (Slat + Glat) / 2;
	let center_lng = (Slng + Glng) / 2;
	let pd_ymap = new Y.Map("pd_map");
	let mapsize = 1;
	if (time >= 50.0) {
		mapsize = 10;
	} else if (time >= 40.0) {
		mapsize = 11;
	} else if (time >= 30.0) {
		mapsize = 12;
	} else if (time >= 20.0) {
		mapsize = 12;
	} else if (time >= 10.0) {
		mapsize = 14;
	} else {
		mapsize = 15;
	}
	pd_ymap.drawMap(new Y.LatLng(center_lat, center_lng), mapsize, Y.LayerSetId.NORMAL);
	var latlngs = [
		new Y.LatLng(Slat, Slng),  //スタート位置
		new Y.LatLng(Glat, Glng),  //ゴール位置
	];
	var config = {
		"traffic": "car"
	};
	var pd_layer = new Y.RouteSearchLayer();
	pd_ymap.addLayer(pd_layer);
	pd_layer.execute(latlngs, config);
}