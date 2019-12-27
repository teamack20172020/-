//プラン一覧画面で削除するときのアラート表示処理
function viewAlertHIS() {
	let view_text = "本当にこのプランを削除しても良いですか?※二度と同じプランは作成できないかもしれません";
	$("#plan_remove_alert_text").html(view_text);
	$("#plan_remove_alert_ok").attr("onclick", "removePlan('his');");
	//アラートを表示(alert_dialog.jsに処理は記載)
	$("#remove-alert-dialog").show();
}

//プラン履歴画面で最後の施設を削除するときに出すアラート表示処理
function viewAlertCHE(re_num) {
	let view_text = "施設がなくなるのでプランを削除しますがよろしいですか？";
	$("#plan_remove_alert_text").html(view_text);
	history_remove_num = re_num;
	$("#plan_remove_alert_ok").attr("onclick", "removePlan('che');");
	//アラートを表示(alert_dialog.jsに処理は記載)
	$("#remove-alert-dialog").show();
}

//住所指定の出発地入力画面でアラートを出す処理
function viewAlertADD() {
	let view_text = "丁目番地号が入力されていません";
	$("#alert_text").html(view_text);
	$("#my-alert-dialog").show();
}

//アラートディアログのキャンセルボタンの処理
function cancelAlert(name) {
	$("#plan_title_in").val("");
	$("#" + name).hide();
}

//plan_historyの履歴を削除するメソッド
function removePlan(type) {
	//要素を削除した後の配列
	let remove_after = history_array.splice(history_remove_num, 1);
	//プランを削除した後の配列と削除する前の配列を出すコンソール
	//console.log(remove_after);
	//console.log(history_array);
	setLocalStorage("generation", history_array);
	$("#remove-alert-dialog").hide();
	if (type == "his") {
		//plan_history.jsファイルのメソッド
		viewHistory(1);
	} else {
		document.getElementById("main").popPage();
	}
}

//generation.jsの完了ボタンがクリックされてアラート出た時の処理
function ge_ok() {
	//タイトル情報取得
	let p_title = htmlspecialchars($("#plan_title_in").val());
	//ローカルストレージから取得
	if (getLocalStorage("generation") != null) {
		generation_array = getLocalStorage("generation");
	}
	let nen = g_work["create_date"].split("-");
	let jikan = g_work["create_time"].split(":");
	if (p_title.length <= 0 || p_title == null) {
		p_title = nen[0] + "年" + nen[1] + "月" + nen[2] + "日　" + jikan[0] + "時" + jikan[1] + "分";
	}
	//generation.jsにあるg_workにタイトルを追加してローカルストレージに保存する
	p_title = getLen(p_title);
	g_work["title"] = p_title;
	//タイトルの入ったプランをコンソールに出す
	//console.log(g_work);
	generation_array.push(g_work);
	//ローカルストレージに生成したプランを保存
	setLocalStorage("generation", generation_array);
	//ローカルストレージに保存した配列を出すコンソール
	//console.log(generation_array);
	$("#plan_title_in").val("");
	$("#generation_ok").hide();
	//もう一度生成した時用にhome.htmlをスタックの最後に入れる
	let navi = document.getElementById('main');
		//スタックにあるページ一覧を表示するコンソール
	if(navi.pages.length>2){
		navi.insertPage(0, "home.html");
		//スタックにあるページ一覧を表示するコンソール
		//console.log(navi.pages);
	}
	history_array = getLocalStorage("generation");
	history_type = history_array.length - 1;
	his_work = history_array[history_type];
	//plan_checkに送る配列を表示するコンソール
	//console.log(his_work);
	document.getElementById('main').pushPage("plan_check.html", { data: { his_work, history_type }, animation: 'slide-ios' });
	//document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
}

//読み込み（ajax通信など）に失敗したときに出すアラート処理
function load_err(){
	$('#load_err_dialog').hide();
	let navi = document.getElementById('main');
	if (navi.pages[navi.pages.length-1]["id"]!="title"){
		document.getElementById("main").resetToPage('title.html', { animation: 'slide-ios' });
	}
}
