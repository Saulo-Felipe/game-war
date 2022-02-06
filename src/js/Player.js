import Bullet from "./Items/Bullet.js"

export default function Player(scene, skin) {
  this.life = 100
  this.skin = skin
  this.velocity = {
    x: 10, 
    y: 30
  }
  this.allowJump = false
  this.inFloor = false
  this.isShooting = false

  this.lastFired = 0
  this.speed = Phaser.Math.GetSpeed(300, 1)


  var physicsCache = scene.cache.json.get("steve-physics") 
  this.sprite = scene.matter.add.sprite(500, 900, "player", "Idle1.png", { shape: physicsCache.Steve }).setFixedRotation()
  this.sprite.setBounce(0.1)

  // Bullets
  this.bullets = scene.add.group({
    classType: Bullet,
    maxSize: 1000,
    runChildUpdate: true
  })

  // Player Collisions
  scene.matter.world.on("collisionactive", (event) => {
    var pairs = event.pairs

    for (var c = 0; c < pairs.length; c++) {
      var {bodyA, bodyB} = pairs[c]

      if (bodyA.label === "Steve" || bodyB.label === "Steve") {
        if (!this.inFloor)
          this.inFloor = true
  
        if ((bodyA.label === "setJump" || bodyB.label === "setJump")) {
          this.allowJump = true
        }
        else if (bodyA.label === "lava" || bodyB.label === "lava") {
          this.changeVelocityX(1)
          this.changeVelocityY(20)

          if (!this.allowJump)
            this.allowJump = true
  
          if (!this.sprite.isTinted)
            this.sprite.setTint(0xff0000)
        }
        break;
      }
    }
  })

  scene.matter.world.on('collisionend', (event, bodyA, bodyB) => {
    if (bodyA.label === "Steve" || bodyB.label === "Steve") {
      if (bodyA.label === "lava" || bodyB.label === "lava") {
        this.changeVelocityX(10)
        this.changeVelocityY(30)

        if (this.sprite.isTinted)
          this.sprite.clearTint()
      }

      if (bodyA.label === "setJump" || bodyB.label === "setJump") {
        this.allowJump = false
      }
      
      if (this.inFloor)
        this.inFloor = false
    }
  })
  

  // Functions
  this.changeVelocityX = (velocity) => {
    if (this.velocity.x !== velocity)
      this.velocity.x = velocity
  }
  this.changeVelocityY = (velocity) => {
    if (this.velocity.y !== velocity)
      this.velocity.y = velocity
  }

  this.moveHorizontal = side => {
    if (this.inFloor) {
      if (!this.isShooting) {
        this.sprite.play("run", true)
  
        this.changeVelocityX(10)
      } else {
        this.sprite.play("run-shoot", true)
  
        this.changeVelocityX(5)
      }        
    }

    if (side === "right") {
      this.fliplayer(1)
      this.sprite.setVelocityX(this.velocity.x)
    } else {
      this.fliplayer(-1)
      this.sprite.setVelocityX(-this.velocity.x)
    }
  }
  this.moveStopped = () => {
    if (this.inFloor) {
      if (!this.isShooting)
        this.sprite.play("stopped", true)
      else if (this.inFloor)
        this.sprite.play("stopped-shoot", true)
    }

    this.sprite.setVelocityX(0)
  }
  this.moveUp = () => {
    if (this.allowJump) {
      this.allowJump = false
      this.sprite.setVelocityY(-this.velocity.y)
      this.sprite.play("jump", true)
    }
  }

  this.fliplayer = (pos) => {
    if (this.sprite.scaleX != pos) {
      this.sprite.scaleX = pos
      this.sprite.setFixedRotation()
    }      
  }

  this.shoot = (time) => {
    if (this.inFloor && time > this.lastFired) {
      var bullet = this.bullets.get()

      if (bullet) {
        bullet.fire(this.sprite.x, this.sprite.y, this.sprite.scaleX)
        this.lastFired = time + 50
        this.isShooting = true
      }
    }
  }

  scene.anims.create({
    key: "run",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("player", {
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
    frames: scene.anims.generateFrameNames("player", {
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
    frames: scene.anims.generateFrameNames("player", {
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
    frames: scene.anims.generateFrameNames("player", {
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
    frames: scene.anims.generateFrameNames("player", {
      prefix: "Jump",
      suffix: ".png",
      start: 4,
      end: 9,
      zeroPad: 1
    }),
    repeat: -1
  })
}