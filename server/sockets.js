const sequelize = require("./database/connect.js")
const jwt = require("jsonwebtoken")

module.exports = (io) => {
  const globalOnlinePlayers = []

  io.on("connection", (socket) => {
    console.log(`[new connection] -> `, socket.id)

    newGlobalPlayer(socket)
    deleteGlobalPlayer(socket)
  })
  
  function newGlobalPlayer(socket) {
    socket.on("new-player-online", (token, callback) => {
      if (token && typeof token !== 'undefined' && token !== null && token.length !== 0) {
        for (var c = 0; c < globalOnlinePlayers.length; c++)
          if (globalOnlinePlayers[c].token === token) {
            console.log("Ja está logado")
            
            return callback(false) // Impede que o mesmo jogador jogue em mais de 1 dispositivo
          }
        
        console.log("nao está logado")
  
        jwt.verify(token, process.env.SECRETE_TOKEN, async (err, decoded) => {
          
          if (!err && decoded && decoded.userID) {
            var [user] = await sequelize.query(`
              SELECT name FROM player WHERE id = ${decoded.userID}
            `)

            globalOnlinePlayers.push({ // Cadastra novo player
              name: user[0].name,
              token: token,
              randomID: socket.id
            })
            socket.broadcast.emit("new-player-online", user[0])
            callback(globalOnlinePlayers)
          }
          
        })
      }
    })
  }

  function deleteGlobalPlayer(socket) {
    socket.on("disconnect", (id) => {
      console.log("ID disconect: ", id)
      for (var c=0; c < globalOnlinePlayers.length; c++) {
        if (globalOnlinePlayers[c].randomID === socket.id) {
          console.log("deletando: ", globalOnlinePlayers[c])
          globalOnlinePlayers.splice(c, 1)
        }
      }
    })
  }
}