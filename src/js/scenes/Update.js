export default function update(time, delta) {
  let {left, right, up, space} = this.cursors

  if (right.isDown) {
    this.player.setVelocityX(this.player.velocity.x)

    this.player.fliplayer(1)
    this.player.verifyAnimation("right")
  }
  else if (left.isDown) {
    this.player.setVelocityX(-this.player.velocity.x)
    this.player.fliplayer(-1)
    this.player.verifyAnimation("left")
    
  } else {
    this.player.setVelocityX(0)
    this.player.verifyAnimation("stopped")
  }
  
  if (up.isDown && this.player.allowJump) {
    this.player.setVelocityY(-this.player.velocity.y)
  }
  if (space.isDown && time > this.lastFired) {
    var bullet = this.bullets.get()

    if (bullet) {
      bullet.fire(this.player.sprite.x, this.player.sprite.y, this.player.sprite.scaleX)
      this.lastFired = time + 50
    }
  }

  if (space.isDown)
    this.player.isShooting = true
  else
    this.player.isShooting = false
}