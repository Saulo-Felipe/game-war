var player, cursors

export default function Create() {
  this.add.image(0, 0, 'halloween-background').setOrigin(0, 0)
  
  // Map config
  var map = this.make.tilemap({key: "map_json"})
  var tileset = map.addTilesetImage("map_tileset", "tiles")

  this.matter.world.setBounds(0, 0, 6000, 1800)

  // Object Collisions (to fix ghost collision)
    map.findObject('ghostCollision', obj => {
      if (obj.name === 'removeGhost' || obj.name === 'setJump' || obj.name === "lava")
        this.matter.add.rectangle(
          obj.x + (obj.width / 2), obj.y + (obj.height / 2),
          obj.width, obj.height,
          { isStatic: true, label: obj.name }
        )
    })

  // Player shape
    var physicsCache = this.cache.json.get("steve-physics") 
    player = this.matter.add.sprite(400, 400, "player", "Idle1.png", { shape: physicsCache.Steve }).setFixedRotation() 
    player.setBounce(0.1)

  
  var CollideLayer = map.createLayer("mapTMX", tileset, 0, 0)

  map.createLayer("secondLayer", tileset, 0, 0) // Layer sem colisões
  
  CollideLayer.setCollisionByProperty({ collides: true }) // Colisão

  this.matter.world.convertTilemapLayer(CollideLayer)

  player.teste = "sauloooooooooooo"
  console.log("teste: ", player)


  // Camera
    this.cameras.main.setBounds(0, 0, 6000, 1800)
    this.cameras.main.startFollow(player)
  
  // Lava damage
    CollideLayer.forEachTile((tile) => {
      // In Tiled, the platform tiles have been given a "type" property which is a string

    })

  // Collisions
    this.matter.world.on("collisionactive", (event, bodyA, bodyB) => {
      if (bodyA.label === "setJump" || bodyA.label === "lava")
        player.allowJump = true

      player.inFloor = true
    })

    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if (bodyA.label === "lava") {
        setVelocityX(1)
        setVelocityY(20)
        player.setTint(0xff0000)
      }
    })

    this.matter.world.on('collisionend', (event, bodyA) => {
      if (bodyA.label === "lava") {
        setVelocityX(10)
        setVelocityY(30)
        player.clearTint()
      }
      player.allowJump = false
      player.inFloor = false
    })

  cursors = this.input.keyboard.createCursorKeys()
  
  animations(this.anims)
}
function animations(anims) {
  // animation
   anims.create({
     key: "run",
     frameRate: 15,
     frames: anims.generateFrameNames("player", {
       prefix: "Run",
       suffix: ".png",
       start: 1,
       end: 8,
       zeroPad: 1
     }),
     repeat: -1
   })
   anims.create({
     key: "stop",
     frameRate: 15,
     frames: anims.generateFrameNames("player", {
       prefix: "Idle",
       suffix: ".png",
       start: 1,
       end: 10,
       zeroPad: 1
     }),
     repeat: -1
   })
   anims.create({
     key: "jump",
     frameRate: 5,
     frames: anims.generateFrameNames("player", {
       prefix: "Jump",
       suffix: ".png",
       start: 4,
       end: 9,
       zeroPad: 1
     }),
     repeat: -1
   })
 }

export function updateMovePlayer() {
  if (cursors.right.isDown) {
    player.setVelocityX(gameState.player.velocityX)
    flipPlayer(1)
    verifyAnimation("run")
  }
  else if (cursors.left.isDown) {
    player.setVelocityX(-gameState.player.velocityX)
    flipPlayer(-1)
    verifyAnimation("run")
    
  } else {
    player.setVelocityX(0)
    verifyAnimation("stop")
  }
  if (cursors.up.isDown && player.allowJump)
    player.setVelocityY(-gameState.player.velocityY)
}

function verifyAnimation(type) {
  player.inFloor 
    ? player.play(type, true) 
    : player.play("jump", true)
}