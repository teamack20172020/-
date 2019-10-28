//変数定義
var questionList = [];
var qcount = 0;

//画面ロード直後の処理
document.addEventListener('init', function(event) {
	var page= event.target;
	//質問ページの時のみ処理
	if(page.matches('#question')){
		var questionurl = "question/getList";
		ajax(questionurl,"question","in","json");
	}
});

//ajax通信の結果退避
function setResQ(data){
	data.forEach(function( row ) {
		questionList[row["id"]] = row["detail"];
	});
	idlist = Object.keys(questionList);
	qcount = 0;
	viewQestion();
}

//質問をランダムに表示
function viewQestion(){
	console.log(idlist);
	//10回質問する処理
	if(qcount != 10){
		radnum = Math.floor(Math.random() * idlist.length);
		id = idlist[radnum];
		$(".question_text").html('<p>' + questionList[id] + '</p>');
		$("#modal").hide();
		idlist.splice(radnum, 1);
		qcount++;
	}else{
		//1~4までの目的idをランダムに指定(デモ用)
		purpose = Math.floor(Math.random() * 4)+1;
		document.getElementById("main").pushPage("generation.html");
	}
	/* 全件質問する処理
	if(idlist.length > 0){
		radnum = Math.floor( Math.random() * idlist.length );
		id = idlist[radnum];
		$(".question_text").html('<p>' + questionList[id] + '</p>');
		$("#modal").hide();
		idlist.splice(radnum,1);
	}else{
		//質問結果の保存(データ収集用)
		//res.sort(compareFunc);
		//var param = res.join(',');
		//ajax('/Questionparam/save/' + param + '/' + id);
		//$("#main").html(res);
		document.getElementById("main").pushPage("generation.html");
	}
	*/
}

//目的が決定したらプランの自動生成を行う(5桁左0詰め)
$(document).on('click','.answer', function(){
	if($(this).attr("id") == "yes"){
		//はいを選択時の処理
		//res.push(('000' + id).slice(-4) + "1");
	}else{
		//いいえを選択時の処理
		//res.push(('000' + id).slice(-4) + "0");
	}
	viewQestion();
});
