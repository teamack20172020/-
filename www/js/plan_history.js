var history_array;
document.addEventListener('init', function (event) {
	var page = event.target;
	//質問ページの時のみ処理
	if (page.matches('#plan_history')) {
		if (getLocalStorage("generation")!=null){
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
//プランクリックじ
$(document).on("click", ".history_item", function () {
	var history_type = $(this).attr("value");
	document.getElementById('main').pushPage("plan_check.html", { data: { history_type } });
});
