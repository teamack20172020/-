//位置情報取得成功
var onSuccess = function(position) {
	$("#gps .question_box").html('Latitude: '          + position.coords.latitude          + '\n' +
		'Longitude: '         + position.coords.longitude         + '\n' +
		'Altitude: '          + position.coords.altitude          + '\n' +
		'Accuracy: '          + position.coords.accuracy          + '\n' +
		'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		'Heading: '           + position.coords.heading           + '\n' +
		'Speed: '             + position.coords.speed             + '\n' +
		'Timestamp: '         + position.timestamp                + '\n');
	$("#modal").hide();
};


//位置情報取得失敗
function onError(error) {
	$("#gps .question_box").html('code: '    + error.code    + '\n' +
		'message: ' + error.message + '\n');
	$("#modal").hide();
}

document.addEventListener('init', function(event) {
	var page= event.target;
	//質問ページの時のみ処理
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
