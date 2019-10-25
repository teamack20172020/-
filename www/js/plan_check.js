//一つのプランが格納される変数
var check_data;
document.addEventListener('init', function (event) {
	var page = event.target;
	//プラン確認ページの時のみ処理
	if (page.matches('#plan_check')) {
		//データ取得
		let history_type = page.data.history_type;
		check_data = history_array[history_type]['data'];
		//スケジュール出力
		let elem = "";
		for (let i = 0; i < check_data.length; i++) {
			elem += "<ons-list-item  modifier='chevron' class='check_item' value='" + i + "' tappable>" + check_data[i]["startPoint"]["name"] + "～"
				+ check_data[i]["endPoint"]["name"] + "　　"
				+ check_data[i]["time_ja"] + "</ons-list-item>";
		}
		$("#check_plan_list").html(elem);
	}
});

//プランクリック時の処理
$(document).on("click", ".check_item", function () {
	let check_type = $(this).attr("value");
	let work_check = check_data[check_type];
	document.getElementById('main').pushPage("plan_detail.html", { data: { work_check } });
});
