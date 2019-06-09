const net = require('net');
const util = require('util');
const exec = require('child_process').exec;

const server = net.createServer();
const port = 5656;
const host = '127.0.0.1';

server.listen(port, host, ()=>{
    console.log(`Listening on ${host}:${port}`);
});

server.on('connection', (socket)=>{
    console.log(`Client connected.`);
    socket.on('data', (data)=>{
        console.log(`Received command: ${data}`);
        if (data == "exit\n"){
            console.log("Closed connection with client.");
            socket.destroy();
        }
        else{
            exec("" + data, (err, stdout, stderr) => {
                if (stdout !== ""){
                    socket.write(`Bash says:\n${stdout}`);
                }
                else if (stderr !==""){
                    socket.write(`Bash says:\n${stderr}`);
                }
            });
        }
    });
});