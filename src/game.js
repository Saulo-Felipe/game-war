/* @types { import("../typings/phaser") } */
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: false,
    }
  }
}

var game = new Phaser.Game(config)

function preload() {
  this.load.image("sky", "assets/sky.png")
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 
    'assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );      
}

function create() {
  this.add.image(400, 300, "sky")

  platforms = this.physics.add.staticGroup()

  platforms.create(400, 568, "ground").setScale(2).setScale(2).refreshBody()
  platforms.create(600, 400, 'ground')
  platforms.create(50, 250, 'ground')
  platforms.create(750, 220, 'ground')

  
  player = this.physics.add.sprite(200, 50, 'dude');

  player.setBounce(0.2); // Quica quando cai no chão
  player.setCollideWorldBounds(true); // Evitar que o player saia da tela
  
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  
  this.anims.create({
    key: 'turn',
    frames: [ {key: 'dude', frame: 4} ],
    frameRate: 20
  });
  
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  player.body.setGravityY(100)

  this.physics.add.collider(player, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.overlap(player, stars, collectStar, null, this);

  this.physics.add.collider(stars, platforms)

  var score = 0
  scoreText = this.add.text(16, 16, "Pontuação: 0", { fontSize: '32px', fill: "black" })

  bombs = this.physics.add.group()

  function collectStar (player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  this.physics.add.collider(bombs, platforms)

  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function hitBomb() {
  this.registry.destroy(); // destroy registry
  this.events.off(); // disable all active events
  this.scene.restart();
  // this.physics.pause()
  // player.setTint(0xff0000)

  // player.anims.play('turn')

  gameOver = true
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }

  else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }
  
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-430);
  }
}