$(function(){
	document.addEventListener('init', function(event) {
		var page= event.target;
		//質問ページの時のみ処理
		if(page.matches('#plan_check')){
			//データ取得
			var history_type=page.data.history_type;
			let data=history_array[history_type];
			let elem="";
			//スケジュール出力
			$("#check_plan_list").html(
				"<ons-list-item>8時30分～9時00分 : 電車○○駅発</ons-list-item>"+
				"<ons-list-item>9時15分～10時30分 : </ons-list-item>"
			);
			for(let i=0;i<data["data"].length;i++){
				elem+="<ons-list-item>"+data["data"][i]["startName"]+"～"
					+data["data"][i]["endName"]+"　　"
					+data["data"][i]["time_ja"]+"</ons-list-item>";
			}
			$("#check_plan_list").html(elem);

		}
	});
});
