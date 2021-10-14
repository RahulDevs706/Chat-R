const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const moment = require('moment-timezone');


const app = express();
const port = process.env.PORT;

const users= [{}];
const usersInRoom=[];

app.use(cors());

app.get('/', (req, res)=>{
    res.send("Its working")
})

const server = http.createServer(app);

const io = socketIO(server);
io.on('connection', (socket)=>{
    console.log('New Connection');

    socket.on('joinned', ({user})=>{

        users[socket.id]=user;

        usersInRoom.push(users[socket.id]);

        socket.emit('welcome', {user:"Admin", message:"Welcome to the chat "+ users[socket.id], activeUser:user});
        socket.broadcast.emit('userJoined', {user:"Admin", message:users[socket.id]+ " has joined the chat", activeUser:user});
        io.emit('roomData',{usersInRoom});
    });

    


    socket.on('message', ({message, id})=>{
        const utc= moment().tz('Asia/Kolkata');
        const time = utc.format("hh:mm A")
      
        io.emit('sendMsg', {user:users[id], message, id, time});
    })

    socket.on('disconnect', (id)=>{
            usersInRoom.pop(users[id]);
            var msg;
            if(users[socket.id]===undefined){
                msg=null;
            }else{
                msg= users[socket.id] + " has left the chat";
            }
            socket.broadcast.emit('leave', {user:"Admin", message:msg});
            io.emit('userLeft', {usersInRoom})
    })

})



server.listen(port , ()=>{
    console.log('server is started on http://localhost:'+port);
})