var Bullet = function (scene) {
  
  this.velocity = 20
  this.AllowFire = false
  this.allBullets = []
  this.limitActived = 10
  this.creationPermited = 50

  for (var c = 0; c < 500; c++) {

  }
  
  var update = () => {

    
  }

  var fire = (x, y) => {
    if (this.AllowFire) {

      
    }    
  }

  return {
    update,
    fire,
  }
}

















// var Bullet = new Phaser.Class({
//   Extends: Phaser.GameObjects.Image,

//   initialize: function Bullet(scene) {
//     Phaser.GameObjects.Image.call(this, scene, 0, 0, "bullet", { 
//       isStatic: true
//      })
    
//     this.speed = Phaser.Math.GetSpeed(1000, 1)
//     this.isFlip = false
//   },

//   fire: function (x, y, scaleX, scene) {
//     console.log(this)
//     if (scaleX === -1) {
//       this.isFlip = true
//       this.setPosition(x - 50, y)
//     } else {
//       this.isFlip = false
//       this.setPosition(x + 50, y)      
//     }

//     scene.matter.add.rectangle(x+50, y, 5, 5, { 
//       name: "bullet",
//       ignoreGravity: true, 
//     })

//     this.setActive(true)
//     this.setVisible(true)
//   },
  
//   update: function (time, delta) {
//     if (!this.isFlip) {
//       this.x += this.speed * delta

//       if (this.x > 6000) {
//         console.log("Saiu da tela")
//         this.setActive(false)
//         this.setVisible(false)
//       }  
//     } else {
//       this.x -= this.speed * delta

//       if (this.x < -50) {
//         console.log("Saiu da tela")
//         this.setActive(false)
//         this.setVisible(false)
//       }
//     }
//   }
// })

export default Bullet