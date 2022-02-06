export default function update(time, delta) {
  let {left, right, up, space} = this.cursors
  
  if (right.isDown) {
    this.player.moveHorizontal("right")
  }
  else if (left.isDown) {
    this.player.moveHorizontal("left")
    
  } else {
    this.player.moveStopped()

  }
  
  if (up.isDown) {
    this.player.moveUp()
  }

  if (space.isDown) {

    this.player.shoot(time)
  } else {
    this.player.isShooting = false
  }
}