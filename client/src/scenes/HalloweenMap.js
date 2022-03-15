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
      skin: data.character,
      start: false,
      tick: 10,
      currentPlayer: false,
      followPlayer: null
    }
  }

  preload() {
    // Map
    this.load.image("background", require("../assets/maps/halloween/background.png"))
    this.load.image("halloween_tileset", require("../assets/maps/halloween/map_tileset.png"))
    this.load.tilemapTiledJSON("halloween_tilemap", require("../assets/maps/halloween/halloween_tilemap.json"))

    // Skins
    this.load.atlas("steve", require(`../assets/sprites/steve.png`), require(`../assets/sprites/steve.json`))
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



    /* -------- Sockets --------- */
    halloweenRoom.emit("new player", {
      token: localStorage.getItem("token_login"),
      character: "steve"
    }, (response) => {
      this.startGame(response)
    })


    /* -------- Functions --------- */
    this.startFollow = (sprite) => {
      this.cameras.main.startFollow(sprite)
    }

    this.createPlayer = (newPlayer) => {
      
    }

    this.startGame = (initialData) => {
      if (initialData) {
        console.log("[game started] -> ", initialData)
      }
    }


    /* -------- Layers and collisions --------- */    
    this.platform = this.map.createLayer("platforms", this.tiles)
    this.platform.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.players, this.platform, null, null, this)    
  }

  update() {
    if(this.gameState.start) {


    }
  }

}