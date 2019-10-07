$(function(){
	//アキネイターのプログラムメソッド
	function akinator_program(){
		//結果が返った時の処理
		if(akinator_sum>=10){
			//目的地質問ありの場合
			// if(akinator_type==0){
			// 	document.getElementById("main").pushPage("destination.html");
			// }else{
			// 	$('#modal').show();
			// 	document.getElementById("main").pushPage("generation.html");
			// }

			//スケジュール画面へ移動
			$('#modal').show();
			document.getElementById("main").pushPage("generation.html");
		}else{
			//次の質問へ移動
			document.getElementById("main").pushPage("question.html");
		}
	}

	//アキネイターの質問を出力
	// let elem = document.getElementById("question_text");
	// elem.text("vavavff");

	document.addEventListener('init', function(event) {
		var page= event.target;
		//質問ページの時のみ処理
		if(page.matches('#question')){
			//質問出力
			if(akinator_type==0){
				$("#question .question_text").text("主にインドアですか？");
			}else{
				$("#question .question_text").text("関東に行きたいですか？");
			}
		}
	});
	//選択肢をクリックした時の処理
	$(document).on("click","#question .answer",function(){
		//選択肢の値を取得
		var choice=$(this).attr("choice");
		console.log(choice);
		akinator_sum++;
		akinator_program();
	});
});
