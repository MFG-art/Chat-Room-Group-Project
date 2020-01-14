let allChats;
let thisUser;

$(document).ready(function() {
  $.ajax({
    method: "GET",
    url: "/api/thisuser"
  }).then(function(res) {
    thisUser = res;
  });

  var nameBox = $("#allNames");
  var html =
    '<li><div class="chatList"><div class="img"><i class="fa fa-circle"></i></div><div class="desc"><h5> NAMEHERE </h5></div></div></li>';
  $.get("/api/allusers", function(data) {
    for (i = 0; i < data.length; i++) {
      var name = data[i];
      var newhtml = html.replace("NAMEHERE", name);
      nameBox.append(newhtml);
    }
  });

  // timer refreshes messages
  var refresh = setInterval(function() {
    $.ajax({
      method: "GET",
      url: "/api/allmessages"
    }).then(function(res) {
      let currentChat = res;
      if (currentChat === allChats) {
        return;
      } else {
        allChats = currentChat;
        refreshDisplay();
      }
    });
  }, 100);

  //actually sends the message
  $(".btn-send").on("click", function(req, res) {
    var message = $(".send-message")
      .val()
      .trim();

    console.log(message);

    $.ajax({
      method: "POST",
      url: "chats/create",
      data: { message: message }
    }).then(function(data) {
      console.log("sent message");
    });
  });
});
$("#inputMessage").on("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   $(".btn-send").click();
  }
});

function refreshDisplay() {
  $("#messages-list").html("");

  for (i = 0; i < allChats.length; i++) {
    if (allChats[i].user === thisUser) {
      //right

      var rightMessageHTML = `<li class="msg-right">
<div class="msg-left-sub">
  <div class="msg-desc">
    ${allChats[i].message}
  </div>
  <small>${thisUser}</small>
</div>
</li>`;
      $("#messages-list").append(rightMessageHTML);
    } else {
      //left
      var leftMessageHTML = `<li class="msg-left">
      <div class="msg-left-sub">
        <div class="msg-desc">
          ${allChats[i].message}
        </div>
        <small>${allChats[i].user}</small>
      </div>
      </li>`;
      $("#messages-list").append(leftMessageHTML);
    }
  }
}
