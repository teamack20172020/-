$(function(){
	var sample_count=0;
	document.addEventListener('init', function(event) {
		var page= event.target;
		//質問ページの時のみ処理
		if(page.matches('#sample_question')){

		}
	});
	$(document).on("click",".sample_answer",function(){
		//選択肢の値を取得
		var choice=$(this).attr("id");
		console.log(choice);
		sample_question+="0"+choice;
		sample_count++;
		if(sample_count>1){
			document.getElementById("main").pushPage("sample_result.html");
		}else{
			document.getElementById("main").pushPage("sample_question.html");
		}

	});
});
