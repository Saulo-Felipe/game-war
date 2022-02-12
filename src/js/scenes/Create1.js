import Player from '../Player.js'
import Bullet from '../Items/Bullet.js'

export default function create() {
  this.add.image(0, 0, 'halloween-background').setOrigin(0, 0)

  // Map config
  var map = this.make.tilemap({key: "map_json", tileWidth: 120, tileHeight: 120})
  var tileset = map.addTilesetImage("map_tileset", "tiles")


  // Object Collisions (to fix ghost collision)
  // map.findObject('ghostCollision', obj => {
  //  if (obj.name === 'removeGhost' || obj.name === 'setJump' || obj.name === "lava")
  //    console.log()
  // })

  // Player shape
  this.player = new Player(this, "steve")


  this.collideLayer = map.createLayer("mapTMX", tileset)
  this.overlapLayer = map.createLayer("overlapTiles", tileset)

  map.createLayer("secondLayer", tileset, 0, 0) // Layer sem colisões


  // Tilemap collision
  this.collideLayer.setCollisionByProperty({ collides: true })
  this.physics.add.collider(this.collideLayer, this.player.sprite)


  // Camera
  this.cameras.main.setBounds(0, 0, 6000, 1800)
  this.physics.world.setBounds(0, 0, 6000, 1800)
  this.cameras.main.startFollow(this.player.sprite)


  this.input.on('pointerdown', (event) => {
    console.log("GrouP: ", this.player)
  })


  this.cursors = this.input.keyboard.createCursorKeys()
}