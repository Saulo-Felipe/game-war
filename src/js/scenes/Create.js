import Player from '../Player.js'
import Bullet from '../Items/Bullet.js'

export default function create() {
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



  // this.createShot = function() {
  //   new Bullet(this, "steve-bullet")
  // }


  this.bullets = this.add.group({
    classType: Bullet,
    maxSize: 1000,
    runChildUpdate: true
  })
  this.lastFired = 0


  this.speed = Phaser.Math.GetSpeed(300, 1);


  this.input.on('pointerdown', (event) => {
    console.log("GrouP: ", this.bullets)
  
  })


  // this.bullets = this.add.group()

  // this.bullets.createMultiple({
  //   key: "bullet",
  //   quantity: 10,
  //   visible: true,
  //   active: true,
  //   hitArea: Phaser.Geom.Rectangle.Contains
  // })
  
  // var cres = 20
  // var boundsA = this.bullets.children.entries[0]
  // var boundsB = this.bullets.children.entries[1]

  // this.bullets.children.each((bullet) => {
  //   bullet.x = 300 + cres
  //   bullet.y = 1000
  //   cres += 20
  // }, this)

  // console.log("bounds: ", boundsA, boundsB)

  // console.log("[GROUP]: ", this.bullets)

  this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
    // console.log("=================================")
    // console.log(bodyA)
    // console.log(bodyB)
  })

  function resetBullet(bul) {
    bul.kill()
  }
}