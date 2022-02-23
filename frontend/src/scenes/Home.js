import Phaser from 'phaser'

export default class Home extends Phaser.Scene {
  constructor() {
    super("Home")
  }

  preload() {
    try {
      this.allCharacter = {
        "ninja": { 
          element: document.querySelector("#ninja"), 
          name: "ninja",
          indexLimit: 9 
        },
        "steve": { 
          element: document.querySelector("#steve"), 
          name: "steve",
          indexLimit: 9
        }
      }
      this.selectedCharacter = "ninja"
      this.frameVelocity = 5
      this.currentFrame = 0

    } catch(error) {
      clientError(error)
    }
    
  }

  create() {
    Carousel(this)
  }

  update() {
    try {
      this.allCharacter[this.selectedCharacter].element.src = `../../assets/dashboard/${this.selectedCharacter}/${this.selectedCharacter}${this.currentFrame}.png`

      if (this.currentFrame == this.allCharacter[this.selectedCharacter].indexLimit) {
        this.currentFrame = 0
        // console.log("alterando frame para 0")
      }
      
      if (this.frameVelocity === 0) {
        this.frameVelocity = 5
        this.currentFrame += 1
      } else
        this.frameVelocity -= 1

    } catch(error) {
      clientError(error)
    }
  }
}

function Carousel(scene) {
  try {
    document.querySelector(".play").addEventListener("click", () => {
      document.querySelector("#dashboard").style.marginLeft = "-100%"

      setTimeout(() => { // animation delay
        scene.scene.start("Game")
        // Phaser.Scene.call("Game")
      }, 600);
    })


    // -----------------| Controls |----------------------- //
    var allCarouselItems = document.querySelectorAll(".select-img-container")
    var carouselPosition = 0
    
    document.querySelector(".next-person").addEventListener("click", () => {    
      if (carouselPosition+1 < allCarouselItems.length) {

        carouselPosition++

        for (var c = 0; c < allCarouselItems.length; c++) {
          allCarouselItems[c].style.transform = `translateX(-${100*carouselPosition}%)`
        }

        scene.selectedCharacter = Object.keys(scene.allCharacter)[carouselPosition]
      }
    })

    document.querySelector(".back-person").addEventListener("click", () => {
      if (carouselPosition > 0) {      
        carouselPosition--

        for (var c = 0; c < allCarouselItems.length; c++)
          allCarouselItems[c].style.transform = `translateX(-${100*carouselPosition}%)`

          scene.selectedCharacter = Object.keys(scene.allCharacter)[carouselPosition]
        }
    })

  } catch(error) {
    clientError(error)
  }
}

function clientError(error) {
  alert("Erro no sistema. A página será recarregada por motivos de segurança.")
  console.error("Erro no client side: ", error)

  window.location.reload()
}