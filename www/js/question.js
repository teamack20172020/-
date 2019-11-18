//変数定義
//質問の内容リスト
var questionList = new Array();
var qcount = 0;
//質問によって決まった目的idリスト
var p_array = new Array();
//送信用パラメータ
var res = new Array();
//work_questionの取得位置リスト
var numList = new Array();
//質問の目的idリスト
var qpList = new Array();
//すべての質問を目的id別に分けた変数
var work_question = new Array();
//質問する質問リスト
var question = new Array();
//最大質問回数
var max_question = 10;

//画面ロード直後の処理
document.addEventListener('init', function(event) {
	var page= event.target;
	//質問ページの時のみ処理
	if(page.matches('#question')){
		var questionurl = "question/getList";
		ajax(questionurl, "question", "in", "json");
	}
});

//ajax通信の結果退避
function setResQ(data){
	//初期化処理
	qpList = new Array();
	work_question = new Array();
	question = new Array();
	//qpListにdataの中身を格納
	data.forEach(function (val){
		qpList.push({ 
					'question_id': val['id']
					, 'objective_id': val['objective_id']
					, 'detail': val['detail']
				});
	});
	//qplistを出すコンソール
	//console.log(qpList);	

	//目的id毎の質問idをwork_questionに格納する処理
	for (let i = 0; i < qpList.length;i++){
		objectiveid = 'obj_' + qpList[i]["objective_id"];
		if (work_question[objectiveid]){
			work_question[objectiveid].push(qpList[i]["question_id"]);
		}else{
			let newList = new Array();
			newList.push(qpList[i]["question_id"]);
			work_question[objectiveid] = newList;
		}
	}
	//目的id毎の質問idを格納した配列(work_question)を出すコンソール
	//console.log("work_question:"+work_question);
	question_set();
}

//出題用の質問を配列に退避
function question_set() {
	//初期化処理
	let count = 0;
	qcount = 0;
	res = new Array();
	//質問回数分すべての目的idから最低1回ずつ質問を取得する
	while (count < max_question) {
		//numListの初期化､設定
		numList = Object.keys(work_question);
		//目的idの種類数
		for(let j=0;j<Object.keys(work_question).length;j++){
			//num numList内の取得位置
			//o_key work_questionの取得キー
			//q_key work_questionの目的id内の取得位置
			//q_id 取得した質問id
			let num = Math.floor(Math.random() * numList.length);
			let o_key = numList[num];
			let q_key = Math.floor(Math.random() * Object.keys(work_question[o_key]).length);
			let q_id = work_question[o_key][q_key];
			numList.splice(num,1);
			//work_questionから取得した質問を削除
			work_question[o_key].splice(q_key,1);
			question.push(q_id);
			count++;
			if(count >= max_question){
				break;
			}
		}
	}
	//質問を出すコンソール
	//console.log("question:"+question);
	$("#modal").hide();
	viewQestion();
}

//質問をランダムに表示
function viewQestion(){
	//10回質問する処理
	if(qcount != max_question){
		radnum = Math.floor(Math.random() * question.length);
		id = question[radnum];
		//qpListから質問idに一致するデータを取得
		question_details = qpList.find((v) => v.question_id === id);
		$(".question_text").html('<p>' + question_details['detail'] + '</p>');
		question.splice(radnum, 1);
		qcount++;
	} else {
		$('#modal').show();
		//質問結果をもとに目的リストを取得するajax通信
		res.sort(compareFunc);
		//パラメータを"q"で区切る処理
		var param = res.join('q');
		//paramを出すコンソール
		//console.log("param:"+param);
		var qurl = 'answer-objective/getList/' + param;
		ajax(qurl,"answer","in","json");
	}
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
function setResQA(data){
	//目的リストからランダムに目的を決める処理
	for(let i=0;i<data.length;i++){
		p_array.push(data[i]["objective_id"]);
	}
	document.getElementById("main").pushPage("generation.html");
}
