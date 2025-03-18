const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");

canvas.width = window.innerWidth - 100;
canvas.height = 500;

let painting = false;
let paths = [];
let currentPath = [];

function startPosition(e) {
    painting = true;
    currentPath = [];
    draw(e);
}

function endPosition() {
    painting = false;
    paths.push([...currentPath]); // Save the drawn path for undo
}

function draw(e) {
    if (!painting) return;
    
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

    currentPath.push({
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop,
        color: ctx.strokeStyle,
        size: ctx.lineWidth
    });
}

// Event Listeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// Undo functionality
undoBtn.addEventListener("click", () => {
    if (paths.length === 0) return;
    paths.pop();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawCanvas();
});

function redrawCanvas() {
    paths.forEach(path => {
        ctx.beginPath();
        for (let i = 0; i < path.length; i++) {
            let point = path[i];
            ctx.lineWidth = point.size;
            ctx.strokeStyle = point.color;
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
        }
    });
}

// Clear canvas
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths = [];
});

// Download drawing
downloadBtn.addEventListener("click", () => {
    let link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
