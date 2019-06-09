const net = require('net');

const host = '127.0.0.1';
const port = 5656;
const client = new net.Socket();
const stdin = process.stdin;
stdin.setEncoding('utf-8');

client.connect(port, host, function() {
    console.log('Connected');
    
});

stdin.on('data', (inp)=>{
    client.write(inp);
    client.on('data', (data)=> {
        console.log(`\nServer returned:\n\n${data}`);
        client.removeAllListeners();
    });
    if (inp == "exit\n"){
        console.log("Ending the connection.");
    }
});