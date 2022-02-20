export default class Home extends Phaser.Scene {
  constructor() {
    super("Home")
  }

  preload() {
    var assetsDir = "../../assets/"

    this.load.image("temporaryBackground", assetsDir+"/temporaryBackground.png")
    this.load.image("backgroundAnimated", assetsDir+"backgroundAnimated.gif")
  }

  create() {
    this.input.on('pointerdown', () => this.scene.start("Game"))

    // this.add.image(0, 0, "temporaryBackground").setOrigin(0, 0)

    Dashboard(this)
  }
}

function Dashboard(scene) {
  var dashboard = document.querySelector("#dashboard")

  document.querySelector("#play").addEventListener("click", () => {
    scene.scene.start("Game")
  })
  
  // dashboard.innerHTML = `
  //   <div>
  //     Teste de inserção de elemento kkk
  //   </div>
  // `  

}