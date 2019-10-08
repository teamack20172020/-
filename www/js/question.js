//変数定義
var sitsumon = new Array();		//質問一覧
var kaitou=[];	//回答済み質問一覧
var main=0;			//メイン分類用乱数
var main2=0;		//メイン分類比較用乱数
var rand=0;	//質問取得乱数
var count=1;		//質問回数

//画面ロード直後の処理
$(function(){
	document.addEventListener('init', function(event) {
		var page= event.target;
		//質問ページの時のみ処理
		if(page.matches('#question')){
			var url = "question/getList";
			var list = ajax(url);
		}
	});
});

//ajax通信の結果退避
function setRes(resList){
	resList={"0":[{"id":1,"text":"text1","type":[{"0":1,"1":1,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0}]},{"id":2,"text":"text2","type":[{"0":0,"1":0,"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0}]}],"1":[{"id":3,"text":"text3","type":[{"0":0,"1":0,"2":1,"3":1,"4":0,"5":0,"6":0,"7":0,"8":0}]}],"2":[{"id":4,"text":"text4","type":[{"0":0,"1":0,"2":0,"3":1,"4":1,"5":0,"6":0,"7":0,"8":0}]}],"3":[{"id":5,"text":"text5","type":[{"0":0,"1":0,"2":0,"3":1,"4":0,"5":0,"6":0,"7":0,"8":0}]}]};
	sitsumon = resList;
	//0~8の乱数
	main = Math.floor( Math.random() * 9 );
	main = 0;
	viewQestion();
}

//質問をランダムに表示
function viewQestion(){
	console.log(sitsumon);
	rand = Math.floor( Math.random() * sitsumon[main].length );
	var html = sitsumon[main][rand].text;
	$(".question_text").html( html );
}

//はい選択時処理
$(document).on("click","#yes",function(){
	var kai = new Array();
	kai.id = sitsumon[main][rand].id;
	kai.answer = 1;
	//回答済みの質問に要素追加
	kaitou.push( kai );
	//質問一覧から回答済みの質問を削除
	sitsumon[main].splice( rand, 1 );
	questionCount();
});

//いいえ選択時処理
$(document).on("click","#no",function(){
	var kai = new Array();
	kai.id = sitsumon[main][rand].id;
	kai.answer = 0;
	//回答済みの質問に要素追加
	kaitou.push( kai );
	//質問一覧から回答済みの質問を削除
	sitsumon[main].splice( rand, 1 );
	questionCount();
});

function questionCount(){
	if(count >= 10){
		console.log(kaitou);
		//質問終了処理
		document.getElementById("main").pushPage("generation.html");
	}else{
		//乱数が前回と違う数値になるまで
		while(true){
			//0~8の乱数
			main2 = Math.floor( Math.random() * 9 );
			console.log(sitsumon[main2].length);
			if(main != main2 && sitsumon[main2].length > 0){
				main = main2;
				break;
			}
		}
		count++;
		viewQestion();
	}
}
