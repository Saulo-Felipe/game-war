import Home from "./js/scenes/Home.js"
import Game from "./js/scenes/Game.js"

var game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 2000,
	height: 1000,
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


export { game }