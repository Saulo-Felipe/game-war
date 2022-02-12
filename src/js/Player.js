export default function Player(scene) {
	this.property = {
		velocityX: 650,
		velocityY: 1150,
		takingDamage: false,
	}


	// Player
	this.sprite = scene.physics.add.sprite(40, 40, "steve")
	this.sprite.setCollideWorldBounds(true)
	this.sprite.body.setSize(this.sprite.width*0.3, this.sprite.height*0.75)
  this.sprite.setOffset(80, 25)





	// Tools functions
	this.moveHorizontal = side => {
		if (side)
			this.sprite.setVelocityX(-this.property.velocityX)
		else
			this.sprite.setVelocityX(this.property.velocityX)

		
		this.flipPlayer(side)

    if (this.sprite.body.onFloor())
			this.sprite.play("run", true)
		else
			this.sprite.play("jump", true)
	}

	this.moveStopped = () => {
		this.sprite.setVelocityX(0)

		if (this.sprite.body.onFloor())
			this.sprite.play("stopped", true)
		else
			this.sprite.play("jump", true)
	}

	this.moveJump = () => {
		this.sprite.setVelocityY(-this.property.velocityY)
		this.sprite.play("jump", true)
	}

	this.flipPlayer = type => {
    if (this.sprite.flipX !== type) {
      if (type)
        this.sprite.setOffset(55, 25)
      else
        this.sprite.setOffset(80, 25)      
    
      this.sprite.flipX = type
    }
	}


	this.setLavaCollision = collides => {
		if (collides)
			this.sprite.setTint(0xff0000)
		else
			this.sprite.clearTint()
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