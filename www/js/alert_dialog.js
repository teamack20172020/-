/**アラートディアログのキャンセルボタンの処理
 * @param  {String} name : キャンセルしたいアラートディアログのID名
 */
function cancelAlert(name){
	$("#"+name).hide();
}

//plan_historyの履歴を削除するメソッド
function removePlan(name){
	//要素を削除した後の配列
	let remove_after = history_array.splice(history_remove_num, 1);
	//プランを削除した後の配列と削除する前の配列を出すコンソール
	//console.log(remove_after);
	//console.log(history_array);
	setLocalStorage("generation", history_array);
	$("#" + name).hide();
	//plan_history.jsファイルのメソッド
	viewHistory(1);
}

//generation.jsの完了ボタンがクリックされてアラート出た時の処理
function ge_ok(){
	//タイトル情報取得
	let p_title = $("#plan_title_in").val();
	//ローカルストレージから取得
	if (getLocalStorage("generation") != null) {
		generation_array = getLocalStorage("generation");
	}
	let nen = g_work["create_date"].split("-");
	let jikan=g_work["create_time"].split(":");
	if(p_title.length<=0 || p_title==null){
		p_title = nen[0] + "年" + nen[1] + "月" + nen[2] + "日　" + jikan[0] + "時" + jikan[1]+"分";
	}
	//generation.jsにあるg_workにタイトルを追加してローカルストレージに保存する
	g_work["title"]=p_title;
	console.log(g_work);
	generation_array.push(g_work);
	//ローカルストレージに生成したプランを保存
	setLocalStorage("generation", generation_array);
	//ローカルストレージに保存した配列を出すコンソール
	//console.log(generation_array);
	$("#plan_title_in").val("");
	$("#generation_ok").hide();
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
}