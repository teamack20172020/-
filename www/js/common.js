//ページ遷移
$(function(){
	rotes = new AppRotes();
	//nextpageクラスをタップした時次のページへ遷移する処理
	$(document).on("click",".nextpage",function(){
		console.log($(this).attr("id"));
		nextpage = rotes.getRote($(this).attr("id"));
		console.log(nextpage);
		if(nextpage != ""){
			//次のページに移動
			document.getElementById("main").pushPage(nextpage + ".html");
		}
	});
	$(document).on("click", ".home_back", function () {
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
