export default function Preload() {
	var assetsDir = "../../assets/"

	// Map
	this.load.image("background", assetsDir+"maps/halloween/background.png")
	this.load.image("halloween_tileset", assetsDir+"maps/halloween/map_tileset.png")
	this.load.tilemapTiledJSON("halloween_tilemap", assetsDir+"maps/halloween/halloween_tilemap.json")

	// Player
	this.load.atlas("steve", assetsDir+"sprites/steve/spritesheet.png", assetsDir+"sprites/steve/spritesheet.json")

	// Weapons
	this.load.image("purpleBullet", assetsDir+"weapons/bullet.png")
	this.load.spritesheet("explosion", assetsDir+"weapons/explosion.png", { 
		frameWidth: 105, frameHeight: 105, endFrame: 6 
	})

	LoadingScreen(this)
}


function LoadingScreen(scene) {
	var progressBar = scene.add.graphics()
	var progressBox = scene.add.graphics()

  var {width, height} = scene.cameras.main

  progressBox.fillStyle(0x222222, 0.8)
	progressBox.fillRect(width/2-700/2, height/2-65/2, 700, 65)
  


  var loadingText = scene.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);  

	scene.load.on("progress", (value) => {
		console.log("value: ", value)

		progressBar.clear()
		progressBar.fillStyle(0xffffff, 1)
		progressBar.fillRect(width/2-(680*value)/2, height/2-50/2, 680 * value, 50)
	})

	scene.load.on("fileprogress", (file) => {
		console.log(file.src)
	})

	scene.load.on("complete", () => {
		console.log("Finish!")
    progressBar.destroy()
    progressBox.destroy()
	})

}