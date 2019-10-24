var history_array;

document.addEventListener('init', function (event) {
	var page = event.target;
	//プラン履歴ページの時のみ処理
	if (page.matches('#plan_history')) {
		//ローカルストレージにプランが保存されているかどうか
		if (getLocalStorage("generation")!=null){
			//ローカルストレージから生成済みプラン一覧の取得
			history_array = getLocalStorage("generation");
			console.log(history_array);
			//履歴出力
			let elem = "";
			for (let i = 0; i < history_array.length; i++) {
				elem += "<ons-list-item class='history_item' modifier='chevron' value='" + i + "' tappable>"
					+ history_array[i]["create_date"] + "</ons-list-item>"
			}
			$("#plan_history_list").html(elem);
		}else{
			$("#plan_history_error").html("履歴はありません");
		}
	}
});

//プランのどれかをタップ時
$(document).on("click", ".history_item", function () {
	var history_type = $(this).attr("value");
	//プラン確認ページに選択したプラン情報を送信し表示
	document.getElementById('main').pushPage("plan_check.html", { data: { history_type } });
});
