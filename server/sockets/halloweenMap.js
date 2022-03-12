const jwt = require("jsonwebtoken")
const sequelize = require("../database/connect.js")

module.exports = (socket, playersInHalloweenRoom, halloweenSpace) => {
  socket.on("new player", (data, callback) => {

    if (data.token && typeof data.token !== 'undefined' && data.token !== null && data.token.length !== 0) {

      jwt.verify(data.token, process.env.SECRETE_TOKEN, async (err, decoded) => {
        if (err) return callback(false)

        if (decoded && decoded.userID) {
          var [user] = await sequelize.query(`
            SELECT name FROM player WHERE id = ${decoded.userID}
          `)

          for (var c = 0; c < playersInHalloweenRoom.length; c++) { // Verifica se o player já está jogando na sala
            if (playersInHalloweenRoom[c].id === decoded.userID)
              return callback(false)
          }

          let newPlayer = {
            userID: decoded.userID,
            name: user[0].name,
            socketID: socket.id,
            character: data.character
          }
          playersInHalloweenRoom.push(newPlayer)

          console.log("[halloween]: ", playersInHalloweenRoom)
          
          callback(playersInHalloweenRoom)
          socket.broadcast.emit("new player", newPlayer)
        }
      })
    }
  })

  socket.on("disconnect", (reason) => {
    for (var c=0; c < playersInHalloweenRoom.length; c++) {
      if (playersInHalloweenRoom[c].socketID === socket.id) {
        console.log("[before] ", playersInHalloweenRoom)

        halloweenSpace.emit("delete player", playersInHalloweenRoom[c].userID)
        playersInHalloweenRoom.splice(c, 1)
        
        console.log("[disconnected] -> new state: ", playersInHalloweenRoom)
      }
    }
  })
}