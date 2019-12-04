var socket = io.connect("localhost:3000");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mousedown = false;
var curveColor = 'black';
var prev;
canvas.position = 'relative';
canvas.height = window.innerHeight-3;
canvas.width = window.innerWidth-2;
ctx.fillStyle="White";
ctx.fillRect(0,0, canvas.width, canvas.height);

function setCanvas(x, y){
    	console.log('resized')
    	canvas.width = window.innerWidth;
    	canvas.height = window.innerHeight;
	ctx.fillStyle = "White";
	ctx.fillRect(0,0, canvas.width, canvas.height);

}

// window.addEventListener('resize', setCanvas(canvas.width, canvas.height))
window.addEventListener('resize', e=>{
    setCanvas(canvas.width, canvas.height)
})
// window.onclick = setCanvas(canvas.width, canvas.height);


canvas.addEventListener('mousedown', e=>{
	mousedown = true;
	prev = e;
})

canvas.addEventListener('mousemove', e=>{
	if(mousedown)
		draw(e, prev, true, curveColor)
})

canvas.addEventListener('mouseup', e=>{
    mousedown = false
})

function setColor(color){
	curveColor = color;
}

function draw(e, previous, emit, color){
        console.log(color)
	ctx.strokeStyle = color;
        ctx.beginPath();
	ctx.moveTo(previous.x, previous.y);
	ctx.lineTo(e.x, e.y);
        ctx.stroke();
	if(emit){
		socket.emit("draw", {point:{x: e.x, y:e.y}, prev:{x: prev.x, y: prev.y}, color: color})
		prev = e;
	}
}

socket.on("listening", data=>{
	console.log(data.data)
	result = JSON.parse(data.data)
	draw(result.point, result.prev, false, result.color)
})
