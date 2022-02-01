import Player from '../Player.js'
import Bullet from '../Items/Bullet.js'

export default function create() {
  var gameState = {
    weaponsAvailable: {},
  }
  this.add.image(0, 0, 'halloween-background').setOrigin(0, 0)

  // Map config
  var map = this.make.tilemap({key: "map_json"})
  var tileset = map.addTilesetImage("map_tileset", "tiles")

  this.matter.world.setBounds(0, 0, 6000, 1800)

  // Object Collisions (to fix ghost collision)
  map.findObject('ghostCollision', obj => {
    if (obj.name === 'removeGhost' || obj.name === 'setJump' || obj.name === "lava")
      this.matter.add.rectangle(
        obj.x + (obj.width / 2),
        obj.y + (obj.height / 2),
        obj.width,
        obj.height,
        {
          isStatic: true,
          label: obj.name 
        }
      )
  })

  // Player shape
  this.player = new Player(this, "steve")

  var CollideLayer = map.createLayer("mapTMX", tileset, 0, 0)

  map.createLayer("secondLayer", tileset, 0, 0) // Layer sem colisões

  CollideLayer.setCollisionByProperty({ collides: true }) // Colisão

  this.matter.world.convertTilemapLayer(CollideLayer)


  // Camera
  this.cameras.main.setBounds(0, 0, 6000, 1800)
  this.cameras.main.startFollow(this.player.sprite)

  this.cursors = this.input.keyboard.createCursorKeys()

  this.input.on('pointerdown', (event) => console.log('click: ', this.player))


  new Bullet(this, "steve-bullet")
}