const express = require('express')
const app = express()
const cors = require("cors")

const { createServer } = require("http") 
const { Server } = require("socket.io")
const httpServer = createServer(app)

const openToAll = require("./routes/openToAll.js")
const needLogin = require("./routes/needLogin.js")

const io = new Server(httpServer,   {cors: {
  origin: ["https://3000-saulofelipe-gamewar-t1xjx75yjq2.ws-us34.gitpod.io"]
}})

require("dotenv").config()

// Middlewares
  app.use(express.json())
  app.use(cors({
    origin: "https://3000-saulofelipe-gamewar-t1xjx75yjq2.ws-us34.gitpod.io",
    credentials: true,
    optionSuccessStatus: 200,
  }))



io.on("connection", (socket) => {
  console.log(`[new connection] -> `, socket.id)
})


app.use("/", openToAll)
app.use("/game", needLogin)



httpServer.listen(8081, (err) => {
  if (err)
    return console.log("Erro no server: ", err)

    console.clear()
    console.log("Server is running! In PORT: 8081")
})  