import { halloweenRoom } from '../../services/Socket.js'


export default function HalloweenConnection(scene) {
    /* -------- Sockets --------- */
    halloweenRoom.emit("new player", {
        token: localStorage.getItem("token_login"),
        character: "steve"
      })
      
      halloweenRoom.on("initial state", (data) => {
        scene.startGame(data)
      })
  
      halloweenRoom.on("new player", (player) => {
        scene.createPlayer(player)
      })
  
      halloweenRoom.on("delete player", (playerID) => {
        scene.deletePlayer(playerID)
      })
  
      halloweenRoom.on("many-moviments", (data) => {
        console.log("moviment: ", data)
        for (var i in scene.players.children.entries) {
          for (var c=0; c < data.move.length; c++) {
            
            if (scene.players.children.entries[i].configs.socketID === data.move[c].id) {
              scene.players.children.entries[i].configs.move(data.move[c].side)
            }
            
          }
          for (var c=0; c < data.stop.length; c++) {
  
            if (scene.players.children.entries[i].configs.socketID === data.stop[c]) {
              scene.players.children.entries[i].configs.stop()
            }
  
          }
        }
      })
  

    return
}