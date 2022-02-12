export default function Preload() {
	var assetsDir = "../../assets/"

	// Map
	this.load.image("background", assetsDir+"maps/halloween/background.png")
	this.load.image("halloween_tileset", assetsDir+"maps/halloween/map_tileset.png")
	this.load.tilemapTiledJSON("halloween_tilemap", assetsDir+"maps/halloween/halloween_tilemap.json")

	// Player
	this.load.atlas("steve", assetsDir+"sprites/steve/spritesheet.png", assetsDir+"sprites/steve/spritesheet.json")

}