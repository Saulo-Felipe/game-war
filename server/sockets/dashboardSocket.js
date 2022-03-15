const sequelize = require("../database/connect.js")
const jwt = require("jsonwebtoken")

module.exports = (socket, globalOnlinePlayers, onlinePlayers) => {

  socket.on("new player", (token) => {
    if (token && typeof token !== 'undefined' && token !== null && token.length !== 0) {

      jwt.verify(token, process.env.SECRETE_TOKEN, async (err, decoded) => {

        if (!err && decoded && decoded.userID) {

          var [user] = await sequelize.query(`
            SELECT name FROM player WHERE id = ${decoded.userID}
          `)

          for (var c=0; c < globalOnlinePlayers.length; c++) {
            if (globalOnlinePlayers[c].userID === decoded.userID)
              return
          }
          
          socket.broadcast.emit("new player", {
            userID: decoded.userID,
            name: user[0].name,
            socketID: socket.id
          })

          globalOnlinePlayers.push({ // Cadastra novo player
            userID: decoded.userID,
            name: user[0].name,
            socketID: socket.id
          })

        }
      })
    }
  })

  socket.on("disconnect", (reason) => {
    for (var c=0; c < globalOnlinePlayers.length; c++) {

      if (globalOnlinePlayers[c].socketID === socket.id) {

        onlinePlayers.emit("delete player", globalOnlinePlayers[c].userID)

        globalOnlinePlayers.splice(c, 1)
      }
    }
  })

  socket.on("get players", (data, callback) => {
    callback(globalOnlinePlayers)
  })

}