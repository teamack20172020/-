$(function(){
  rotes = new AppRotes();
$("#test").load("akinator_view.html");
  $(document).on("click",".nextpage",function(){
    console.log($(this).attr("id"));
    nextpage = rotes.getRote($(this).attr("id"));
    console.log(nextpage);
    if(nextpage != ""){
        //次のページに移動
        document.getElementById("main").pushPage(nextpage + ".html");
    }
  });
  $(document).on("click",".backpage",function(){
	  //前のページに移動
	  document.getElementById("main").popPage();

  });
});
