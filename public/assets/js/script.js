$(document).ready(function() {
  console.log("hello");
  var nameBox = $("#allNames");
  var html = '<li><div class="chatList"><div class="img"><i class="fa fa-circle"></i><img src="/demo/man01.png"></div><div class="desc"><h5> NAMEHERE </h5></div></div></li>'
  $.get("/api/allusers",function(data){
    for(i=0; i < data.length; i++){
      var name = data[i];
      var newhtml = html.replace("NAMEHERE", name);
      nameBox.append(newhtml);
    }
  })
});