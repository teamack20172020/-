//変数定義
var id;
var answer;
var res =new Array();
var idlist =new Array();
var questionList = [];

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
	viewQestion();
}

//質問をランダムに表示
function viewQestion(){
	if(idlist.length > 0){
		radnum = Math.floor( Math.random() * idlist.length );
		id = idlist[radnum];
		$(".question_text").html('<p>' + questionList[id] + '</p>');
		$("#modal").hide();
		idlist.splice(radnum,1);
	}else{
		//質問結果の保存(データ収集用)
		res.sort(compareFunc);
		var param = res.join(',');
		//ajax('/Questionparam/save/' + param + '/' + id);
		//$("#main").html(res);
		document.getElementById("main").pushPage("generation.html");
	}
}

//目的が決定したらプランの自動生成を行う(5桁左0詰め)
$(document).on('click','.answer', function(){
	if($(this).attr("id") == "yes"){
		res.push(('000' + id).slice(-4) + "1");
	}else{
		res.push(('000' + id).slice(-4) + "0");
	}
	viewQestion();
});
