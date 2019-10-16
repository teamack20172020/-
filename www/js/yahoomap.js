//yahooMAP
var ymap;
//yahooMAPマーカー
var marker;
//y:経度（縦）、x:経度（横）
function Ymap(y,x){
	lat=y;
	lng=x;
	console.log("緯度:"+lat+",経度:"+lng);
	ymap = new Y.Map("map");
	ymap.drawMap(new Y.LatLng(y, x), 16, Y.LayerSetId.NORMAL);
	marker = new Y.Marker(new Y.LatLng(y,x));
	ymap.addFeature(marker);
	//マップ内をクリック時緯度経度の更新処理
	ymap.bind('click', function(latlng){
   		var work=latlng.toString().split(",");
		//緯度経度を設定
		ymap.removeFeature(marker);
		marker= new Y.Marker(new Y.LatLng(parseFloat(work[0]),parseFloat(work[1])));
		ymap.addFeature(marker);
		lat=parseFloat(work[0]);
		lng=parseFloat(work[1]);
		console.log("緯度:"+lat+",経度:"+lng);
	});
}
