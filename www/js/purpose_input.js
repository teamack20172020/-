//変数定義
var id;
var answer;
var res =new Array();
var idlist =new Array();
var objectiveList =new Array();

//画面ロード直後の処理
document.addEventListener('init', function(event) {
	var page= event.target;
	//目的入力ページの時のみ処理
	if(page.matches('#purpose_input')){
		var purposeurl = "objective/getList";
		ajax(purposeurl,"purpose","in","json");
	}
});

//ajax通信の結果退避
function setResP(resList){
	console.log(resList);
	resList.forEach(function( row ) {
		objectiveList[row["id"]] = row["title"];
		console.log(row["title"]);
	});
	idlist = Object.keys(objectiveList);
	console.log(idlist);
	viewPurpose();
}

//目的セレクトボックスを表示
function viewPurpose(){
	var option = "";
	for(i = 0; i <= idlist.length -1;i++){
		option += "\t\t<option value='" + idlist[i] + "'>" + objectiveList[idlist[i]] +"</option>\n";
	}
	console.log(objectiveList[0]);
	$("#purpose_select select").html(option);
	$("#modal").hide();
}

//目的決定ボタンクリック処理
$(document).on("click","#submit_purpose",function(){
	purpose=$("#purpose_select").val();
	console.log(purpose);
	$('#modal').show();
	document.getElementById("main").pushPage("generation.html");
});
