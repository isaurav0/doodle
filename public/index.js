var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mousedown = false;
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

canvas.addEventListener('mousemove', e=>draw(e))

canvas.addEventListener('mouseup', e=>{
    mousedown = false
})



function draw(e){
    if(mousedown==true){
        ctx.strokeStyle = "Green";
        ctx.beginPath();
	ctx.moveTo(prev.x, prev.y);
	ctx.lineTo(e.x, e.y);
        ctx.stroke();
	prev = e;
        console.log('dragged')
    }
}


