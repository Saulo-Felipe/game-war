import Player from '../Player.js'

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

  // Bullet 
  	// Collision
  this.physics.add.collider(this.player.bullets, this.platform, (bullet) => {
  	const { x, y } = bullet.body.center

  	bullet.disableBody(true, true)
	  console.log("[shoot] End")
  	this.add.sprite(x, y, "explosion").play("explodeAnimation")

  }, null, this)

  	// fire
  this.input.on('pointerdown', () => {
  	this.player.fire()
  })

  this.anims.create({
  	key: 'explodeAnimation',
		frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }),
    frameRate: 10,
  })
 

  //this.explosionSprite.on('animationcomplete', () => this.explosionSprite.destroy())

	// Camera
  this.cameras.main.startFollow(this.player.sprite)
  this.cameras.main.setBounds(0, 0, 6000, 1800)
  this.physics.world.setBounds(0, 0, 6000, 1800)
	


	this.keys = this.input.keyboard.createCursorKeys()
}