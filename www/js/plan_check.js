$(function(){
	document.addEventListener('init', function(event) {
		var page= event.target;
		//質問ページの時のみ処理
		if(page.matches('#plan_check')){
			//データ取得
			var history_type=page.data.history_type;
			//スケジュール出力
			$("#check_plan_list").html(
				"<ons-list-item>8時30分～9時00分 : 電車○○駅発</ons-list-item>"+
				"<ons-list-item>9時15分～10時30分 : </ons-list-item>"
			);
		}
	});
});
