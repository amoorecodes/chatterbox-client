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
};

app.send = function(message) {
  
  // have a listener on input
    // on click, it will create a message obj
      // 
  
  // let message = {
  //   username: null,
  //   text: null,
  //   roomname: null
     
  // }
  
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
};

app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  // data: JSON.stringify.apply(this),
  contentType: 'application/json',
  success: function (data) {
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
  $(`<div><a href="#" class="username">${message.username}</a><span>${message.text}</span></div>`).appendTo('#chats');
  // $('#chats').children().append(`<span>${message}</span>`);
}

app.renderRoom = function(room) {
    $(`<div>${room}</div>`).appendTo('#roomSelect');
}

app.handleUsernameClick = function() {
   $('body').on('click', 'a', function() {
    console.log('e');
    app.myFriends[$(this).text()] = true;
  });
}

$(document).ready(function() {
  
  app.init();
   
   $('body').on('click', 'a', function() {
    console.log('e');
    app.myFriends[$(this).text()] = true;
  });
  
})


