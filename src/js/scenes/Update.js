export default function update() {
  let {left, right, up, space} = this.cursors
  
  if (right.isDown) {
    this.player.moveHorizontal(false)
  }
  else if (left.isDown) {
    this.player.moveHorizontal(true)
    
  } else {
    this.player.moveStopped()

  }
  
  if (up.isDown && this.player.sprite.body.onFloor()) {
    this.player.moveUp()
  }

  if (space.isDown) {

  } else {
    this.player.isShooting = false
  }
}