let canvas = document.getElementById("canvas");

canvas.width = 0.98 * window.innerWidth;
canvas.height = 0.98 * window.innerHeight;

var io = io.connect("https://draw-wid-me.herokuapp.com/");

let ctx = canvas.getContext("2d");
let x, y;

let mouseDown = false;

window.onmousedown = (e) => {
  ctx.moveTo(x, y);

  io.emit("down", { x, y });

  mouseDown = true;
};

window.onmouseup = (e) => {
  mouseDown = false;
};

io.on("ondraw", ({ x, y }) => {
  ctx.lineTo(x, y);
  ctx.stroke();
});

io.on('ondown', ({ x, y }) => {
    ctx.moveTo(x, y)
})

window.onmousemove = (e) => {
  x = e.clientX;
  y = e.clientY;

  
  if (mouseDown) {
    io.emit("draw", { x, y });
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};
