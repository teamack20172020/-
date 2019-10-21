//ajax引数(url:ajax通信をするURL,method_type:成功時に返すメソッドの区分,ajax_type:自作APIか外部APIかを判断する)
function ajax(url,method_type,ajax_type,datatype){
	var res;
	if(ajax_type == "in"){
		url="https://www.autotravelplan.com/" + url;
	}
	$.ajax({
		type: "GET",
		url: url,
		dataType:datatype,
		scriptCharset: "utf-8",
		timeout: 30000,
	}).done(function(data,textStatus,jqXHR) {
	//	if(data.length > 0 ){
			switch(method_type){
				//質問ページの質問取得ajax通信
				case "question":setResQ(data);break;
				//住所ページの市区町村取得ajax通信
				case "address_city":setResAC(data);break;
				//住所ページの緯度経度取得ajax通信
				case "address_lanlng":setResAL(data);break;
				//駅ページの駅路線取得ajax通信
				case "station_route":setResSR(data);break;
				//駅ページの駅詳細ajax通信
				case "station_details":setResSD(data);break;
				//スケジュールページの自動生成ajax通信
				case "generation_auto":setResG(data);break;
	//		}
			console.log(data);
		}
	}).fail(function(jqXHR, textStatus, errorThrown){
			$("#p1").text("err:"+jqXHR.status); //例：404
			$("#p2").text(textStatus); //例：error
			$("#p3").text(errorThrown); //例：NOT FOUND
	}).always(function(){
	});
}
