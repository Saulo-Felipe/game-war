const express = require('express')
const app = express()
const { v4: uuid } = require('uuid')

const { createServer } = require("http") 
const { Server } = require("socket.io")

const httpServer = createServer(app)
const io = new Server(httpServer,   {cors: {
  origin: ["https://3000-saulofelipe-gamewar-8u76ax1ddpc.ws-us34.gitpod.io"]
}})

var game = {
  allPlayer: {
    // "id": { x: y: }
  },
}

function refresh() {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }
  var date = new Date();
  return [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':');
}


io.on("connection", (socket) => {
  console.log(`[${refresh()}] new connection!`)

  socket.on("new-player", (data, arg2, callback) => {
    socket.join(`${data.room}`)

    socket.userID = uuid()

    game.allPlayer[socket.id] = {
      id: socket.id,
      skin: data.character,
      room: data.room,
    }

    callback({
      status: "ok"
    })
  })

  socket.on("move-player", (data) => {
    console.log("Todas as sala: ")
    console.log(io.sockets.adapter.rooms)
    console.log("ALl persons: ", game.allPlayer)

    // console.log("dados receidos: ", data)
  })
})











app.get("/", (request, response) => {
  response.send("<h1>Hello OK!</h1>")
})

httpServer.listen(8081, (err) => {
  if (err)
    return console.log("Erro no server: ", err)

    console.clear()
    console.log("Server is running! In PORT: 8081")
})  