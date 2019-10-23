document.addEventListener('init', function (event) {
	var page = event.target;
	//質問ページの時のみ処理
	if (page.matches('#plan_check')) {
		//データ取得
		var history_type = page.data.history_type;
		let check_data = history_array[history_type];
		//スケジュール出力
		let elem = "";
		for (let i = 0; i < check_data["data"].length; i++) {
			elem += "<ons-list-item  modifier='chevron' tappable>" + check_data["data"][i]["startPoint"]["name"] + "～"
				+ check_data["data"][i]["endPoint"]["name"] + "　　"
				+ check_data["data"][i]["time_ja"] + "</ons-list-item>";
		}
		$("#check_plan_list").html(elem);
	}
});
