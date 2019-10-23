/*
 * ajax通信を行う処理
 * param url:ajax通信をするURL
 * param method_type:成功時に返すメソッドの区分
 * param ajax_type:自作APIか外部APIかを判断する
 * return ajax通信のレスポンス
 */

function ajax(url,method_type,ajax_type,datatype){
	//var res;
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
		//method_typeに応じて処理を変更
		switch(method_type){
			//目的入力ページの目的取得ajax通信(purpose_input.js)
			case "purpose":setResP(data);break;
			//質問ページの質問取得ajax通信(question.js)
			case "question":setResQ(data);break;
			//住所ページの市区町村取得ajax通信(address.js)
			case "address_city":setResAC(data);break;
			//住所ページの緯度経度取得ajax通信(address.js)
			case "address_lanlng":setResAL(data);break;
			//駅ページの駅路線取得ajax通信(station.js)
			case "station_route":setResSR(data);break;
			//駅ページの駅詳細ajax通信(station.js)
			case "station_details":setResSD(data);break;
			//スケジュールページの自動生成ajax通信(generation.js)
			case "generation_auto":setResG(data);break;
		}
		console.log(data);
	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log("err:"+jqXHR.status); //例：404
		console.log(textStatus); //例：error
		console.log(errorThrown); //例：NOT FOUND
	}).always(function(){
	});
}
