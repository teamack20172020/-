//詳細画面に送る為の配列を入れる
var send_array = null;

//ページ遷移
$(function () {
	rotes = new AppRotes();
	//nextpageクラスをタップした時次のページへ遷移する処理
	$(document).on("click", ".nextpage", function () {
		nextpage = rotes.getRote($(this).attr("id"));
		if (nextpage != "") {
			//次のページに移動
			document.getElementById("main").pushPage(nextpage + ".html");
		}
	});
	$(document).on("click", ".home_back", function () {
		work_question = [];
		document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
	});
});

//パラメタソート
function compareFunc(a, b) {
	return a - b;
}

//ローカルストレージへの保存
function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

//ローカルストレージから取得
function getLocalStorage(key) {
	let work = localStorage.getItem(key);
	work = JSON.parse(work);
	return work;
}

//詳細のボタンクリック時の処理(plan_check,generationで使用)
$(document).on("click", ".detail_item", function () {
	//チェックされた項目を取得
	let detail_type = $(this).attr("value");
	let de_work = send_array[detail_type];
	document.getElementById('main').pushPage("plan_detail.html", { data: { de_work } });
});

//strの文字を8の数までの文字列にして返すメソッド
function count_text(str) {
	let work = str;
	if (work.length > 8) {
		work = str.slice(0, 8);
		work += "...";
	}
	//変換したworkをコンソールに出す
	//console.log(work);
	return work;
}

//クロスサイトスクリプティング対策メソッド
function htmlspecialchars(ch) {
	ch = ch.replace(/&/g, "&amp;");
	ch = ch.replace(/"/g, "&quot;");
	ch = ch.replace(/'/g, "&#039;");
	ch = ch.replace(/</g, "&lt;");
	ch = ch.replace(/>/g, "&gt;");
	// ch = ch.replace(" ", "");
	// ch = ch.replace("　", "");
	ch = ch.replace("	", "");
	return ch;
}

//引数でtypeイメージを返すメソッド
function type_image(str) {
	let result = "img/";
	switch (str) {
		case "1": result += "icon_sightseeing.png"; break;
		case "2": result += "icon_gourmet.png"; break;
		case "3": result += "icon_history.png"; break;
		case "4": result += "icon_leisure.png"; break;
		case "5": result += "icon_art.png"; break;
		case "6": result += "icon_nature.png"; break;
		case "7": result += "icon_spa.png"; break;
		default: result += "icon_departure.png";break;
	}
	return result;
}