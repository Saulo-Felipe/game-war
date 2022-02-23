import Home from "./js/scenes/Home.js"
import Game from "./js/scenes/Game.js"

new Phaser.Game({
	type: Phaser.AUTO,
	width: window.innerWidth*2, // 6000
	height: window.innerHeight*2, // 1800
	scene: [Home, Game],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 1700, x: 0 },
			// debug: true,
			tileBias: 120,
		}
	}
})
