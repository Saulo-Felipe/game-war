export default function Player(scene) {
	this.property = {
		velocityX: 650,
		velocityY: 1150,
		fireTime: 20
	}

	// Player
	this.sprite = scene.physics.add.sprite(300, 1000, "steve")
	this.sprite.setCollideWorldBounds(true)
	this.sprite.body.setSize(this.sprite.width*0.3, this.sprite.height*0.75)
  this.sprite.setOffset(80, 25)

  // Bullets
  this.bullets = scene.physics.add.group({
  	name: "bullets",
  	enable: false,
  	allowGravity: false,
  })
  this.bullets.createMultiple({
  	key: "purpleBullet",
  	quantity: 10,
  	active: false,
  	visible: false,
  	name: "bullet"
  })


	// Tools functions
	this.moveHorizontal = side => {
		if (side)
			this.sprite.setVelocityX(-this.property.velocityX)
		else
			this.sprite.setVelocityX(this.property.velocityX)

    if (this.sprite.body.onFloor())
			this.sprite.play("run", true)
		else
			this.sprite.play("jump", true)


		this.flipPlayer(side)
	}

	this.moveStopped = () => {
		this.sprite.setVelocityX(0)

		if (this.sprite.body.onFloor()) {
			this.sprite.play("stopped", true)
		}
		else {
			this.sprite.play("jump", true)
		}
	}

	this.moveJump = () => {
		this.sprite.setVelocityY(-this.property.velocityY)
		this.sprite.play("jump", true)
	}

	this.flipPlayer = type => {
    if (type)
      this.sprite.setOffset(55, 25)
    else
      this.sprite.setOffset(80, 25)      
  
    this.sprite.flipX = type
	}

	this.changeVelocity = newVelocity => {
		this.property.velocityX = newVelocity.x
		this.property.velocityY = newVelocity.y
	}

	this.fire = () => {
		if (this.property.fireTime == 0) {
	  	let bullet = this.bullets.getFirstDead(false)

	  	if (bullet) {
	  		let x = this.sprite.flipX ? this.sprite.x - 40 : this.sprite.x + 40
	  		let y = this.sprite.y

	  		bullet.enableBody(true, x, y, true, true)
	  		bullet.setVelocityX(this.sprite.flipX ? -1100 : 1100)

	  		console.log("[shoot] Start")
	  	}			

	  	this.property.fireTime = 20
		}
	}

	this.lavaCollision = () => {
		let haveLavaCollision = false

		for (var c = 0; c < scene.lavaPositions.length; c ++) {
			let obj = scene.lavaPositions[c]
			if (this.sprite.y+130 > obj.y && this.sprite.x > obj.x && this.sprite.x < obj.x+obj.width ) {
				haveLavaCollision = true
				break
			}
		}

		if (haveLavaCollision) {
			this.sprite.setTint(0xff0000)
			this.changeVelocity({ x: 100, y: 1000 })

		} else {			
			this.changeVelocity({ x: 650, y: 1150 })
			this.sprite.clearTint()
		}
	}

	animations(scene)
}


function animations(scene) {
	scene.anims.create({
    key: "run",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Run",
      suffix: ".png",
      start: 1,
      end: 8,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "run-shoot",
    frameRate: 6,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Run-shoot",
      suffix: ".png",
      start: 1,
      end: 5,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "stopped",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Idle",
      suffix: ".png",
      start: 1,
      end: 10,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "stopped-shoot",
    frameRate: 10,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Idle-shoot",
      suffix: ".png",
      start: 1,
      end: 10,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "jump",
    frameRate: 5,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Jump",
      suffix: ".png",
      start: 4,
      end: 9,
      zeroPad: 1
    }),
    repeat: -1
  })
}