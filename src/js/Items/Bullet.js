var Bullet = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Bullet(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, "bullet")
    
    this.speed = Phaser.Math.GetSpeed(1000, 1)
    this.isFlip = false
  },

  fire: function (x, y, scaleX) {
    console.log(this)
    if (scaleX === -1) {
      this.isFlip = true
      this.setPosition(x - 50, y)
    } else {
      this.isFlip = false
      this.setPosition(x + 50, y)      
    }
    
    this.setActive(true)
    this.setVisible(true)
  },
  
  update: function (time, delta) {
    if (!this.isFlip) {
      this.x += this.speed * delta

      if (this.x > 6000) {
        console.log("Saiu da tela")
        this.setActive(false)
        this.setVisible(false)
      }  
    } else {
      this.x -= this.speed * delta

      if (this.x < -50) {
        console.log("Saiu da tela")
        this.setActive(false)
        this.setVisible(false)
      }
    }
  }
})

export default Bullet