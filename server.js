const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static('public'))


const server = app.listen(3000, ()=>{
    console.log('server started on port 3000')
})

io = socket(server)

rooms = {}

io.on('connection', (socket)=>{
   	console.log('socket connected: ', socket.id);
	socket.on("draw", data=>{
		socket.broadcast.emit('listening', {data: JSON.stringify(data)});
		//console.log(data.point.x);
	})
});
