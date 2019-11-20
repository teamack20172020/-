//ローカルストレージに保存するために使う変数
var generation_array = new Array();
//自動生成APIのURL「travelplan/create/」
var ge_url = "travelplan/create/";
//作成したプランを一時的に保存する変数
var g_work = {};
//目的idリストの取得位置
var p_count = 0;
var cnt = 0;
//距離APIで使うカウント変数
var count_dis = 0;

//画面が読み込まれたときの処理
document.addEventListener('init', function (event) {
	g_work = {};
	var page = event.target;
	//プラン生成ページの時のみ処理
	if (page.matches('#generation')) {
		//目的idリストが存在する時(質問で目的を決める場合)
		if (p_array.length > 0) {
			main_purpose = p_array[p_count];
			if (main_purpose == p_array[cnt]) {
				cnt++;
			}
			sub_purpose = p_array[cnt];
			cnt++;
			if (cnt == p_array.length) {
				cnt = 0;
				p_count++;
			}
			if (p_count == p_array.length - 1 && cnt == p_array.length - 1) {
				cnt = 0;
				p_count = 0;
			}
			//メイン目的、サブ目的を出すコンソール
			//console.log("メイン目的:"+main_purpose);
			//console.log("サブ目的:"+sub_purpose);
		} else {
			main_purpose = purpose;
			sub_purpose = 1;
		}
		//中間発表用 削除予定
		areaid = 37;
		//main_purpose = 7;
		//sub_purpose = 1;
		//自動生成APIと通信
		ajax(ge_url + departure_type + "/" + lat + "," + lng + "/" + main_purpose + "/" + sub_purpose + "/" + areaid, "generation_auto", "in", "json");
	}
});

//プラン自動生成ajax通信の結果退避
function setResG(resg) {
	//今日の日付を取得
	let today = new Date();
	/*取得した配列からクライアント側で使う配列に変換（APIからの返り値が変わるため削除予定）*/
	/**「g_work」配列の中身
	 * data : 生成したプランの詳細データ
	 * create_purpose : 生成した時のメイン目的
	 * create_departure : 生成した時の出発地
	 * create_date : 生成した時のの日にち
	 * create_time : 生成した時の時間
	 */
	g_work["data"] = resg;
	g_work["create_purpose"] = main_purpose;
	g_work["create_departure"] = departure_type;
	g_work["create_date"] = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	g_work["create_time"] = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	//plan_check.jsのsend_array配列に詳細画面で送る配列を保存する
	send_array = resg;
	//距離APIのURL
	viewGeneration(resg);
}

//自動生成したプランを表示する
function viewGeneration(viewg) {
	var elem = "";
	elem += "<ons-list-item>"
		+ "<div class='plan_item_name'>" + count_text(viewg[viewg.length - 1]["name"]) + "</div>"
		+ "</ons-list-item>";
	for (let i = 0; i < viewg.length; i++) {
		elem += "<div class='plan_item_time'>"
			+ "<div class='text_check'>↓" + viewg[i][0]["time_ja"] + "</div>"
			+ "<ons-button class='generation_item' value='" + i + "'><i class='fas fa-map-marked-alt'></i></ons-button>"
			+ "</div>"
			+ "<ons-list-item>"
			+ "<div class='plan_item_name'>" + count_text(viewg[i]["name"]) + "</div>";
		if (i != viewg.length - 1) {
			elem += "<ons-button class='detail_item' value='" + i + "'><i class='fas fa-info-circle'></i></ons-button>";
		}
		elem += "</ons-list-item>";
	}
	$("#gene_purpose").html("目的：" + objectiveList[idlist[main_purpose - 1]]);
	$("#gene_departure").html("出発地：" + departure_type);
	$("#gene_plan_list").html(elem);
	//読み込み中画面を閉じる
	$('#modal').hide();
}

//プランクリック時の処理
$(document).on("click", ".generation_item", function () {
	//チェックされた項目を取得
	let ge_type = $(this).attr("value");
	let work_ge = g_work["data"];
	if (ge_type == 0) {
		//ブラウザを表示
		cordova.InAppBrowser.open(googlemapurl + work_ge[work_ge.length - 1]["address"]
			+ "/" + work_ge[ge_type]["address"], '_blank', 'location=no,closebuttoncaption=戻る,toolbarposition=top');
	} else {
		//ブラウザを表示
		cordova.InAppBrowser.open(googlemapurl + work_ge[ge_type - 1]["address"]
			+ "/" + work_ge[ge_type]["address"], '_blank', 'location=no,closebuttoncaption=戻る,toolbarposition=top');
	}
});

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
	//ローカルストレージに保存した配列を出すコンソール
	//console.log(generation_array);
	//目的idリスト関係の初期化処理
	p_array = new Array();
	p_count = 0;
	cnt = 0;
	$("#generation_ok").show();
});

//「キャンセル」ボタンクリック
$(document).on("click", "#cancel_plan", function () {
	//目的idリスト関係の初期化処理
	p_array = new Array();
	p_count = 0;
	cnt = 0;
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
});
