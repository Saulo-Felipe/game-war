export default function Player(scene, skin) {
  this.life = 100
  this.skin = skin
  this.velocity = {
    x: 10, 
    y: 30
  }
  this.allowJump = false
  this.inFloor = false

  var physicsCache = scene.cache.json.get("steve-physics") 
  this.sprite = scene.matter.add.sprite(500, 400, "player", "Idle1.png", { shape: physicsCache.Steve }).setFixedRotation()
  this.sprite.setBounce(0.1)

  scene.matter.world.on("collisionactive", (event, bodyA, bodyB) => {
    //     var activedCollisions = event.source.pairs.collisionActive

    // for (var i = 0; i < activedCollisions.length; i++) {
    //   let {bodyA, bodyB} = activedCollisions[i]

    //   console.log("Active: ", bodyA, bodyB)
    // }

    // if (bodyB.parent.label === "Steve") {
    //   if (bodyA.label === "setJump")
    //     this.allowJump = true
    //   else if (bodyA.label === "lava") {
    //     this.changeVelocityX(1)
    //     this.changeVelocityY(20)
    //     this.sprite.setTint(0xff0000)
    //     this.allowJump = true
    //   }

      this.inFloor = true
    // }
  })
  scene.matter.world.on("collisionstart", (event) => {
            var activedCollisions = event.source.pairs.collisionActive

    for (var i = 0; i < activedCollisions.length; i++) {
      let {bodyA, bodyB} = activedCollisions[i]

      console.log("Active: ", bodyA, bodyB)
    }
  })
  scene.matter.world.on('collisionend', (event) => {


    // if (bodyB.parent.label === "Steve") {
    //   if (bodyA.label === "lava") {
    //     this.changeVelocityX(10)
    //     this.changeVelocityY(30)
    //     this.sprite.clearTint()
    //   }
    //   if (this.allowJump)
    //     this.allowJump = false
    //   if (this.inFloor)
    //     this.inFloor = false
    // }
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
    this.inFloor
      ? this.sprite.play(type, true) 
      : this.sprite.play("jump", true)
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
    key: "stop",
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