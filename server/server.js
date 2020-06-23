const port = 8000;
const express = require("express");
const app = express();

const server = app.listen(port, () => {
  console.log(`Listening for request on port ${port} to respond to.`);
});

const io = require("socket.io")(server);

let allMsgObj = [];
let ctnConnect = 0;

//listening for socket connection
io.on("connection", (socket) => {
  ctnConnect++;
  console.log(
    `Socket Connected on port ${port}: ${socket.id} (${ctnConnect} Shake-Hands)`
  );

  //listening for who just join the chat from connected client
  //broadcast to all clients
  socket.on("justJoin", (joinName) => {
    io.emit("justJoin", joinName);
  });

  //listening for newMsgObj from connected client
  //boradcast to all clients
  socket.on("newMsgObj", (newMsgObj) => {
    //add newMsgObj to allMsgObj
    allMsgObj.push(newMsgObj);
    console.log(allMsgObj);
    io.emit("allMsgObjFrServer", allMsgObj);
  });

  //listening for clearChat instruction from connected client
  //broadcast to all clients
  socket.on("clearChat", () => {
    allMsgObj = [];
    console.log(allMsgObj);
    io.emit("allMsgObjFrServer", allMsgObj);
  });

  //listening for disconnect instruction from connected client
  socket.on("disconnect", () => {
    ctnConnect--;
    console.log(
      `Socket Disconnected : ${socket.id} (${ctnConnect} remain connected.)`
    );
  });
}); //END io.on("connection")

//**
//
// //server listening
// socket.on("Listening_For_Event_Fr_Client", (dataSentFrClient) => {});
//
// //emits to ALL connected clients  (boradcast)
// io.emit("", (dataReceived) => {});
//
// //emits to this socket client only  (direct reply)
// socket.emit("", (dataReceived) => {});
//
// //emits to all OTHERS except this socket client  (broadcast except this socket)
// socket.broadcast.emit("", (dataReceived) => {});
//
// */
