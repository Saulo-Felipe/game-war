import Loading from '../../components/phaser/Loading.js'
import Phaser from 'phaser'
import sockets from './sockets.js'
import functionalities from './functionalities.js'


export default class HalloweenMap extends Phaser.Scene {

  constructor() {
    super("Game-Halloween")
  }

  init(data) {
    this.gameState = {
      dispatch: data.dispatch,
      skin: data.character,
      start: false,
      tick: 10,
      moving: false,
      currentPlayer: false,
      followPlayer: null,
      pressedKeys: [],
    }
  }

  preload() {
    let assetsDir = "../../"
    // Map
    this.load.image("background", require("../../assets/maps/halloween/background.png"))
    this.load.image("halloween_tileset", require("../../assets/maps/halloween/map_tileset.json"))
    this.load.tilemapTiledJSON("halloween_tilemap", require("../../assets/maps/halloween/halloween_tilemap.json"))

    // Skins
    this.load.atlas("steve", require(`../../assets/sprites/steve.json`), require(`../../assets/sprites/steve.json`))
    // this.load.atlas("ghostGun", require(`../assets/sprites/ghostGun.png`), require(`../assets/sprites/ghostGun.json`))

    // Weapons
    // this.textures.addBase64('purpleBullet', require("../assets/weapons/bullet.png"))
    // this.load.spritesheet("explosion", require("../assets/weapons/explosion.png"), { 
    //   frameWidth: 105, frameHeight: 105, endFrame: 6 
    // })
    Loading(this)
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0)

    this.map = this.make.tilemap({ key: "halloween_tilemap", tileWidth: 120, tileHeight: 120 })
    this.tiles = this.map.addTilesetImage("halloween_tileset", "halloween_tileset", 120, 120)  

    /* --------- Camera ---------*/
    this.cameras.main.setBounds(0, 0, 6000, 1800)
    this.physics.world.setBounds(0, 0, 6000, 1800)

    /* --------- Players Group --------- */
    this.players = this.physics.add.group({
      name: "players",
      collideWorldBounds: true,
      allowGravity: true,
    })

    sockets(this)
    functionalities(this)



    /* -------- Functions --------- */


    /* -------- Layers and collisions --------- */    
    this.platform = this.map.createLayer("platforms", this.tiles)
    this.platform.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.players, this.platform, null, null, this)    



    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        this.sendStopMoviment()
        this.gameState.moving = false
      }
    })

    this.keys = this.input.keyboard.createCursorKeys() 
  }


  update() {
    if(this.gameState.start) {
      let { up, left, right } = this.keys


      if (this.gameState.tick === 0) {
        if (up.isDown) {
          this.sendPlayerMoviment("up")
        }
        if (left.isDown) {
          this.sendPlayerMoviment("left")
        }
        else if (right.isDown) {
          this.sendPlayerMoviment("right")
        }
      
        this.gameState.tick = 10
      } else {
        this.gameState.tick -= 1
      }
    }
  }

}