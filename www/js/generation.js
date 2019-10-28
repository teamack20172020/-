//ローカルストレージに保存するために使う変数
var generation_array = new Array();
//自動生成APIのURL「travelplan/create/」
var ge_url = "travelplan/create/";
//作成したプランを一時的に保存する変数
var g_work = {};

//monacaでブラウザを表示する為の処理
document.addEventListener("deviceready", onDeviceReady, false);

//画面が読み込まれたときの処理
document.addEventListener('show', function (event) {
	g_work = {};
	var page = event.target;
	//プラン生成ページの時のみ処理
	if (page.matches('#generation')) {
		//スケジュール生成
		$("#gene_purpose").text("目的：" + purpose);
		$("#gene_departure").text("出発地：" + departure_type);
		//自動生成APIと通信
		ajax(ge_url + departure_type + "/" + lat + "," + lng + "/" + purpose + "/37", "generation_auto", "in", "json");
	}
});

//プラン自動生成ajax通信の結果退避
function setResG(resg) {
	console.log(resg);
	//今日の日付を取得
	let today = new Date();
	/**「g_work」配列の中身
	 * data : 生成したプランの詳細データ
	 * create_purpose : 生成した時の目的
	 * create_departure : 生成した時の出発地
	 * create_date : 生成した時のの日にち
	 * create_time : 生成した時の時間
	 */
	g_work["data"] = resg;
	g_work["create_purpose"] = purpose;
	g_work["create_departure"] = departure_type;
	g_work["create_date"] = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	g_work["create_time"] = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	viewGeneration(resg);
}

//自動生成したプランを表示する
function viewGeneration(viewg) {
	var elem = "";
	for (let i = 0; i < viewg.length; i++) {
		elem += "<ons-list-item  modifier='chevron' class='generation_item' value='" + i + "' tappable>" + viewg[i]["startPoint"]["name"] + "～"
			+ viewg[i]["endPoint"]["name"] + "　　"
			+ viewg[i]["time_ja"] + "</ons-list-item>";
	}
	$("#gene_plan_list").html(elem);
	//読み込み中画面を閉じる
	$('#modal').hide();
}

//monacaでブラウザを表示する為の処理内容
function onDeviceReady() {
	console.log("window.open works well");
	//プランクリック時の処理
	$(document).on("click", ".generation_item", function () {
		//チェックされた項目を取得
		let ge_type = $(this).attr("value");
		let work_ge = g_work["data"][ge_type];
		if (work_ge['startPoint']["name"] == "現在位置") {
			//スタート位置が現在位置の場合
			//ブラウザを表示
			var ref = cordova.InAppBrowser.open(googlemapurl + work_ge['startPoint']["lat"]
				+ "," + work_ge['startPoint']["lng"]
				+ "/" + work_ge['endPoint']["name"], '_blank', 'location=yes');
		} else if (work_ge['endPoint']["name"] == "現在位置") {
			//エンド位置が現在位置の場合
			//ブラウザを表示
			var ref = cordova.InAppBrowser.open(googlemapurl + work_ge['startPoint']["name"]
				+ "/" + work_ge['endPoint']["lat"]
				+ "," + work_ge['endPoint']["lng"], '_blank', 'location=yes');
		} else {
			//ブラウザを表示
			var ref = cordova.InAppBrowser.open(googlemapurl + work_ge['startPoint']["name"]
				+ "/" + work_ge['endPoint']["name"], '_blank', 'location=yes');
		}
		//plan_detail.htmlを使う場合のpush処理
		// document.getElementById('main').pushPage("plan_detail.html", { data: { work_check } });
	});
}

//「もう一度自動生成する」ボタンクリック
$(document).on("click", "#again_plan", function () {
	$('#modal').show();
	document.getElementById("main").resetToPage('generation.html', { animation: 'slide-ios' });
});

//「完了」ボタンクリック
$(document).on("click", "#complete_plan", function () {
	//ローカルストレージから取得
	if (getLocalStorage("generation") != null) {
		generation_array = getLocalStorage("generation");
	}
	generation_array.push(g_work);
	//ローカルストレージに生成したプランを保存
	setLocalStorage("generation", generation_array);
	console.log(generation_array);
	alert("履歴に登録しました");
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
});

//「キャンセル」ボタンクリック
$(document).on("click", "#cancel_plan", function () {
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
});
