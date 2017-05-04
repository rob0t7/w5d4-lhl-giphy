const express = require('express');
const SocketServer = require('ws').Server;
var uuid = require('node-uuid');
const querystring = require('querystring');
const fetch = require('node-fetch');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const app = express()
 // Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${PORT}`)
);

// Create the WebSockets server and attach it to express
const wss = new SocketServer({server: app});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Echo back messages (testing purposes)
  ws.on('message', handleMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};


function handleMessage(message_data) {
  // Receive message, parse, then add unique id so React behaves correctly
  console.log(`Received: ${message_data}`)
  var message = JSON.parse(message_data);
  message.id = uuid.v4();

  if (matches = message.content.match(/^\/giphy (.+)$/)) {
    let qs = querystring.stringify({
      api_key: 'dc6zaTOxFJmzC',
      tag: matches[1]
    });
    fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
      .then( resp => {return resp.json() } )
      .then( json => {
        message.content = `<img src="${json.data.image_url}" alt=""/>`
        var to_send = JSON.stringify(message);
        wss.broadcast(to_send);
        console.log(`Sent: ${to_send}`);
      })
  } else {
    var to_send = JSON.stringify(message);
    wss.broadcast(to_send);
    console.log(`Sent: ${to_send}`);
  }
  // Now we stringify the message and send it back to all clients via broadcast
  /* var to_send = JSON.stringify(message);
   * wss.broadcast(to_send);
   * console.log(`Sent: ${to_send}`);*/
}
