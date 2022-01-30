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


  // Functions
  this.changeVelocityX = (velocity) => {
    if (this.velocity.x !== velocity)
      this.velocity.x = velocity
  }
  this.changeVelocityY = (velocity) => {
    if (this.velocity.y !== velocity)
      this.velocity.y = velocity
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