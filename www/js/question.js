//変数定義
var id;
var answer;
var res =new Array();
var idlist =new Array();
var questionList = [];

//画面ロード直後の処理
$(function(){
	document.addEventListener('init', function(event) {
		var page= event.target;
		//質問ページの時のみ処理
		if(page.matches('#question')){
			var url = "question/getList";
			var list = ajax(url);
		}
	});
});

//ajax通信の結果退避
function setRes(resList){
	resList.forEach(function( row ) {
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

//昇順ソート
function compareFunc(a, b) {
	return a - b;
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

//目的決定処理（ぷらんの自動生成）
$(document).on('click','#sendAnswer', function(){
	res.sort(compareFunc);
	$("#main").html(res);
	var param = res.join(',');
	var url = "questionparam/save/" + param + "/" + answer;
	var list = ajax(url);
});
