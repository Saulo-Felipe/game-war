import Steve from '../components/phaser/Steve.js'
import GhostGun from '../components/phaser/GhostGun.js'
import Loading from '../components/phaser/Loading.js'
import Phaser from 'phaser'
import { halloweenRoom } from '../services/Socket.js'


export default class HalloweenMap extends Phaser.Scene {

  constructor() {
    super("Game-Halloween")
  }

  init(data) {
    this.gameState = {
      dispatch: data.dispatch,
      self: data.character
    }

    console.log("[Game iniciado] Your state -> ", data)
    this.tick = 10
  }

  preload() {

    // Map
    // this.load.image("background", require("../assets/maps/halloween/background.png"))
    this.load.image("halloween_tileset", require("../assets/maps/halloween/map_tileset.png"))
    this.load.tilemapTiledJSON("halloween_tilemap", require("../assets/maps/halloween/halloween_tilemap.json"))
  
    // Player
    this.load.atlas("steve", require(`../assets/sprites/steve.png`), require(`../assets/sprites/steve.json`))
    // this.load.atlas("ghostGun", require(`../assets/sprites/ghostGun.png`), require(`../assets/sprites/ghostGun.json`))

    // Weapons
    // this.textures.addBase64('purpleBullet', require("../assets/weapons/bullet.png"))
    // this.load.spritesheet("explosion", require("../assets/weapons/explosion.png"), { 
      // frameWidth: 105, frameHeight: 105, endFrame: 6 
    // })

    Loading(this)
  }

  create() {
    // this.add.image(0, 0, "background").setOrigin(0, 0)
  
    // Map
    this.map = this.make.tilemap({ key: "halloween_tilemap", tileWidth: 120, tileHeight: 120 })
    this.tiles = this.map.addTilesetImage("halloween_tileset", "halloween_tileset", 120, 120)  

      // Lava positions
    this.lavaPositions = []
    this.map.findObject('lava', obj => {
      this.lavaPositions.push({
        x: obj.x,
        y: obj.y+60,
        width: obj.width
      })
    })
    
    // --------- Players ---------
    this.players = this.physics.add.group({
      name: "players",
      collideWorldBounds: true,
      allowGravity: true,
    })

    this.currentPlayer = false




    // this.players.createFromConfig({
    //   key: "ghostGun",
    //   name: "phanta",
    //   "setXY.x": 500,
    //   "setXY.y": 800,
    //   "body.teste": "ola isso funciona kkkk"
    // })
    
    // Layers
    this.platform = this.map.createLayer("platforms", this.tiles)
    this.platform.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.players, this.platform, null, null, this)
  

    // this.players.create({
    //   x: 300,
    //   y: 700,
    //   key: "explosion",
    // })
  
    // this.physics.add.collider(this.player.bullets, this.platform, (bullet) => {
    //   bullet.disableBody(true, true)
  
    //   let [explosion] = this.allExplosions.getMatching('visible', false)
  
    //   if (explosion) {
    //     explosion.setPosition(bullet.body.center.x, bullet.body.center.y)
    //     explosion.visible = true
    //     explosion.play("explodeAnimation", true)
    //   }
    // }, null, this)

    // Map collision

      // fire
    // this.input.on('pointerdown', () => {
    //   this.player.fire()
    // })
  
      // Camera
    this.cameras.main.setBounds(0, 0, 6000, 1800)
    this.physics.world.setBounds(0, 0, 6000, 1800)
        
    this.keys = this.input.keyboard.createCursorKeys()

    this.allExplosions = this.add.group({
      name: "explosions",
    })
    this.allExplosions.createMultiple({
      key: "explosion",
      quantity: 50,
      visible: false,
    })


    halloweenRoom.emit("new player", { // Initial State
      token: localStorage.getItem("token_login"),
      character: this.gameState.self
    }, (response) => {
      // Lembrar de verificar token invalido no callback
      for (var c = 0; c < response.length; c++) {
        this.players.createFromConfig({
          key: response[c].character,
          "setXY.x": response[c].x,
          "setXY.y": response[c].y,
        })
        
        this.players.getLast(true).user = {
          id: response[c].userID,
          name: response[c].name,
          socketID: response[c].socketID,
          character: response[c].character,
          movimentX: 0,
          x: response[c].x,
          y: response[c].y
        }
      }

      this.currentPlayer = {
        socketID: halloweenRoom.id,
        sprite: this.players.getLast(true)
      }

      this.cameras.main.startFollow(this.currentPlayer.sprite)


      console.log("[halloween][initial state]", response)
      console.log("[halloween][update state]", this.players.children)
    })

    halloweenRoom.on("new player", (newPlayer) => {
      this.players.createFromConfig({
        key: newPlayer.character,
        "setXY.x": newPlayer.x,
        "setXY.y": newPlayer.y,
      })

      this.players.getLast(true).user = {
        id: newPlayer.userID,
        name: newPlayer.name,
        socketID: newPlayer.socketID,
        character: newPlayer.character,
        movimentX: 0,
        x: newPlayer.x,
        y: newPlayer.y
      }
      
      console.log("[halloween][new player]")
      console.log("[halloween][update state]", this.players.children)
    })

    this.sendMoveHorizontal = (data) => {
      // console.log("speed: ", this.currentPlayer.sprite.body)
      if (this.currentPlayer.sprite.user.movimentX === 0) {
        console.log("[Send moviment]")
        halloweenRoom.emit("move-player", {
          id: halloweenRoom.id,
          side: data ? "right" : "left",
        })
      }
    }

    halloweenRoom.on("move-player", (data) => {      
      this.players.children.each((player) => {
        if (player.user.socketID === data.id) {
          
          // console.log("Antes: ", player.body.x)

          // player.body.setVelocityX(data.side === "right" ? 450 : -450)

          // console.log("Depois: ", player.body.x)

          player.user.movimentX = data.side === "left" ? 15 : -15

          // this.gameState.playersInMoviment += 1
          // console.log("Somado: ", this.gameState.playersInMoviment)
          // console.log("[Receive Moviment] -> ", data.side)

        }
      }, this)
    })

    this.moveAllPlayers = () => {
      this.players.children.each((player) => {
        if (player.user.movimentX < 0) {
          player.setVelocityX(250)
          player.user.movimentX += 5
          console.log("Right")

        } else if (player.user.movimentX > 0) {
          player.setVelocityX(-250)
          player.user.movimentX -= 5
          console.log("Left")

        // } else if (player.body.speed > 0) {
        }
        // } else {
        //   // player.setVelocityX(0)
        //   // this.gameState.playersInMoviment -= 1
        //   // console.log("diminuindo 1: ", this.gameState.playersInMoviment)
        // }
      })
    }

    halloweenRoom.on("delete player", (playerID) => {
      console.log("player disconectado: ", playerID)

      this.players.children.each((player) => {
        if (player.user.id === playerID) {

          console.log("[destruido] ", player)
          player.destroy()
        }
      }, this)
      console.log("[halloween][update state]", this.players.children)
    })

  }

  update() {
    let {up, left, right, space} = this.keys


    if (right.isDown)
      this.sendMoveHorizontal(true)
    else if (left.isDown)
      this.sendMoveHorizontal(false)

    if (this.tick === 0) {
      this.tick = 10
      // console.log("update")
      this.moveAllPlayers()



    
      // if (up.isDown && this.sprite.body.onFloor())
        // this.sendMoveJump()
    

      if (space.isDown)
        this.currentPlayer.sprite.body.setVelocity(300, 0)
      //   this.sendFire()
      // else if (space.isUp)
        // this.player.property.isShooting = false
    
      // if (this.player.property.fireTime > 0) 
        // this.player.property.fireTime -= 1
    
      // if (this.player.sprite.body.speed > 0) {
        // this.player.lavaCollision()
      // }
    } else {
      this.tick -= 1
    }
  }


}

