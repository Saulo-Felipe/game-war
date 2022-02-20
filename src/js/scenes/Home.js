export default class Home extends Phaser.Scene {
  constructor() {
    super("Home")
  }

  preload() {
    var assetsDir = "../../assets/"

    this.load.image("background", assetsDir+"maps/halloween/background.png")
    this.load.image("halloween_tileset", assetsDir+"maps/halloween/map_tileset.png")
    this.load.tilemapTiledJSON("halloween_tilemap", assetsDir+"maps/halloween/halloween_tilemap.json")
  }

  create() {
    // Background Map
    this.add.image(0, 0, "background").setOrigin(0, 0)

    this.map = this.make.tilemap({ key: "halloween_tilemap", tileWidth: 120, tileHeight: 120 })
    this.tiles = this.map.addTilesetImage("halloween_tileset", "halloween_tileset", 120, 120)

    this.platform = this.map.createLayer("platforms", this.tiles)


    this.input.on('pointerdown', () => console.log("X: ", this.cam.scrollX, "Y: ", this.cam.scrollY))

    this.cam = this.cameras.main
    this.side = {x: true, y: true}
    
    Dashboard(this)
  }

  update() {
    if (this.side.x)
      this.cam.scrollX += 2
    else 
      this.cam.scrollX -= 2
    
    if (this.side.y) 
      this.cam.scrollY += 2
    else
      this.cam.scrollY -= 2

    
    if (this.cam.scrollX > 4000)
      this.side.x = false
    else if (this.cam.scrollX < 0)
      this.side.x = true

    if (this.cam.scrollY > 800)
      this.side.y = false
    else if (this.cam.scrollY < 0)
      this.side.y = true    
  }
}

function Dashboard(scene) {
  document.querySelector(".play").addEventListener("click", () => {
    scene.scene.start("Game")
  })

  var allCarouselItems = document.querySelectorAll(".select-img-container")
  
  var carouselPosition = 0
  
  document.querySelector(".next-person").addEventListener("click", () => {
    console.log("next")
    
    if (carouselPosition < allCarouselItems.length) {
      console.log("Posição: ", carouselPosition)
      for (var c = 0; c < allCarouselItems.length; c++) {
        allCarouselItems[c].style.transform = `translateX(-${100*carouselPosition}%)`
      }
      carouselPosition++
    }
  })

  document.querySelector(".back-person").addEventListener("click", () => {
    console.log("to go back")

    if (carouselPosition > 0) {
      console.log("Posição: ", carouselPosition)
      
      for (var c = 0; c < allCarouselItems.length; c++) {
        allCarouselItems[c].style.transform = `translateX(-${100*carouselPosition}%)`
      }  

      carouselPosition--
    }

  })
}