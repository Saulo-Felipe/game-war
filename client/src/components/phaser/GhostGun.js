import { ghostGunAnimation } from './Animations'

export default function GhostGun(scene) {
  ghostGunAnimation(scene)

	this.property = {
		velocityX: 650,
		velocityY: 1150,
		fireTime: 10,
    isShooting: false,
	}

	// Player
	this.sprite = scene.physics.add.sprite(300, 1000, "ghostGun")
	this.sprite.setCollideWorldBounds(true)
	this.sprite.body.setSize(this.sprite.width*0.3, this.sprite.height*0.75)
  this.sprite.setOffset(80, 25)

  // Bullets
  this.bullets = scene.physics.add.group({
  	name: "bullets",
  	enable: false,
  	allowGravity: false,
    collideWorldBounds: true
  })
  this.bullets.createMultiple({
  	key: "purpleBullet",
  	quantity: 100,
  	active: false,
  	visible: false,
  	name: "bullet"
  })


	// Tools functions
	this.moveHorizontal = side => {
		if (side) {
			this.sprite.setVelocityX(-this.property.velocityX)
			console.log("Moving")
		}
		else
			this.sprite.setVelocityX(this.property.velocityX)

    if (this.sprite.body.onFloor())
  		this.sprite.play("ghostGun-run", true)

		else
      this.sprite.play("ghostGun-jump", true)
    
		this.flipPlayer(side)
	}

	this.moveStopped = () => {
		this.sprite.setVelocityX(0)

		if (this.sprite.body.onFloor()) {
      this.sprite.play("ghostGun-stopped", true)
		}
		else {
			this.sprite.play("ghostGun-jump", true)
		}
	}

	this.moveJump = () => {
		this.sprite.setVelocityY(-this.property.velocityY)
    
    this.sprite.play("ghostGun-jump", true)
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
	  		bullet.setVelocityX(this.sprite.flipX ? -1600 : 1600)

	  		console.log("[shoot] Start")
	  	}			

	  	this.property.fireTime = 10
		}

    this.property.isShooting = true
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

}
