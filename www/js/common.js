//ページ遷移
$(function(){
	rotes = new AppRotes();
	$("#test").load("akinator_view.html");

	$(document).on("click",".nextpage",function(){
		console.log($(this).attr("id"));
		nextpage = rotes.getRote($(this).attr("id"));
		console.log(nextpage);
		if(nextpage != ""){
			//次のページに移動
			document.getElementById("main").pushPage(nextpage + ".html");
		}
	});

	$(document).on("click",".backpage",function(){
		//前のページに移動
		document.getElementById("main").popPage();

	});
});

//パラメタソート
function compareFunc(a, b) {
	return a - b;
}
//引数のURLのjavascriptファイルを取得する
function afterreadJS(url){
	$('body').append("<script src='js/"+url+".js'></script>");

}
