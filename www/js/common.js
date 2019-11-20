//詳細画面に送る為の配列を入れる
var send_array = null;

//ページ遷移
$(function(){
	rotes = new AppRotes();
	//nextpageクラスをタップした時次のページへ遷移する処理
	$(document).on("click",".nextpage",function(){
		nextpage = rotes.getRote($(this).attr("id"));
		if(nextpage != ""){
			//次のページに移動
			document.getElementById("main").pushPage(nextpage + ".html");
		}
	});
	$(document).on("click", ".home_back", function () {
		work_question = [];
		document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
	});
});

//パラメタソート
function compareFunc(a, b) {
	return a - b;
}

//ローカルストレージへの保存
function setLocalStorage(key, value) {
	localStorage.setItem(key,JSON.stringify(value));
}

//ローカルストレージから取得
function getLocalStorage(key) {
	let work=localStorage.getItem(key);
	work=JSON.parse(work);
	return work;
}

//詳細のボタンクリック時の処理(plan_check,generationで使用)
$(document).on("click", ".detail_item", function () {
	//チェックされた項目を取得
	let detail_type = $(this).attr("value");
	let de_work = send_array[detail_type];
	document.getElementById('main').pushPage("plan_detail.html", { data: { de_work } });
});

//strの文字を8の数までの文字列にして返すメソッド
function count_text(str){
	let work=str;
	if(work.length>8){
		work=str.slice(0,8);
		work+="...";
	}
	console.log(work);
	return work;
}