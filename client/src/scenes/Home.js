import Phaser from 'phaser'

export default class Home extends Phaser.Scene {
  constructor() {
    super("Home")
  }

  preload() {
    
  }

  create() {
    document.querySelector(".play").addEventListener("click", () => {
      document.querySelector("#dashboard").style.marginLeft = "-100%"

      setTimeout(() => { // animation delay
        this.scene.start("Game")
        // Phaser.Scene.call("Game")
      }, 600);
    })
  }

}



function clientError(error) {
  console.log("eror")
}