import Animations from '../components/phaser/Animations.js'
import Player from '../components/phaser/Player.js'
import Loading from '../tools/Loading.js'
import Phaser from 'phaser'

export default class Game extends Phaser.Scene {

  constructor() {
    super("Game")
  }

  preload() {
    // Map
    this.load.image("background", require("../assets/maps/halloween/background.png"))
    this.load.image("halloween_tileset", require("../assets/maps/halloween/map_tileset.png"))
    this.load.tilemapTiledJSON("halloween_tilemap", require("../assets/maps/halloween/halloween_tilemap.json"))
  
    // Player
    this.load.atlas("steve", require("../assets/sprites/steve/spritesheet.png"), require("../assets/sprites/steve/spritesheet.json"))
  
    // Weapons
    this.textures.addBase64('purpleBullet', require("../assets/weapons/bullet.png"))
    this.load.spritesheet("explosion", require("../assets/weapons/explosion.png"), { 
      frameWidth: 105, frameHeight: 105, endFrame: 6 
    })

    Loading(this)
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0)

    this.player = new Player(this)
  
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
    
  
    Animations(this)
    this.keys = this.input.keyboard.createCursorKeys()
  }

  update() {
    let {up, left, right, space} = this.keys

    if (right.isDown)
      this.player.moveHorizontal(false)
    else if (left.isDown)
      this.player.moveHorizontal(true)
    else
      this.player.moveStopped()
  
    if (up.isDown && this.player.sprite.body.onFloor())
      this.player.moveJump()
  
    if (space.isDown)
      this.player.fire()
    else if (space.isUp)
      this.player.property.isShooting = false
  
    if (this.player.property.fireTime > 0) 
      this.player.property.fireTime -= 1
  
    if (this.player.sprite.body.speed > 0) {
      this.player.lavaCollision()
    }
  }


}