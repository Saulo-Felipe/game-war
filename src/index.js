import Preload from './js/scenes/Preload.js'
import Create from './js/scenes/Create.js'
import Update from './js/scenes/Update.js'

new Phaser.Game({
	type: Phaser.AUTO,
	width: 2000,
	height: 1000,
	scene: {
		preload: Preload,
		create: Create,
		update: Update,
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 1700, x: 0 },
			debug: true,
			tileBias: 120,
		}
	}
})