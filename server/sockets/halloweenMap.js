const jwt = require("jsonwebtoken")
const sequelize = require("../database/connect.js")

module.exports = (socket, mapSocket) => {
  const allPlayers = []
  const game = {
    addPlayer,
    newPlayer,
    deletePlayer,
    disconnected,
    movePlayer,
  }

  // Lembrar de arrumar o bug

  socket.on("new player", (data, callback) => {
    game.newPlayer(data, callback)
  })

  socket.on("disconnect", (reason) => {
    game.disconnected(reason)
  })

  socket.on("move-player", (data) => {
    movePlayer(data)
  })



  /* ----------- Tools Functions ---------- */
  function addPlayer(newPlayer) {
    allPlayers[newPlayer.socketID] = newPlayer

    console.log("[HW: addPlayer]: ", newPlayer)
    console.log("all players: ", allPlayers)
  }

  function deletePlayer(socketID) {
    delete allPlayers[socketID]

    console.log("[HW: deletePlayer]")
  }

  function movePlayer(moviment) {
    for (var c = 0; c < allPlayers.length; c++) {
      if (allPlayers[c].socketID === moviment.id) {
        
        mapSocket.emit("move-player", moviment)
        return 
      }
    }
  }

  function newPlayer(player, callback) {
    if (player.token && typeof player.token !== 'undefined' && player.token !== null && player.token.length !== 0) {
      jwt.verify(player.token, process.env.SECRETE_TOKEN, async (err, decoded) => {
        if (err) return callback(false)

        if (decoded && decoded.userID) {
          var [user] = await sequelize.query(`
            SELECT name FROM player WHERE id = ${decoded.userID}
          `)

          for (var c = 0; c < allPlayers.length; c++) {
            if (allPlayers[c].userID === decoded.userID)
              return callback(false)
          } // checks if the player is already in a room

          let newPlayer = {
            userID: decoded.userID,
            name: user[0].name,
            socketID: socket.id,
            character: player.character,
            x: 300,
            y: 800,
          }

          game.addPlayer(newPlayer)

          callback(allPlayers)

          socket.broadcast.emit("new player", newPlayer)
        }
      })
    }
  }

  function disconnected(reason) {
    console.warn("Teste de send: ", allPlayers[socket.id])
    mapSocket.emit("delete player", allPlayers[socket.id].userID)

    game.deletePlayer(socket.id)

    console.log("[HW: disconnected] -> ", reason, allPlayers)
  }
}