//変数定義
var questionList = [];
var qcount = 0;
var parray = new Array();
var res = new Array();

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
	res = new Array();
	$("#modal").hide();
	viewQestion();
}

//質問をランダムに表示
function viewQestion(){
	//10回質問する処理
	if(qcount != 10){
		radnum = Math.floor(Math.random() * idlist.length);
		id = idlist[radnum];
		$(".question_text").html('<p>' + questionList[id] + '</p>');
		idlist.splice(radnum, 1);
		qcount++;
	} else {
		//質問結果をもとに目的リストを取得するajax通信
		res.sort(compareFunc);
		//パラメータを"q"で区切る処理
		var param = res.join('q');
		var qurl = 'url' + param;
		//ajax(qurl,"test","in","json");
		//仮データ(ajax通信の返り値)
		parray = ["1","3","4","6","8"];
		console.log(param);
		console.log(qurl);
		qres(parray);
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
		//var param = res.join('q');
		//ajax('/Questionparam/save/' + param + '/' + id);
		//$("#main").html(res);
		document.getElementById("main").pushPage("generation.html");
	}
	*/
}

//回答時の処理
$(document).on('click','.answer', function(){
	if($(this).attr("id") == "yes"){
		//はいを選択時の処理
		res.push(('000' + id).slice(-4) + "1");
	}else{
		//いいえを選択時の処理
		res.push(('000' + id).slice(-4) + "0");
	}
	viewQestion();
});

//ajax通信で目的リストを取得
function qres(data){
	$('#modal').show();
	//目的リストからランダムに目的を決める処理
	purpose = data[Math.floor(Math.random() * data.length)];
	console.log(purpose);
	document.getElementById("main").pushPage("generation.html");
}
