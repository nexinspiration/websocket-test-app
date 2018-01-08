var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer((request, response) => {});

server.listen(1337, () => {
  console.log('server started @ port 1337');
});


// creating server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  let connection = request.accept(null, request.origin);

  let data = {
    notifications: 10,
    reminders: 5,
    assignedTasks: 1,
    message: 'This is a notification'
  };

  setInterval(
    () => {
      let randomValue = Math.floor(Math.random() * 3);
      if (randomValue === 1) {
        data.notifications += 1;
        data.message = 'This is a notification';
      } else if (randomValue === 2) {
        data.reminders += 1;
        data.message = 'This is a reminder';
      } else {
        data.assignedTasks += 1;
        data.message = 'This is a assigned task';
      }
      connection.sendUTF(
        JSON.stringify(data)
      );
    }
    , 3000);

  connection.on('message', function(message) {
    if (message.type === 'json') {
      // process WebSocket message
      console.log(message)
    }
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});