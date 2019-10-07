//変数定義
var id;
var answer;
var res =new Array();
var idlist =new Array();
var objectiveList = [];

//画面ロード直後の処理
$(function(){
	var url = "objective/getList";
	var list = ajax(url);
});

//ajax通信の結果退避
function setRes(resList){
	resList.forEach(function( row ) {
		objectiveList[row["id"]] = row["about"];
	});
	idlist = Object.keys(objectiveList);
	viewQestion();
}

//質問をランダムに表示
function viewQestion(){
	var option = "";
	for(i = 0; i <= idlist.length -1;i++){
		option += "\t\t<option value'" + idlist[i] + "'>" + objectiveList[idlist[i]] +"</option>\n";
	}
	var form = "<form action='question.html' method='post'>\n";
	form += "\t<select name='option'>" + option + "</select>\n";
	form += "\t<button type='submit'>質問開始</button>\n";
	form += "</form>";
	$("#main").html(form);

}

//昇順ソート
function compareFunc(a, b) {
	return a - b;
}

//目的が決定したらプランの自動生成を行う
$(document).on('click','.answer', function(){
	if($(this).attr("id") == "yes"){
		res.push(id + "0");
	}else{
		res.push(id + "1");
	}
	viewQestion();
});

//目的決定処理（ぷらんの自動生成）
$(document).on('click','#sendAnswer', function(){
	res.sort(compareFunc);
	$("#main").html(res);
	var param = res.join(',');
	var url = param + "/" + answer;
});
