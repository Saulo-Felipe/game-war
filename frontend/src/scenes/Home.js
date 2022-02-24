import Phaser from 'phaser'

export default class Home extends Phaser.Scene {
  constructor() {
    super("Home")
  }

  preload() {
    
  }

  create() {
    Carousel(this)
    document.querySelector(".play").addEventListener("click", () => {
      document.querySelector("#dashboard").style.marginLeft = "-100%"

      setTimeout(() => { // animation delay
        this.scene.start("Game")
        // Phaser.Scene.call("Game")
      }, 600);
    })
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

}

function clientError(error) {

}