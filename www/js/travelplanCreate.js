//$("#placelist").on('click', function() {
$(document).on("click","#placelist",function(){
  console.log("押せてるよ");
  var url = "http://localhost:8000/placelist";
  $.ajaxSetup({
    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
  });
  $.ajax({
    type: "GET",
    url: url,
    dataType:"json",
    scriptCharset: "utf-8",
    timeout: 30000
  }).done(function(data,textStatus,jqXHR) {
    var result = "";
    var json = JSON.parse(data)
    var list = json["results"];
    list.forEach(function( row ) {
      result += "<p>" + row["name"] + "</p>";
    });
    console.log(result);
    $("#res").html(result);
    //$("#main").html(data);
    alert('検索が正常に完了しました');

  }).fail(function(jqXHR, textStatus, errorThrown){
      $("#p1").text("err:"+jqXHR.status); //例：404
      $("#p2").text(textStatus); //例：error
      $("#p3").text(errorThrown); //例：NOT FOUND
  }).always(function(){
  });
});