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

		// Lava group

  this.lavaGroup = this.physics.add.staticGroup({})

  this.map.findObject('lava', obj => {
  	var objPos = this.lavaGroup.create(obj.x, obj.y)
  	objPos.body.width = obj.width
  	objPos.body.height = obj.height
  })



  this.physics.add.overlap(this.player.sprite, this.lavaGroup, () => this.player.property.takingDamage = true)




	// Camera
  this.cameras.main.startFollow(this.player.sprite)
  this.cameras.main.setBounds(0, 0, 6000, 1800)
  this.physics.world.setBounds(0, 0, 6000, 1800)
	


	this.keys = this.input.keyboard.createCursorKeys()
}