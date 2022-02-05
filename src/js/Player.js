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

  var physicsCache = scene.cache.json.get("steve-physics") 
  this.sprite = scene.matter.add.sprite(500, 900, "player", "Idle1.png", { shape: physicsCache.Steve }).setFixedRotation()
  this.sprite.setBounce(0.1)

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
  this.verifyAnimation = (type) => {
    if (type === "right" || type === "left") {
      if (this.isShooting) {
        this.sprite.play("run-shoot", true)
        this.changeVelocityX(5)
      } else {
        this.sprite.play("run", true)
      }
    } else if (type === "stopped") {
      if (this.isShooting) {
        this.sprite.play("stopped-shoot", true)
      } else {
        this.sprite.play("stopped", true)
      }
    } else {
      this.sprite.play("jump", true)
    }
  }
  this.fliplayer = (pos) => {
    if (this.sprite.scaleX != pos) {
      this.sprite.scaleX = pos
      this.sprite.setFixedRotation()
    }      
  }
  this.setVelocityX = (vel) => {
    this.sprite.setVelocityX(vel)

  }
  this.setVelocityY = (vel) => {
    this.allowJump = false
    this.sprite.setVelocityY(vel)
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