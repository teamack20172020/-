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
	console.log(remove_after);
	console.log(history_array);
	setLocalStorage("generation", history_array);
	$("#" + name).hide();
	//plan_history.jsファイルのメソッド
	viewHistory(1);
}

//generation.jsの完了ボタンがクリックされてアラート出た時の処理
function ge_ok(){
	$("#generation_ok").hide();
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
}