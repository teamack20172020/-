class AppRotes{
  constructor(gameType,total) {
    this.rootMap = new Map();
    this.rootMap.set("new_plan","departure");//ホーム　→　出発地選択
    this.rootMap.set("address_choice","address");//出発地選択　→　住所入力
    this.rootMap.set("station_choice","station");//出発地選択　→　駅選択
    this.rootMap.set("gps_choice","gps");//出発地選択　→　GPS決定
    this.rootMap.set("complete_gps","purpose");//GPS決定　→　目的選択
    this.rootMap.set("submit_address","purpose");//住所入力　→　目的選択
    this.rootMap.set("submit_station","purpose");//駅選択　→　目的選択
    this.rootMap.set("yes_purpose","purpose_input");//目的選択　→　目的入力
    this.rootMap.set("no_purpose","question");//目的選択　→　目的質問
    //this.rootMap.set("submit_purpose","generation");//目的入力　→　目的地選択

	//目的地入力あり
    // this.rootMap.set("submit_purpose","destination");//目的入力　→　目的地選択
    // this.rootMap.set("yes_place","destination_input");//目的地選択　→　目的地入力
    // this.rootMap.set("no_place","question");//目的地選択　→　目的地質問
    //this.rootMap.set("submit_place","generation");//目的地入力　→　自動生成

	//目的地入力なし
    this.rootMap.set("submit_purpose","generation");//目的地入力　→　自動生成
    this.rootMap.set("history_plan","plan_history");//ホーム　→　履歴

    this.rootMap.set("again_plan","generation");//ホーム　→　履歴


	//サンプル
    this.rootMap.set("sample_pur","sample_question");//サンプル目的選択　→　サンプル質問

  }

  //ページ遷移先を取得
  getRote(key){
    if(this.rootMap.has(key)){
      return this.rootMap.get(key);
    }else{
      return "";
    }
  }
};
