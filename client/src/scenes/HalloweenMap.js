import Steve from '../components/phaser/Steve.js'
import GhostGun from '../components/phaser/GhostGun.js'
import Loading from '../components/phaser/Loading.js'
import Phaser from 'phaser'
import socket from '../services/Socket.js'


export default class HalloweenMap extends Phaser.Scene {

  constructor() {
    super("Game-Halloween")
  }

  init(data) {
    this.gameState = {
      useDispatch: data.useDispatch,
      self: null
    }
    console.log("Seu estado: ", data)
  }

  preload() {

    // Map
    this.load.image("background", require("../assets/maps/halloween/background.png"))
    this.load.image("halloween_tileset", require("../assets/maps/halloween/map_tileset.png"))
    this.load.tilemapTiledJSON("halloween_tilemap", require("../assets/maps/halloween/halloween_tilemap.json"))
  
    // Player
    this.load.atlas("steve", require(`../assets/sprites/steve.png`), require(`../assets/sprites/steve.json`))
    this.load.atlas("ghostGun", require(`../assets/sprites/ghostGun.png`), require(`../assets/sprites/ghostGun.json`))
    

    // Weapons
    this.textures.addBase64('purpleBullet', require("../assets/weapons/bullet.png"))
    this.load.spritesheet("explosion", require("../assets/weapons/explosion.png"), { 
      frameWidth: 105, frameHeight: 105, endFrame: 6 
    })

    Loading(this)
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0)

    this.player = new Steve(this)
  
    // Map
    this.map = this.make.tilemap({ key: "halloween_tilemap", tileWidth: 120, tileHeight: 120 })
    this.tiles = this.map.addTilesetImage("halloween_tileset", "halloween_tileset", 120, 120)
  
      // Layers
    this.platform = this.map.createLayer("platforms", this.tiles)
  
      // Map collision
    this.platform.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player.sprite, this.platform, null, null, this)

  
      // Lava positions
    this.lavaPositions = []
    this.map.findObject('lava', obj => {
      this.lavaPositions.push({
        x: obj.x,
        y: obj.y+60,
        width: obj.width
      })
    })
  
    this.allExplosions = this.add.group({
      name: "explosions",
    })
    this.allExplosions.createMultiple({
      key: "explosion",
      quantity: 50,
      visible: false,
    })

    this.allEnemies = this.physics.add.group({
      name: "allEnemies",
    })

    // this.allEnemies.create
  
    this.physics.add.collider(this.player.bullets, this.platform, (bullet) => {
      bullet.disableBody(true, true)
  
      let [explosion] = this.allExplosions.getMatching('visible', false)
  
      if (explosion) {
        explosion.setPosition(bullet.body.center.x, bullet.body.center.y)
        explosion.visible = true
        explosion.play("explodeAnimation", true)
      }
    }, null, this)
  
      // fire
    this.input.on('pointerdown', () => {
      this.player.fire()
    })
  
      // Camera
    this.cameras.main.startFollow(this.player.sprite)
    this.cameras.main.setBounds(0, 0, 6000, 1800)
    this.physics.world.setBounds(0, 0, 6000, 1800)
        
    this.keys = this.input.keyboard.createCursorKeys()

    socket.on("move-player", (data) => this.receiveMoveHorizontal(data))

    this.sendMoveHorizontal = (data) => {
      console.log("Enviando dados")
      socket.emit("move-player", {
        id: socket.id,
        side: data,
      })
    }

    this.receiveMoveHorizontal = (data) => {
      console.log("Recebendo dados...")
    }

    this.sendMoveStopped = () => {
      
    }

    this.sendMoveJump = () => {

    } 
    this.sendFire = () => {

    }

  }

  update() {
    let {up, left, right, space} = this.keys

    if (right.isDown)
      this.sendMoveHorizontal(false)
    else if (left.isDown)
      this.sendMoveHorizontal(true)
    else
      this.sendMoveStopped()
  
    // if (up.isDown && this.sprite.body.onFloor())
      // this.sendMoveJump()
  
    if (space.isDown)
      this.sendFire()
    // else if (space.isUp)
      // this.player.property.isShooting = false
  
    // if (this.player.property.fireTime > 0) 
      // this.player.property.fireTime -= 1
  
    // if (this.player.sprite.body.speed > 0) {
      // this.player.lavaCollision()
    // }
  }


}

