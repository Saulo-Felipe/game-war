const jwt = require("jsonwebtoken")
const sequelize = require("../database/connect.js")

module.exports = (socket, allPlayers, mapSocket) => {

  const game = {
    addPlayer,
    newPlayer,
    deletePlayer,
    disconnected,
    movePlayer,
    sendCurrentData,
  }

  var movimentState = []
  
  // Lembrar de arrumar o bug

  setInterval(() => {
    if (movimentState.length > 0) {
      socket.emit("many-moviments", movimentState)
      movimentState = []
    }
  }, 100)

  socket.on("new player", (data) => {
    console.log("[new player]: ", data)

    game.newPlayer(data)
  })

  socket.on("disconnect", (reason) => {
    console.log("disconecte: ", reason, socket.id)

    game.disconnected(reason)
  })

  socket.on("move-player", (id, side) => {
    game.movePlayer(id, side)
  })

  /* ----------- Tools Functions ---------- */
  function addPlayer(player) {
    allPlayers[player.socketID] = player

    console.log("[HW: addPlayer]: ", player)
    console.log("all players: ", allPlayers)
  }

  function deletePlayer(socketID) {
    console.log("antes dde deletar", allPlayers)
    delete allPlayers[socketID]

    console.log("[HW: deletePlayer]")
  }

  function movePlayer(id, side) {
    movimentState.push({id, side})
  }

  function sendCurrentData() {
    let currentGame = { ...allPlayers }
    //console.log("emitiando: ", currentGame, allPlayers)

    socket.emit("initial state", currentGame)
  }

  function newPlayer(player) {

    if (player.token && typeof player.token !== 'undefined' && player.token !== null && player.token.length !== 0) {
      jwt.verify(player.token, process.env.SECRETE_TOKEN, async (err, decoded) => {
        if (err) {
          console.log("Returned false")

          return false
        }

        if (decoded && decoded.userID) {
          var [user] = await sequelize.query(`
            SELECT name FROM player WHERE id = ${decoded.userID}
          `)
          
          for (var c in allPlayers) {
            if (allPlayers[c].userID === decoded.userID) {
              console.log("Returned false")
              return false
            }
          } // checks if the player is already in a room

          let newPlayerData = {
            userID: decoded.userID,
            name: user[0].name,
            socketID: socket.id,
            character: player.character,
            x: 1000,
            y: 800,
          }

          game.addPlayer(newPlayerData)
          game.sendCurrentData()
          socket.broadcast.emit("new player", newPlayerData)
        }
      })
    } else {
      return false
    }
  }

  function disconnected(reason) {
    let disconnectedPlayer = { ...allPlayers[socket.id] }
    console.log("removendo ele: ", disconnectedPlayer)

    mapSocket.emit("delete player", disconnectedPlayer.userID)

    game.deletePlayer(socket.id)

    console.log("[HW: disconnected] -> ", reason, allPlayers)
  }
}