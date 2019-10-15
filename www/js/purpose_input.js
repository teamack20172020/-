
//変数定義
var id;
var answer;
var res =new Array();
var idlist =new Array();
var objectiveList = [];

//画面ロード直後の処理
$(function(){
	document.addEventListener('init', function(event) {
		var page= event.target;
		//質問ページの時のみ処理
		if(page.matches('#purpose_input')){
			console.log("目的（決まっている）画面表示");
			var url = "objective/getList";
			var list = ajax(url);
		}
	});
});

//ajax通信の結果退避
function setRes(resList){
	resList.forEach(function( row ) {
		objectiveList[row["id"]] = row["title"];
	});
	idlist = Object.keys(objectiveList);
	viewQestion();
}

function viewQestion(){
	var option = "";
	for(i = 0; i <= idlist.length -1;i++){
		option += "\t\t<option value'" + idlist[i] + "'>" + objectiveList[idlist[i]] +"</option>\n";
	}
	$("#purpose_select").html(option);
	$("#modal").hide();
}
//目的決定ボタンクリック処理
$(document).on("click","#submit_purpose",function(){
	purpose=$("#purpose_select").val();
	$('#modal').show();
	document.getElementById("main").pushPage("generation.html");
});
