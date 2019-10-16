var generation_array=array();
$(function(){
	//引数（緯度、経度、目的）
	function generation_ajax(lat,lng,purpose,url){
		let latlng=lat+","+lng;
		$.ajax({
			type: "GET",
			url: "js/sample.json",
			//url: "https://www.autotravelplan.com/" + url,
			// data:{
			// 	latlng:latlng,
			// 	purpose:purpose
			// },
			dataType:"json",
			scriptCharset: "utf-8",
			timeout: 30000
		}).done(function(data){
			generation_array=data;
			console.log(data);
			var elem="";
			for(let i=0;i<data["data"].length;i++){
				elem+="<ons-list-item>"+data["data"][i]["title"]+"　"
					+data["data"][i]["time_before"]+"~"
					+data["data"][i]["time_after"]+"</ons-list-item>";
			}
			$("#gene_plan_list").html(elem);

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
			generation_ajax(lat,lng,purpose,"");
			//読み込み中画面を閉じる
			$('#modal').hide();

		}
	});
	//「もう一度自動生成する」ボタンクリック
	$(document).on("click","#again_plan",function(){
		$('#modal').show();
		document.getElementById("main").resetToPage('generation.html',{animation:'slide-ios'});
	});
	//「完了」ボタンクリック
	$(document).on("click","#complete_plan",function(){
		alert("履歴に登録しました");
		document.getElementById("main").resetToPage('home.html',{animation:'slide-ios'});
	});
	//「キャンセル」ボタンクリック
	$(document).on("click","#cancel_plan",function(){
		document.getElementById("main").resetToPage('home.html',{animation:'slide-ios'});
	});
});
