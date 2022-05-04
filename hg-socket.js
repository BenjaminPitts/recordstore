var net = require("net");

var socket = net.createConnection(2003, "carbon.hostedgraphite.com", function() {
    socket.write("8770573a-2e24-4ad5-9d1f-f69afca83321.test.nodejs.tcp_socket 1.2\n");
    socket.end();
});


var dgram = require("dgram");

var message = Buffer.from("8770573a-2e24-4ad5-9d1f-f69afca83321.test.nodejs.udp_socket 2.2\n")
var client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 2003, "carbon.hostedgraphite.com", function(err, bytes) {
    client.close();
});

console.log('metrics sent')
