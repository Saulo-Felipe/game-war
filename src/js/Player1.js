export default function Player(scene, skin) {
  this.life = 100
  this.skin = skin
  this.velocity = {
    x: 500, 
    y: 1400
  }

  // Create player
  var physicsCache = scene.cache.json.get("steve-physics") 
  this.sprite = scene.physics.add.sprite(500, 900, "player")
  this.sprite.setBounce(0.1)
  this.sprite.setCollideWorldBounds(true)

  this.sprite.body.setSize(this.sprite.width*0.3, this.sprite.height*0.75)
  this.sprite.setOffset(80, 25)

  
  // Tool Functions
  this.changeVelocityX = (velocity) => {
    if (this.velocity.x !== velocity)
      this.velocity.x = velocity
  }
  this.changeVelocityY = (velocity) => {
    if (this.velocity.y !== velocity)
      this.velocity.y = velocity
  }

  this.moveHorizontal = (side) => {
    this.sprite.play("run", true)

    if (!side) {
      this.fliplayer(false)
      this.sprite.setVelocityX(this.velocity.x)
    } else {
      this.fliplayer(true)
      this.sprite.setVelocityX(-this.velocity.x)
    }
  }

  this.moveStopped = () => {
    this.sprite.play("stopped", true)
    this.sprite.setVelocityX(0)
  }
  this.moveUp = () => {
    this.sprite.setVelocityY(-this.velocity.y)
    this.sprite.play("jump", true)
  }

  this.fliplayer = (pos) => {
    if (this.sprite.flipX !== pos) {
      if (pos)
        this.sprite.setOffset(55, 25)
      else
        this.sprite.setOffset(80, 25)      
    
      this.sprite.flipX = pos
    }
  }

  animations(scene)
}

function animations(scene) {
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