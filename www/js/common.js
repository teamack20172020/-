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
	//特殊文字「$&<>'";:/\」を消す
	ch = ch.replace(/[=|$&<>'";:\/\\]/g, "");
	ch = ch.replace("	", "");
	return ch;
}

//引数でtype(目的)イメージを返すメソッド
function type_image(str) {
	let result = "<img src='img/";
	switch (str) {
		case 1: result += "icon_sightseeing_white.png"; break;
		case 2: result += "icon_gourmet_white.png"; break;
		case 3: result += "icon_history_white.png"; break;
		case 4: result += "icon_leisure_white.png"; break;
		case 5: result += "icon_art_white.png"; break;
		case 6: result += "icon_nature_white.png"; break;
		case 7: result += "icon_spa_white.png"; break;
		default: result += "icon_departure_white.png"; break;
	}
	result +="' class='purpose_image' />";
	return result;
}

//自動生成画面、プラン詳細画面で使うイメージのメソッド
function check_image(str){
	let result="<img src='img/";
	switch(str){
		case "arrow_down":result+="icon_arrow_down_black.png";break;
		case "info": result += "icon_info_white.png";break;
		case "home": result += "icon_home_blue.png";break;
		case "route":result+="icon_route_white.png";break;
		case "trash": result += "icon_trash_white.png"; break;
	}
	result += "' class='plan_image' />";
	return result;
}

function in_app_browser(url){
	cordova.InAppBrowser.open(url, '_blank', 'location=no,closebuttoncaption=戻る,toolbarposition=top,enableViewportScale=yes');
}

//半角1、全角2でカウント
function getLen(str) {
	let string = htmlspecialchars(str);
	var result = "";
	let count = 0;
	let work = string.split("");
	for (var i = 0; i < string.length; i++) {
		var chr = string.charCodeAt(i);
		if ((chr >= 0x00 && chr < 0x81) ||
			(chr === 0xf8f0) ||
			(chr >= 0xff61 && chr < 0xffa0) ||
			(chr >= 0xf8f1 && chr < 0xf8f4)) {
			//半角文字の場合は1を加算
			count += 1;
		} else {
			//それ以外の文字の場合は2を加算
			count += 2;
		}
		//24文字以上は排除
		if (count < 25) {
			result += work[i];
		}
	}
	//結果を返す
	return result;
};

//プランを表示するメソッド0：通常，1：編集モード
function view_plan(array,mode){
	let elem="";
	if(mode==0){
		elem += "<ons-list-item>"
			+ type_image("デフォルト")
			+ "<div class='plan_item_name'>" + count_text(array[array.length - 1]["name"]) + "</div>"
			+ "</ons-list-item>";
		for (let i = 0; i < array.length; i++) {
			elem += "<div class='plan_item_time'>"
				+ check_image("arrow_down")
				+"<div class='text_check'>" + array[i]["time_ja"] + "</div>"
				+ "<ons-button class='route_item' value='" + i + "'>"
				+ check_image("route")
				+"</ons-button></div>"
				+ "<ons-list-item>";
			if (i != array.length - 1) {
				elem += type_image(array[i]["purpose"]);
			} else {
				elem += type_image("デフォルト");
			}
			elem += "<div class='plan_item_name'>" + count_text(array[i]["name"]) + "</div>";
			if (i != array.length - 1) {
				elem += "<ons-button class='detail_item' value='" + i + "'>"
					+ check_image("info");
				"</ons-button>";
			}
			elem += "</ons-list-item>";
		}
	}else{
		console.log(array);
		elem = "<ons-list-item>"
			+ type_image("デフォルト")
			+ "<div class='plan_item_name'>" + count_text(array[array.length - 1]["name"]) + "</div>"
			+ "</ons-list-item>";
		$("#check_plan_list_head").html(elem);
		$("#check_plan_list_foot").html(elem);
		elem = "";
		for (let i = 0; i < array.length - 1; i++) {
			elem += "<ons-list-item>";
			if (i != array.length - 1) {
				elem += type_image(array[i]["purpose"]);
			}
			elem += "<p class='plan_item_name'>" + count_text(array[i]["name"])
				+ "</p>"
				+ "<ons-button remove_point='" + i + "' class='check_plan_remove'>"
				+ check_image("trash")
				+"</ons-button>"
				+ "</ons-list-item>";
		}
	}
	return elem;
}