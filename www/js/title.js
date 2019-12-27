//ページがタイトル画面だった場合の処理
document.addEventListener('init', function (event) {
	var page = event.target;
	if (page.matches('#title')) {
		ss();
	}
});

//目的リストを取得するメソッド
function ss(){
	//初期で目的一覧を取得する
	var purposeurl = "objective/getList";
	ajax(purposeurl, "purpose", "in", "json");
}

//ajax通信の結果退避
function setResP(resList) {
	resList.forEach(function (row) {
		objectiveList[row["id"]] = row["title"];
		objectiveAboutList[row["id"]] = row["about"];
	});
	idlist = Object.keys(objectiveList);
	//目的IDを保存した配列を出すコンソール
	//console.log(idlist);
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
}

//ajax通信の失敗時の処理
function setErrP(){
	$("#title .answer_box").html('<ons-button id="re_connect">再接続</ons-button>');
}

//再接続ボタンクリック時の処理
$(document).on("click", "#re_connect",function(){
	$("#title .answer_box").html('<ons-icon icon="md-spinner" size="50px" spin></ons-icon>');
	ss();
});

