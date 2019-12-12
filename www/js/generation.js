//ローカルストレージに保存するために使う変数
var generation_array = new Array();
//自動生成APIのURL「travelplan/create/」
var ge_url = "travelplan/create/";
//作成したプランを一時的に保存する変数
var g_work = {};
//目的idリストの取得位置
var p_count = 0;
var cnt = 0;
//距離APIで使うカウント変数
var count_dis = 0;
var main_purpose=0;
var sub_purpose=0;
//画面が読み込まれたときの処理
document.addEventListener('init', function (event) {
	var page = event.target;
	//プラン生成ページの時のみ処理
	if (page.matches('#generation')) {
		//目的idリストが存在する時(質問で目的を決める場合)
		if (p_array.length > 0) {
			main_purpose = p_array[p_count];
			if (main_purpose == p_array[cnt]) {
				cnt++;
			}
			sub_purpose = p_array[cnt];
			cnt++;
			if (cnt == p_array.length) {
				cnt = 0;
				p_count++;
			}
			if (p_count == p_array.length - 1 && cnt == p_array.length - 1) {
				cnt = 0;
				p_count = 0;
			}
			//メイン目的、サブ目的を出すコンソール
			//console.log("メイン目的:"+main_purpose);
			//console.log("サブ目的:"+sub_purpose);
		} else {
			main_purpose = purpose;
			sub_purpose = 1;
		}
		//中間発表用 削除予定
		areaid = 37;
		//main_purpose = 7;
		//sub_purpose = 1;
		//自動生成APIと通信
		ajax(ge_url + departure_type + "/" + lat + "," + lng + "/" + main_purpose + "/" + sub_purpose + "/" + areaid, "generation_auto", "in", "json");
	}
});

//プラン自動生成ajax通信の結果退避
function setResG(resg) {
	//今日の日付を取得
	let today = new Date();
	/*取得した配列からクライアント側で使う配列に変換（APIからの返り値が変わるため削除予定）*/
	/**「g_work」配列の中身
	 * data : 生成したプランの詳細データ
	 * create_purpose : 生成した時のメイン目的
	 * create_departure : 生成した時の出発地
	 * create_date : 生成した時のの日にち
	 * create_time : 生成した時の時間
	 */
	g_work["data"] = resg;
	inapp_array = g_work["data"];
	g_work["create_purpose"] = main_purpose;
	g_work["create_departure"] = departure_type;
	g_work["create_date"] = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	g_work["create_time"] = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	//plan_check.jsのsend_array配列に詳細画面で送る配列を保存する
	send_array = resg;
	//距離APIのURL
	viewGeneration(resg);
}

//自動生成したプランを表示する
function viewGeneration(viewg) {
	var elem = view_plan(viewg,0);
	
	$("#gene_purpose").html("目的：" + objectiveList[idlist[main_purpose - 1]]);
	$("#gene_departure").html("出発地：" + departure_type);
	$("#gene_plan_list").html(elem);
	//読み込み中画面を閉じる
	$('#modal').hide();
}

//「もう一度自動生成する」ボタンクリック
$(document).on("click", "#again_plan", function () {
	g_work = {};
	$('#modal').show();
	document.getElementById("main").resetToPage('generation.html', { animation: 'slide-ios' });
});

//「完了」ボタンクリック
$(document).on("click", "#complete_plan", function () {
	//目的idリスト関係の初期化処理
	p_array = new Array();
	p_count = 0;
	cnt = 0;
	let nen = g_work["create_date"].split("-");
	let jikan = g_work["create_time"].split(":");
	$("#plan_title_in").attr("placeholder", nen[0] + "年" + nen[1] + "月" + nen[2] + "日　" + jikan[0] + "時" + jikan[1] + "分");
	$("#generation_ok").show();
	//自動生成したプランのタイトル入力を文字数制限する
	$("#plan_title_in").keyup(function () {
		let work = $("#plan_title_in").val();
		let getwork = getLen(work);
		$("#plan_title_in").val(getwork);
	});
	$("#plan_title_in").change(function () {
		let work = $("#plan_title_in").val();
		let getwork = getLen(work);
		$("#plan_title_in").val(getwork);
	});
});

//「キャンセル」ボタンクリック
$(document).on("click", "#cancel_plan", function () {
	//目的idリスト関係の初期化処理
	p_array = new Array();
	p_count = 0;
	cnt = 0;
	document.getElementById("main").resetToPage('home.html', { animation: 'slide-ios' });
});
