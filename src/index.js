import Preload from './js/scenes/Preload.js'
import Create from './js/scenes/Create.js'
import Update from './js/scenes/Update.js'

var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 2000,//5600
  height: 1000,
  scene: {
    preload: Preload,
    create: Create,
    update: Update,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 },
      debug: true,
    },
  },
})

