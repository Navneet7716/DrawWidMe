const e = require("express");
const express = require("express");
let app = express();
let httpServer = require("http").createServer(app);

let io = require("socket.io")(httpServer);

let connections = [];

io.on("connect", (socket) => {
  connections.push(socket);
  console.log(`${socket.id} connected`);

  socket.on("draw", (data) => {
    // socket.to("navneet").emit("ondraw", { x: data.x, y: data.y });
    connections.forEach((con) => {
      if (con.id !== socket.id) {
        con.emit("ondraw", { x: data.x, y: data.y });
      }
    });
  });

  socket.on("down", (data) => {
    // socket.to("navneet").emit("ondown", { x: data.x, y: data });
    connections.forEach((con) => {
      if (con.id !== socket.id) {
        con.emit("ondown", { x: data.x, y: data.y });
      }
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} disconnected`);

    connections.filter((con) => con.id !== socket.id);
  });
});

app.use(express.static("public"));

let PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
