import Player from '../components/Player.js'
import Animations from '../components/Animations.js'

export default function Create() {
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