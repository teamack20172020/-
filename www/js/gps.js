//位置情報取得成功
var onSuccess = function(position) {
	//GPSで取得できた情報を出すコンソール
	// console.log('Latitude: '          + position.coords.latitude          + '\n' +
	// 	'Longitude: '         + position.coords.longitude         + '\n'
	// 	// 'Altitude: '          + position.coords.altitude          + '\n' +
	// 	// 'Accuracy: '          + position.coords.accuracy          + '\n' +
	// 	// 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	// 	// 'Heading: '           + position.coords.heading           + '\n' +
	// 	// 'Speed: '             + position.coords.speed             + '\n' +
	// 	// 'Timestamp: '         + position.timestamp                + '\n'
	// );
	$("#modal").hide();
	//yahoomapで現在地を表示
	Ymap(position.coords.latitude,position.coords.longitude);
};

//位置情報取得失敗
function onError(error) {
	//GPS取得に失敗した情報を出すコンソール
	// console.log('code: '    + error.code    + '\n' +
	// 	'message: ' + error.message + '\n');
	viewAlertGPS();
	$("#modal").hide();
	//yahoomapで固定の場所（穴吹コンピュータカレッジ）を表示
	Ymap(34.34291164999988,134.04532507000008);
}

document.addEventListener('init', function(event) {
	var page= event.target;
	//位置情報取得ページの時のみ処理
	if(page.matches('#gps')){
		setTimeout(function () {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}, 100);
	}
});

//もう一度位置情報取得ボタンクリック
$(document).on("click","#again_gps",function(){
	$('#modal').show();
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
