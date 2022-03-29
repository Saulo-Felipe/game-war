import { halloweenRoom } from "../../services/Socket"

export default function functionalities(scene) {
    scene.startFollow = (sprite) => {
      scene.cameras.main.startFollow(sprite)
    }

    scene.createPlayer = (newPlayer) => {
      scene.players.createFromConfig({
        key: newPlayer.character,
        "setXY.x": newPlayer.x,
        "setXY.y": newPlayer.y,
      })

      let thePlayer = scene.players.getLast(true)
      thePlayer.configs = { 
        ...newPlayer, 
        move: (side) => {
          if (side === "left")
            thePlayer.setVelocityX(-600)
          else if (side === "right")
            thePlayer.setVelocityX(600)
          else if (side === "up")
            thePlayer.setVelocityY(-1300)
        },
        stop: () => {
          thePlayer.setVelocityX(0);
        },
      }

      if (thePlayer.configs.socketID === halloweenRoom.id) {
        scene.gameState.currentPlayer = thePlayer
        scene.startFollow(scene.gameState.currentPlayer)
      }
    }

    scene.startGame = (initialData) => {
      if (initialData) {
        for (var c in initialData) {
          scene.createPlayer(initialData[c])
        }
        console.log("[game started] -> ", initialData)
        scene.gameState.start = true
      } else {
        console.error("[initialization error]", initialData)
      }
    }

    scene.deletePlayer = (playerID) => {
      for (var c in scene.players.children.entries) {
        if (scene.players.children.entries[c].configs.userID === playerID) {
          scene.players.children.entries[c].destroy()
        }
      }
    }

    scene.sendPlayerMoviment = (side) => {
      if ((side == "right" || side == "left")) {
        scene.gameState.moving = true
        console.log("ENviando movimento")
        halloweenRoom.emit("move-player", halloweenRoom.id, side)

      } else if (side == "up" && scene.gameState.currentPlayer.body.onFloor()) {
        halloweenRoom.emit("move-player", halloweenRoom.id, side)
      }
    }

    scene.sendStopMoviment = () => {
      halloweenRoom.emit("stop-player", halloweenRoom.id)
    }

    scene.movePlayer = (sprite, side) => {
      console.log("[Moviment captado]")

    }

}