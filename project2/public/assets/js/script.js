$(document).ready(function() {
    
    $(".chat").on("submit", function(event) {
      event.preventDefault();
  ​
      var chats_id = $(this).children(".chats_id").val();
      console.log(chats_id);
      $.ajax({
        method: "PUT",
        url: "/chats/" + chats_id
      }).then(function(data) {
        // reload page to display devoured burger in proper column
        location.reload();
      });
  ​
    });
  });