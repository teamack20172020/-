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
//質問の目的idリストのidリスト
var idlist = new Array();
//目的id毎の質問id格納用変数
var work_array = new Array();
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
		ajax(questionurl,"question","in","json");
	}
});

//ajax通信の結果退避
function setResQ(data){
	data.forEach(function( row ) {
		questionList[row["id"]] = row["detail"];
	});
	data.forEach(function( row ){
		qpList[row["id"]] = row["objective_id"];
	});
	idlist = Object.keys(qpList);
	console.log(qpList);
	console.log(idlist);

	//目的id毎に質問idをwork_questionに格納する処理
	//o_id 目的id比較用変数(連番でチェック)
	//条件文は目的idリストのlength+1に変更予定?(目的idを連番にしてから)
	//TODO 連想配列化でループを減らす
	for(let o_id=1;o_id<10;o_id++){
		for(let i=0;i<idlist.length;i++){
			//目的idが質問の目的idと一致するか
			if(qpList[idlist[i]]==o_id){
				work_array.push(idlist[i]);
			}
		}
		//目的id毎の質問idリストをwork_questionに保存
		work_question.push(work_array);
		work_array=new Array();
	}
	//目的idが連番になれば不要(今は5番があるから必要)
	work_question.splice(4,1);
	console.log(work_question);
	question_set();
}

//出題用の質問を配列に退避
function question_set() {
	//質問回数分すべての目的idから最低1回ずつ質問を取得する
	var count = 0;
	//質問回数
	while (count < max_question) {
		//numListの初期化､設定
		numList = new Array;
		for(let i=0;i<work_question.length;i++){
			numList.push(i);
		}
		//目的idの種類数
		for(let j=0;j<8;j++){
			//num numList内の取得位置
			//o_key work_questionの取得位置
			//q_key work_questionの目的id内の取得位置
			//q_id 取得した質問id
			let num = Math.floor(Math.random() * numList.length);
			let o_key = numList[num];
			let q_key = Math.floor(Math.random() * work_question[o_key].length);
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

	//初期化処理
	qcount = 0;
	res = new Array();
	$("#modal").hide();
	viewQestion();
}

//質問をランダムに表示
function viewQestion(){
	//10回質問する処理
	if(qcount != max_question){
		radnum = Math.floor(Math.random() * question.length);
		id = question[radnum];
		$(".question_text").html('<p>' + questionList[id] + '</p>');
		question.splice(radnum, 1);
		qcount++;
	} else {
		//質問結果をもとに目的リストを取得するajax通信
		res.sort(compareFunc);
		//パラメータを"q"で区切る処理
		var param = res.join('q');
		var qurl = 'url' + param;
		//ajax(qurl,"test","in","json");
		//仮データ(ajax通信の返り値)
		p_array = ["1","3","4","6","8"];
		console.log(param);
		console.log(qurl);
		qres(p_array);
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
function qres(data){
	$('#modal').show();
	//目的リストからランダムに目的を決める処理
	p_array = data;
	purpose = p_array[Math.floor(Math.random() * data.length)];
	console.log(purpose);
	document.getElementById("main").pushPage("generation.html");
}
