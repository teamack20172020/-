//一つのプランが格納される変数
var check_data;
//プランのタイトルをいれる変数
var check_title;
//ブラウザのgoogle mapを表示する為の変数
var googlemapurl = "https://www.google.co.jp/maps/dir/";
//入れ替えに使う位置変数
var start_edit_plan = 0;
var end_edit_plan = 0;
//変更された後のプラン情報を入れる配列
var edit_array = new Array();
var history_point_type;


document.addEventListener('init', function (event) {
	var page = event.target;
	//プラン確認ページの時のみ処理
	if (page.matches('#plan_check')) {
		//データ取得
		history_point_type = page.data.history_type;
		check_data = page.data.his_work["data"];
		//詳細画面に送るデータ配列
		send_array = check_data;
		edit_array = check_data.slice();
		check_title = page.data.his_work["title"];
		viewcheck(0);
	}
});

//ツールバーの編集ボタンクリックしたときの処理(画面右上にあるボタン)
$(document).on("click", "#edit_plan", function () {
	$('#history_edit').html('');
	viewcheck(1);
	$("#change_completion_plan").html("<ons-button id='completion_edit'>完了</ons-button>");
	$("#change_cancel_plan").html("<ons-button id='cansel_edit'>キャンセル</ons-button>");
});

//編集モードでキャンセルボタンクリック時の処理（画面左下にあるボタン）
$(document).on("click", "#cansel_edit", function () {
	edit_array = check_data.slice();
	$('#history_edit').html('<ons-button id="edit_plan">編集</ons-button>');
	$("#change_completion_plan").html("");
	$("#change_cancel_plan").html("");
	viewcheck(0);
});

//編集モードで完了ボタンクリック時の処理（画面右下にあるボタン）
$(document).on("click", "#completion_edit", function () {
	$("#modal").show();
	if ($("#title_input").val().length > 0) {
		check_title = $("#title_input").val();
		check_title = htmlspecialchars(check_title);
		check_title = getLen(check_title);
	}
	history_array[history_point_type]["title"] = check_title;
	setLocalStorage("generation", history_array);
	//編集配列と元の配列が一緒でないならajax通信をする	
	if (JSON.stringify(edit_array) != JSON.stringify(check_data)) {
		//$("#modal").show();
		let work_array = "";
		for (let i = 0; i < edit_array.length; i++) {
			if (i == edit_array.length - 1) {
				work_array += edit_array[i]["address"];
			} else {
				work_array += edit_array[i]["latlng"] + ":";
			}
		}
		let url = "travelplan/timeset/" + work_array;
		ajax(url, "plan_edit", "in", "json");
	} else {
		$('#history_edit').html('<ons-button id="edit_plan">編集</ons-button>');
		$("#change_completion_plan").html("");
		$("#change_cancel_plan").html("");
		viewcheck(0);
	}
});

//編集モードで削除ボタンクリック時の処理（画面右にあるボタン）
$(document).on("click", ".check_plan_remove", function () {
	if (edit_array.length > 2) {
		let rem_point = $(this).attr("remove_point");
		//削除する配列の添字
		//console.log(rem_point);
		edit_array.splice(rem_point, 1);
		viewcheck(1);
	} else {
		viewAlertCHE(history_point_type);
	}
});

//移動時間取得API退避
function setResPD(res) {
	if (res['error_flg'] == 0) {
		console.log(edit_array);
		for (let i = 0; i < edit_array.length; i++) {
			edit_array[i]['time_ja'] = res[i];
		}
		//タイトルをコンソールに出す
		//console.log(htmlspecialchars($("#title_input").val()));
		history_array[history_point_type]["data"] = edit_array;
		send_array = edit_array.slice();
		check_data = edit_array.slice();
		//ローカルストレージに保存する直前の配列のコンソール
		//console.log(history_array);
		setLocalStorage("generation", history_array);
		$('#history_edit').html('<ons-button id="edit_plan">編集</ons-button>');
		$("#change_completion_plan").html("");
		$("#change_cancel_plan").html("");
		viewcheck(0);
	} else {
		alert("移動時間の取得に失敗した為並び替えをキャンセルしました。");
		edit_array = check_data.slice();
		$('#history_edit').html('<ons-button id="edit_plan">編集</ons-button>');
		$("#change_completion_plan").html("");
		$("#change_cancel_plan").html("");
		viewcheck(0);
	}
}

//プラン履歴画面の表示するメソッド	
function viewcheck(type) {
	let elem = "";
	//「type=0」なら閲覧モード画面
	if (type == 0) {
		$("#check_plan_list").removeClass("sort_plan");
		elem += "<ons-list-item>"
			+ "<img src='" + type_image("デフォルト") + "' class='purpose_image'>"
			+ "<div class='plan_item_name'>" + count_text(check_data[check_data.length - 1]["name"]) + "</div>"
			+ "</ons-list-item>";
		for (let i = 0; i < check_data.length; i++) {
			elem += "<div class='plan_item_time'><div class='text_check'>↓" + check_data[i]["time_ja"] + "</div>"
				+ "<ons-button class='route_item' value='" + i + "'><i class='fas fa-map-marked-alt'></i></ons-button></div>"
				+ "<ons-list-item>";
			if (i != check_data.length - 1) {
				elem += "<img src='" + type_image(check_data[i]["purpose"]) + "' class='purpose_image'>";
			} else {
				elem += "<img src='" + type_image("デフォルト") + "' class='purpose_image'>";
			}
			elem += "<div class='plan_item_name'>" + count_text(check_data[i]["name"]) + "</div>";
			if (i != check_data.length - 1) {
				elem += "<ons-button class='detail_item' value='" + i + "'><i class='fas fa-info-circle'></i></ons-button>";
			}
			elem += "</ons-list-item>";
		}
		$("#check_plan_title").html("タイトル:" + check_title);
		$("#check_plan_list_head").html("");
		$("#check_plan_list_foot").html("");
	} else {
		//「type!=0」なら編集モード画面
		$("#check_plan_list").addClass("sort_plan");
		setPlanSort();
		elem = "<ons-list-item>"
			+ "<img src='" + type_image("デフォルト") + "' class='purpose_image'>"
			+ "<div class='plan_item_name'>" + count_text(edit_array[edit_array.length - 1]["name"]) + "</div>"
			+ "</ons-list-item>";
		$("#check_plan_list_head").html(elem);
		$("#check_plan_list_foot").html(elem);
		elem = "";
		for (let i = 0; i < edit_array.length - 1; i++) {
			elem += "<ons-list-item>";
			if (i != edit_array.length - 1) {
				elem += "<img src='" + type_image(edit_array[i]["purpose"]) + "' class='purpose_image'>";
			}
			elem += "<p class='plan_item_name'>" + count_text(edit_array[i]["name"])
				+ "</p>"
				+ "<ons-button remove_point='" + i + "' class='check_plan_remove'><i class='fas fa-trash-alt'></i></ons-button>"
				+ "</ons-list-item>";
		}
		$("#check_plan_title").html("タイトル:<ons-input id='title_input' modifier='transparent' value='" + check_title + "'></ons-input>");
	}
	$("#check_plan_list").html(elem);
	$("#modal").hide();
}

//プランクリック時の処理
$(document).on("click", ".route_item", function () {
	//チェックされた項目を取得
	let check_type = $(this).attr("value");
	let work_check = check_data;
	//ブラウザを表示
	if (check_type == 0) {
		//ブラウザを表示
		cordova.InAppBrowser.open(googlemapurl + work_check[work_check.length - 1]["address"]
			+ "/" + work_check[check_type]["address"], '_blank', 'location=no,closebuttoncaption=戻る,toolbarposition=top');
	} else {
		//ブラウザを表示
		cordova.InAppBrowser.open(googlemapurl + work_check[check_type - 1]["address"]
			+ "/" + work_check[check_type]["address"], '_blank', 'location=no,closebuttoncaption=戻る,toolbarposition=top');
	}
});

//プラン入れ替え用の設定メソッド
function setPlanSort() {
	$(".sort_plan").sortable({
		//並び替えは縦のみ 
		axis: "y",
		//並び替えるにはPタグを選択
		handle: "p",
		//動かせる範囲はons-list内まで
		containment: "parent",
		//入れ替えはマウスポインタが触れたとき
		tolerance: "pointer",
		//入れ替える対象は少し透過させる
		opacity: 0.5,
		start: function (e, ui) {
			//選択された要素の位置
			start_edit_plan = ui.item.index();
			//選択が開始された位置のコンソール
			//console.log("start:" + start_edit_plan);
			ui.placeholder[0].classList.add("big_item");
		},
		update: function (e, ui) {
			//交換された位置
			end_edit_plan = ui.item.index();
			ui.placeholder[0].classList.remove("big_item");
			//選択が解除された位置のコンソール
			//console.log("update:" + end_edit_plan);
			//個々に配列入れ替え処理
			if (start_edit_plan < end_edit_plan) {
				let work = edit_array[start_edit_plan];
				for (let i = start_edit_plan; i < end_edit_plan; i++) {
					edit_array[i] = edit_array[i + 1];
				}
				edit_array[end_edit_plan] = work;
			} else {
				let work = edit_array[start_edit_plan];
				for (let i = start_edit_plan; i > end_edit_plan; i--) {
					edit_array[i] = edit_array[i - 1];
				}
				edit_array[end_edit_plan] = work;
			}
			//入れ替えた結果を入れた後のコンソール
			//console.log(edit_array);
			viewcheck(1);
		}
	});
	$(".sort_plan").disableSelection();
}
