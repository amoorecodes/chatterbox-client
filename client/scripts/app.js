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
  currentRoom: 'default',
  // $("#roomSelect option:selected").text() ||
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
  // app.renderRoom("Lobby");
  // app.renderRoom("hotel")
  // app.renderRoom("place")
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
    if (app.currentRoom === 'default') {
      data.results.forEach(message => app.renderMessage(message));
    }else {
      data.results.forEach(message => { 
        if (message.roomname === app.currentRoom) {
          app.renderMessage(message);
      }});
    }
    
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
  //var regex = /[a-z0-9]/i
  var input = _.escape(message.text);
  var user = _.escape(message.username)

  if(message.username !== undefined) {
  var div = $(`<div class="${user}"></div>`)
  var a = $(`<a href="#" class="username">${user}</a>`)
  a.on('click', app.handleUsernameClick);
  var b = $(`<span>${input}</span><br>`);
  div.append(a).append(b);
  $('#chats').append(div);
  }
  // $(`<span>${message.text}</span>`).appendTo('#chats');
  // $(`<div><a href="#" class="username">${message.username}</a><span>${message.text}</span></div>`).appendTo('#chats');
  // $('#chats').children().append(`<span>${message}</span>`);
}

app.renderRoom = function(event) {
    event.preventDefault();
    var room = $('#roomText').val();
    app.chatrooms[room] = false;
    $(`<a href="#" class="${room}">${room}</a>`).appendTo('#roomSelect');
}

app.handleUsernameClick = function() {
  // console.log("currentRoom:", app.currentRoom);
  app.myFriends[$(this).text()] = true;
  $(`.${$(this).text()}`).toggleClass('highlighted');
  

}

app.handleSubmit = function(event) {
  event.preventDefault();

  var message = {
    username: app.currentUser,
    text: $('#message').val(),
    roomname: $('#roomText').val()
  }

  app.send(message);
  console.log("Message:", message)
  console.log("Room:", $('#roomSelect option:selected').text())
 // $("form").submit(app.send($(':input'))) 
 // var regex = /[a-z0-9]/i regex.test(_____ pass what we want to test)

}

app.changeRoom = function() {
  console.log($(this));
  app.currentRoom = $(this).text();
  // $('#roomSelect').val()
  app.clearMessages();
  app.fetch();
  console.log("CurrentRoom:", app.currentRoom);
}

app.constFeed = function() {
  app.fetch();
  for(var key in app.myFriends) {
    $(`.${key}`).addClass('highlighted');
  }
};

// app.fetchRoom = function() {
//   $.ajax({
//   url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
//   type: 'GET',
//   data: {order: "-createdAt"},
//   contentType: 'application/json',
//   success: function (data) {
//     data.results.forEach(message => {
//       if(app.currentRoom === message.roomname) {
//       app.renderMessage(message);
//     }
//   });
//   },
//   });
// }

$(document).ready(function() {
  
  app.init();
  setInterval(app.constFeed, 2000);
  $('.postBtn').on('click', app.handleSubmit);
  $('.addRoom').on('click', app.renderRoom); 
  // $('#roomSelect').on('click', 'a', app.changeRoom);
  $('#roomSelect').on('click', 'a', app.changeRoom);
  // $('')
  //  $('body').on('click', 'a', function() {
  //   console.log('e');
  //   app.myFriends[$(this).text()] = true;
  // });

  
  // $("#input").submit(app.handleSubmit($(':input')))
});



//$("#roomSelect").change()

