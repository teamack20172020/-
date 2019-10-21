var history_array;
document.addEventListener('init', function(event) {
	var page= event.target;
	//質問ページの時のみ処理
	if(page.matches('#plan_history')){
		history_array=getLocalStorage("generation");
		//履歴出力
		let elem="";
		$("#history_plan_list").html(
			"<ons-list-item class='history_item' modifier='chevron' value='0' tappable>出発地：香川県、目的：レジャー</ons-list-item>"+
			"<ons-list-item class='history_item' modifier='chevron' value='1' tappable>出発地：東京都、目的：リフレッシュ</ons-list-item>"+
			"<ons-list-item class='history_item' modifier='chevron' value='2' tappable>出発地：神奈川県、目的：歴史</ons-list-item>"
		);
		for(let i=0;i<history_array.length;i++){
			elem+="<ons-list-item class='history_item' modifier='chevron' value='"+i+"' tappable>"
				+history_array[i]["create_date"]+"</ons-list-item>"
		}
		$("#history_plan_list").html(elem);


	}
});
//プランクリックじ
$(document).on("click",".history_item",function(){
	var history_type=$(this).attr("value");
	document.getElementById('main').pushPage("plan_check.html",{data:{history_type}});
});
