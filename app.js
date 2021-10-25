const canvas = document.getElementById('canvasJS');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const ctx = canvas.getContext('2d');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const startPainting = () => {
    painting = true;
};

const stopPainting = () => {
    painting = false;
};

const mouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    };
};

const changeColor = (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

const changeWidth = (event) => {
    const size = event.target.value;
    ctx.lineWidth = size;
};

const handleMode = () => {
    if(filling===true){
        mode.innerText="Fill";
        filling = false;
    }else{
        mode.innerText="Paint";
        filling = true;
    }
};

const handleCanvasClick = () => {
    if (filling===true){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    };
};

const handleCM = (event) => {
    event.preventDefault();
};

const handleSave = (event) => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = "Mypainting";
    link.click();
};

if(canvas){
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
};

Array.from(colors).forEach(color => color.addEventListener('click', changeColor));

range.addEventListener('input', changeWidth);
mode.addEventListener('click', handleMode);
saveBtn.addEventListener("click", handleSave);