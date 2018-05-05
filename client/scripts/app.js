// YOUR CODE HERE:
// http: parse.la.hackreactor.com/chatterbox/classes/messages

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

let app = {
  server: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
  users: {},
  myFriends: {},
  messages: [],
  chatrooms: {},
  currentUser: window.location.search.split("=")[1],
  currentRoom: $("#roomSelect option:checked").val() || "lobby"
};

//need to create a default state of the room 

app.send = function(message) {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
}

app.init = function() {
  app.fetch();
  app.renderRoom("Lobby");
  app.renderRoom("hotel")
  app.renderRoom("place")
  // app.username = $()
};

app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  data: {order: "-createdAt"},
  contentType: 'application/json',
  success: function (data) {
    app.clearMessages();
    data.results.forEach(message => app.renderMessage(message));
    console.log("data:", data)
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
}

app.clearMessages = function() {
 $('#chats').children().remove()
 
};

app.renderMessage = function(message) {
  var div = $('<div></div>')
  var a = $(`<a href="#" class="username">${message.username}</a>`)
  a.on('click', app.handleUsernameClick);
  var b = $(`<span>${message.text}</span>`);
  div.append(a).append(b);
  $('#chats').append(div);
  // $(`<span>${message.text}</span>`).appendTo('#chats');
  // $(`<div><a href="#" class="username">${message.username}</a><span>${message.text}</span></div>`).appendTo('#chats');
  // $('#chats').children().append(`<span>${message}</span>`);
}

app.renderRoom = function(room) {
    this.chatrooms[room] = false;
    $(`<a href="#">${room}</a>`).appendTo('#roomSelect');
}

app.handleUsernameClick = function() {
  console.log(window.location.search.slice(10))
    app.myFriends[$(this).text()] = true;
}

app.handleSubmit = function(event) {
  event.preventDefault();

  var message = {
    username: app.currentUser,
    text: $('#text').val(),
    room: app.currentRoom,
  }

  app.send(message);
 // $("form").submit(app.send($(':input'))) 
 // var regex = /[a-z0-9]/i regex.test(_____ pass what we want to test)

}



$(document).ready(function() {
  
  app.init();
  setInterval(app.fetch, 2000);
  $('.postBtn').on('click', app.handleSubmit);
   
  //  $('body').on('click', 'a', function() {
  //   console.log('e');
  //   app.myFriends[$(this).text()] = true;
  // });
  
  // $("#input").submit(app.handleSubmit($(':input')))
})



//$("#roomSelect").change()

