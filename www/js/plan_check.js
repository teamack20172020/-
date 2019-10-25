//一つのプランが格納される変数
var check_data;
//ブラウザのgoogle mapを表示する為の変数
var googlemapurl ="https://www.google.co.jp/maps/dir/";

//monacaでブラウザを表示する為の処理
document.addEventListener("deviceready", onDeviceReady, false);

document.addEventListener('init', function (event) {
	var page = event.target;
	//プラン確認ページの時のみ処理
	if (page.matches('#plan_check')) {
		//データ取得
		let history_type = page.data.history_type;
		check_data = history_array[history_type]['data'];
		//スケジュール出力
		let elem = "";
		for (let i = 0; i < check_data.length; i++) {
			elem += "<ons-list-item modifier='chevron' class='check_item' value='" + i + "' tappable>" + check_data[i]["startPoint"]["name"] + "～"
				+ check_data[i]["endPoint"]["name"] + "　　"
				+ check_data[i]["time_ja"] + "</ons-list-item>";
		}
		$("#check_plan_list").html(elem);
	}
});

//monacaでブラウザを表示する為の処理内容
function onDeviceReady() {
	console.log("window.open works well");
	//プランクリック時の処理
	$(document).on("click", ".check_item", function () {
		//チェックされた項目を取得
		let check_type = $(this).attr("value");
		let work_check = check_data[check_type];
		//ブラウザを表示
		var ref = cordova.InAppBrowser.open(googlemapurl + work_check['startPoint']["name"] + "/" + work_check['endPoint']["name"], '_blank', 'location=yes');
		// document.getElementById('main').pushPage("plan_detail.html", { data: { work_check } });
	});
}

