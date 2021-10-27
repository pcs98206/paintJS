const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const reset = document.getElementById('jsReset');
const save = document.getElementById('jsSave');

let painting = false;
let filling = false;

canvas.width = 700;
canvas.height = 700;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';
ctx.lineWidth = 6;

const handleMousemove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
};

const handleMousedown = () => {
    painting = true;
};

const handleMouseup = () => {
    painting = false;
};

const handleMouseleave = () => {
    painting = false;
};

const handleChangeColor = (event) =>{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

const handleRange = (event) => {
    const size = event.target.value;
    ctx.lineWidth = size;
};

const handleMode = () => {
    if(filling===false){
        mode.innerText="Paint"
        filling=true
    }else{
        mode.innerText="Fill"
        filling=false
    }
};

const handelCanvasClick = () => {
    if(filling===true){
        ctx.fillRect(0, 0, 700, 700);
    }
};

const handleReset = () => {
    ctx.fillStyle='white';
    ctx.fillRect(0, 0, 700, 700);
};

const handleMenu = (event) => {
    event.preventDefault();
};

const handleSave = () => {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "Painting.jpg"
    link.click();
};

canvas.addEventListener("mousemove", handleMousemove);
canvas.addEventListener("mousedown", handleMousedown);
canvas.addEventListener("mouseup", handleMouseup);
canvas.addEventListener("mouseleave", handleMouseleave);
Array.from(colors).forEach(color => color.addEventListener('click', handleChangeColor));
range.addEventListener('input', handleRange);
mode.addEventListener('click', handleMode);
canvas.addEventListener('click', handelCanvasClick);
reset.addEventListener('click', handleReset);
canvas.addEventListener('contextmenu', handleMenu);
save.addEventListener('click', handleSave);