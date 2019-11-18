//変数定義
var id;
var answer;
var res =new Array();
var idlist =new Array();
var objectiveList =new Array();
var objectiveAboutList=new Array();

//画面ロード直後の処理
document.addEventListener('init', function(event) {
	var page= event.target;
	//目的入力ページの時のみ処理
	if(page.matches('#purpose_input')){
		viewPurpose();
	}
});

//ajax通信の結果退避
function setResP(resList){
	resList.forEach(function( row ) {
		objectiveList[row["id"]] = row["title"];
		objectiveAboutList[row["id"]] = row["about"];
	});
	idlist = Object.keys(objectiveList);
	//目的IDを保存した配列を出すコンソール
	//console.log(idlist);
}

//目的セレクトボックスを表示
function viewPurpose(){
	var option = "";
	for(i = 0; i <= idlist.length -1;i++){
		option += "\t\t<option value='" + idlist[i] + "'>" + objectiveAboutList[idlist[i]] +"</option>\n";
	}
	$("#purpose_select select").html(option);
	$("#modal").hide();
}

//目的決定ボタンクリック処理
$(document).on("click","#submit_purpose",function(){
	purpose=$("#purpose_select").val();
	//目的が決定した際の目的を出すコンソール
	//console.log("目的:"+purpose);
	$('#modal').show();
	document.getElementById("main").pushPage("generation.html");
});
