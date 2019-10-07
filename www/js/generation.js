$(function(){
	document.addEventListener('show', function(event) {
		var page= event.target;
		//質問ページの時のみ処理
		if(page.matches('#generation')){
			//スケジュール生成
			$("#gene_purpose").text("目的："+purpose);
			$("#gene_place").text("目的地："+place);
			$("#gene_departure").text("出発地："+departure);
			$("#gene_plan_list").html(
				"<ons-list-item>8時30分～9時00分 : 電車○○駅発</ons-list-item>"+
				"<ons-list-item>9時15分～10時30分 : </ons-list-item>"
			);
			//読み込み中画面を閉じる
			$('#modal').hide();

		}
	});
	//「もう一度自動生成する」ボタンクリック
	$(document).on("click","#again_plan",function(){
		$('#modal').show();
		document.getElementById("main").resetToPage('generation.html',{animation:'slide-ios'});
	});
	//「完了」ボタンクリック
	$(document).on("click","#complete_plan",function(){
		alert("履歴に登録しました");
		document.getElementById("main").resetToPage('home.html',{animation:'slide-ios'});
	});
	//「キャンセル」ボタンクリック
	$(document).on("click","#cancel_plan",function(){
		document.getElementById("main").resetToPage('home.html',{animation:'slide-ios'});
	});
});
