function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Weapon(scene, type) {

  if (type === "purple") {
    this.item = scene.matter.add.image(getRandomInt(840, 2040), 1150, "purple_weapon")
    this.id = String(Math.floor(Math.random() * Date.now()))

    this.item.setCircle()
    this.item.setStatic(true)
    this.item.body.label = `weapon${this.id}`
  }


  this.deleteWeapon = (id) => {
    this.item.destroy()
  }
  
}

  // let item = this.matter.add.image(0, 1200, "purple_weapon")
  // item.setCircle()
  // item.setStatic(true)
  // item.setVelocityX(10)
  // item.body.label = "weapon"


  // this.matter.world.on("collisionstart", function(e, b1, b2) {
  //   if (b2.label.indexOf("weapon") !== -1) {
  //     for (var i in gameState.weaponsAvailable) {
  //       if (b2.label.indexOf(gameState.weaponsAvailable[i].id) !== -1) {
  //         removeWeapon(i)
  //         break
  //       }
  //     }
  //   }

  //   b2.gameObject.visible = false
  //       b2.destroy()
  //       this.matter.world.remove(b2)
  // })

  // this.createWeapon = function(type) {
  //   gameState.weaponsAvailable[Object.keys(gameState.weaponsAvailable).length] = new Weapon(this, type)
  // }
  // function removeWeapon(index) {
  //   gameState.weaponsAvailable[index].item.destroy()
  //   delete gameState.weaponsAvailable[index]
  //   console.log("removido com sucesso: ", gameState.weaponsAvailable)
  // }
