export default function Preload() {
    // background
    this.load.image("halloween-background", "../assets/maps/halloween/background.png")

    // Map
    this.load.image("tiles", "../assets/maps/halloween/map_tileset.png")
    this.load.tilemapTiledJSON("map_json", "../assets/maps/halloween/map_tileset.json")
    
    // Player
    this.load.atlas("player", "../assets/sprites/steve/spritesheet.png", "assets/sprites/steve/spritesheet.json")
    this.load.json("steve-physics", "../assets/sprites/steve/physics.json")
}