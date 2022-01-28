var config = {
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
      gravity: { y: 1 },
      debug: true,
      enableSleep: false
    },
  },
}

var game = new Phaser.Game(config)
let skaterTouchingGround

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
  map = this.make.tilemap({key: "map_json"})
  tileset = map.addTilesetImage("map_tileset", "tiles")

  CollideLayer = map.createLayer("mapTMX", tileset, 0, 0)

  CollideLayer.setCollisionBetween(1, 50)
  
  this.matter.world.convertTilemapLayer(CollideLayer)

  CollideLayer.setCollisionByExclusion([-1]);

  // Player shape
  physicsCache = this.cache.json.get("steve-physics")

  player = this.matter.add.sprite(400, 300, "player", "Idle1.png", { shape: physicsCache.Steve }).setFixedRotation()
  this.matter.world.setBounds(0, 0, game.config.width*2, 1300)

  noCollisionsLayer = map.createLayer("noCollisions", tileset, 0, 0) // Só carrego o layer, não seto nenhuma colisão

  // Map collision

  // Camera
  this.cameras.main.setBounds(0, 0, 4000, 1300)
  this.cameras.main.startFollow(player)

  cursors = this.input.keyboard.createCursorKeys()

  this.matter.world.on("collisionactive", (skater, ground) => {
    skaterTouchingGround = true
  })

  this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
    console.log('collision End: ', event);
  });
  // this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
  //   console.log("começou: ", bodyA, bodyB)
  //   // if((bodyA.label == "plane" && bodyB.label == "obstacle") || (bodyB.label == "plane" && bodyA.label == "obstacle")) {
  //   //     if(plane.anims.getCurrentKey() != "explode") {
  //   //         plane.play("explode");
  //   //         plane.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
  //   //             plane.destroy();
  //   //         });
  //   //     }
  //   // }
  // });

  // animation
  this.anims.create({
    key: "run",
    frameRate: 15,
    frames: this.anims.generateFrameNames("player", {
      prefix: "Run",
      suffix: ".png",
      start: 1,
      end: 8,
      zeroPad: 1
    }),
    repeat: -1
  })
  this.anims.create({
    key: "stop",
    frameRate: 15,
    frames: this.anims.generateFrameNames("player", {
      prefix: "Idle",
      suffix: ".png",
      start: 1,
      end: 10,
      zeroPad: 1
    }),
    repeat: -1
  })
  this.anims.create({
    key: "jump",
    frameRate: 5,
    frames: this.anims.generateFrameNames("player", {
      prefix: "Jump",
      suffix: ".png",
      start: 4,
      end: 9,
      zeroPad: 1
    }),
    repeat: -1
  })

}

function update() {
  updateMovePlayer()
}

function flipPlayer(pos) { 
  if (player.scaleX != pos)
    player.scaleX = pos
  player.setFixedRotation()
}

function updateMovePlayer() {
  if (cursors.right.isDown) {
    player.setVelocityX(+10)
    flipPlayer(1)

    if (skaterTouchingGround)
      player.play("run", true)

  } else if (cursors.left.isDown) {
    player.setVelocityX(-10)
    flipPlayer(-1)

    if (skaterTouchingGround)
      player.play("run", true)

  } else {
    player.setVelocityX(0)
    if (skaterTouchingGround)
      player.play("stop", true)
  }
  if (cursors.up.isDown && skaterTouchingGround) {
    player.setVelocityY(-10)
    skaterTouchingGround = false
  }

  if (!skaterTouchingGround)
    player.play("jump", true)

}