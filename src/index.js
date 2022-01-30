import Player from './js/Player.js'

var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 2000,//5600
  height: 1000,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 3 },
      debug: true,
      // enableSleep: true
    },
  },
})

const gameState = {
  enemies: [],
  player: {
    velocityX: 10,
    velocityY: 30,
  },
  setVelocityX, 
  setVelocityY
}

var player, player


function preload() {
  // background
  this.load.image("halloween-background", "assets/maps/halloween/background.png")

  // Map
  this.load.image("tiles", "assets/maps/halloween/map_tileset.png")
  this.load.tilemapTiledJSON("map_json", "assets/maps/halloween/map_tileset.json")
  
  // Player
  this.load.atlas("player", "assets/sprites/steve/spritesheet.png", "assets/sprites/steve/spritesheet.json")
  this.load.json("steve-physics", "assets/sprites/steve/physics.json")
}


function create() {
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
    player = new Player(this, "steve")
    player.sprite.setBounce(0.1)


  
  var CollideLayer = map.createLayer("mapTMX", tileset, 0, 0)

  map.createLayer("secondLayer", tileset, 0, 0) // Layer sem colisões
  
  CollideLayer.setCollisionByProperty({ collides: true }) // Colisão

  this.matter.world.convertTilemapLayer(CollideLayer)

  // Camera
    this.cameras.main.setBounds(0, 0, 6000, 1800)
    this.cameras.main.startFollow(player.sprite)
  
  // Lava damage
    CollideLayer.forEachTile((tile) => {
      // In Tiled, the platform tiles have been given a "type" property which is a string

    })

  // Collisions
    this.matter.world.on("collisionactive", (event, bodyA, bodyB) => {
      if (bodyA.label === "setJump")
        player.allowJump = true
      else if (bodyA.label === "lava") {
        player.changeVelocityX(1)
        player.changeVelocityY(20)
        player.sprite.setTint(0xff0000)
        player.allowJump = true
      }

      player.inFloor = true
    })

    this.matter.world.on('collisionend', (event, bodyA) => {
      console.log("saindo da colisão")
      if (bodyA.label === "lava") {
        player.changeVelocityX(10)
        player.changeVelocityY(30)
        player.sprite.clearTint()
      }
      player.allowJump = false
      player.inFloor = false
    })

    
  this.cursors = this.input.keyboard.createCursorKeys()
}

function update() {
  var {left, right, up} = this.cursors

  if (right.isDown) {
    player.sprite.setVelocityX(player.velocity.x)

    fliplayer(1)
    verifyAnimation("run")
  }
  else if (left.isDown) {
    player.sprite.setVelocityX(-player.velocity.x)
    fliplayer(-1)
    verifyAnimation("run")
    
  } else {
    player.sprite.setVelocityX(0)
    verifyAnimation("stop")
  }
  if (up.isDown && player.allowJump)
    player.sprite.setVelocityY(-player.velocity.y)
}

function fliplayer(pos) { 
  if (player.sprite.scaleX != pos)
    player.sprite.scaleX = pos
  player.sprite.setFixedRotation()
}

function verifyAnimation(type) {
  player.inFloor 
    ? player.sprite.play(type, true) 
    : player.sprite.play("jump", true)
}
function setVelocityX(velocity) {
  gameState.player.velocityX = velocity
}
function setVelocityY(velocity) {
  gameState.player.velocityY = velocity
}
