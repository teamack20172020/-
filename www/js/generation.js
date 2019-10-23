//ローカルストレージに保存するために使う変数
var generation_array = new Array();
//自動生成APIのURL「travelplan/create/」
var ge_url = "travelplan/create/";
//作成したプランを一時的に保存する変数
var g_work = {};

//画面が読み込まれたときの処理
document.addEventListener('show', function (event) {
	g_work = {};
	var page = event.target;
	//質問ページの時のみ処理
	if (page.matches('#generation')) {
		//スケジュール生成
		$("#gene_purpose").text("目的：" + purpose);
		$("#gene_departure").text("出発地：" + departure_type);
		
		ajax(ge_url + departure_type + "/" + lat + "," + lng + "/" + purpose + "/37", "generation_auto", "in", "json");
		//generation_ajax("travelplan/create/" + departure_type + "/" + lat + "," + lng + "/" + purpose + "/37");

	}
});

//プラン自動生成ajax通信の結果退避
function setResG(resg) {
	console.log(resg);
	//今日の日付を取得
	let today = new Date();
	g_work["data"] = resg;
	g_work["create_purpose"] = purpose;
	g_work["create_date"] = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	g_work["create_time"] = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	viewGeneration(resg);
}

//自動生成したプランを表示する
function viewGeneration(viewg) {
	var elem = "";
	for (let i = 0; i < viewg.length; i++) {
		elem += "<ons-list-item>" + viewg[i]["startPoint"]["name"] + "～"
			+ viewg[i]["endPoint"]["name"] + "　　"
			+ viewg[i]["time_ja"] + "</ons-list-item>";
	}
	$("#gene_plan_list").html(elem);
	//読み込み中画面を閉じる
	$('#modal').hide();
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
	setLocalStorage("generation", generation_array);
	console.log(generation_array);
	alert("履歴に登録しました");
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
});

//「キャンセル」ボタンクリック
$(document).on("click", "#cancel_plan", function () {
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
});
