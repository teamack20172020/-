//ローカルストレージに保存するために使う変数
var generation_array=Array();
//作成したプランを一時的に保存する変数
var generation_work=Array();
//引数（緯度、経度、出発地タイプ、目的,目的地,URL）
function generation_ajax(url){
	$.ajax({
		type: "GET",
		//url: "js/sample.json",
		url: "https://www.autotravelplan.com/" + url,
		dataType:"json",
		scriptCharset: "utf-8",
		timeout: 30000
	}).done(function(data){
		console.log(data);
		//今日の日付を取得
		let today=new Date();
		generation_work=data;
		generation_work["create_date"]=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
		generation_work["create_time"]=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
		console.log(generation_work);
		var elem="";
		for(let i=0;i<data.length;i++){
			elem+="<ons-list-item>"+data[i]["startPoint"]["name"]+"～"
				+data[i]["endPoint"]["name"]+"　　"
				+data[i]["time_ja"]+"</ons-list-item>";
		}
		$("#gene_plan_list").html(elem);
		$('#modal').hide();
	});
}
document.addEventListener('show', function(event) {
	var page= event.target;
	//質問ページの時のみ処理
	if(page.matches('#generation')){
		//スケジュール生成
		$("#gene_purpose").text("目的："+purpose);
		$("#gene_departure").text("出発地："+lat+lng);
		$("#gene_plan_list").html(
			"<ons-list-item>8時30分～9時00分 : 電車○○駅発</ons-list-item>"+
			"<ons-list-item>9時15分～10時30分 : </ons-list-item>"
		);
		//ajax();
		generation_ajax("travelplan/create/"+departure_type+"/"+lat+","+lng+"/"+purpose+"/37");
		//読み込み中画面を閉じる

	}
});
//「もう一度自動生成する」ボタンクリック
$(document).on("click","#again_plan",function(){
	$('#modal').show();
	document.getElementById("main").resetToPage('generation.html',{animation:'slide-ios'});
});
//「完了」ボタンクリック
$(document).on("click","#complete_plan",function(){
	//ローカルストレージから取得
	if(getLocalStorage("generation")!=null){
		generation_array=getLocalStorage("generation");
	}
	generation_array.push(generation_work);
	setLocalStorage("generation",generation_array);
	console.log(generation_array);
	alert("履歴に登録しました");
	document.getElementById("main").resetToPage('home.html',{animation:'slide-ios'});
});
//「キャンセル」ボタンクリック
$(document).on("click","#cancel_plan",function(){
	document.getElementById("main").resetToPage('home.html',{animation:'slide-ios'});
});
