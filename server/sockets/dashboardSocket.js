const sequelize = require("../database/connect.js")
const jwt = require("jsonwebtoken")

module.exports = (socket, globalOnlinePlayers, onlinePlayers) => {

  socket.on("new player", (token) => {
    console.log("\nAntes: ", globalOnlinePlayers)
    console.log("[Token recebido]")
    if (token && typeof token !== 'undefined' && token !== null && token.length !== 0) {

      jwt.verify(token, process.env.SECRETE_TOKEN, async (err, decoded) => {
        console.log("[Token verificado]")

        if (!err && decoded && decoded.userID) {

          var [user] = await sequelize.query(`
            SELECT name FROM player WHERE id = ${decoded.userID}
          `)

          for (var c=0; c < globalOnlinePlayers.length; c++) {
            if (globalOnlinePlayers[c].userID === decoded.userID)
              return
          }
          
          console.log("[enviando dados para outros clients]")
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

          console.log("[Updated players] ", globalOnlinePlayers)
        }
      })
    }
  })

  socket.on("disconnect", (reason) => {
    for (var c=0; c < globalOnlinePlayers.length; c++) {

      if (globalOnlinePlayers[c].socketID === socket.id) {
        console.log("[delete player] ", globalOnlinePlayers[c])

        onlinePlayers.emit("delete player", globalOnlinePlayers[c].userID)

        globalOnlinePlayers.splice(c, 1)
        console.log("[new state] ", globalOnlinePlayers)
      }
    }
  })

  socket.on("get players", (data, callback) => {
    console.log("[send players] ", globalOnlinePlayers)
    callback(globalOnlinePlayers)
  })

}