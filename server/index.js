const express = require('express')
const app = express()
const cors = require("cors")

const { createServer } = require("http") 
const { Server } = require("socket.io")
const httpServer = createServer(app)

const openToAll = require("./routes/openToAll.js")
const needLogin = require("./routes/needLogin.js")

require("dotenv").config()

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.CLIENT_URL]
  }
})

// Middlewares
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
}))

// Name spaces
  const onlinePlayers = io.of("/online-players")
  const halloweenSpace = io.of("/halloweenRoom")

// players state
  const globalOnlinePlayers = []

  onlinePlayers.on("connection", (socket) => {
    console.log(`[new connection][online-players] -> `, socket.id)

    require("./sockets/dashboardSocket.js")(socket, globalOnlinePlayers, onlinePlayers)
  })
  const allPlayers = []

  halloweenSpace.on("connection", (socket) => {
    console.log(`[new connection][halloween] -> `, socket.id)

    require("./sockets/halloweenMap.js")(socket, allPlayers, halloweenSpace)
  })



app.use("/", openToAll)
app.use("/game", needLogin)


httpServer.listen(8081, (err) => {
  if (err)
    return console.log("Erro no server: ", err)
  
  console.clear()
  console.log("Server is running! In PORT: 8081")
})