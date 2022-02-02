export default function update(time, delta) {
  let {left, right, up, space} = this.cursors

  if (right.isDown) {
    this.player.setVelocityX(this.player.velocity.x)

    this.player.fliplayer(1)
    this.player.verifyAnimation("run")
  }
  else if (left.isDown) {
    this.player.setVelocityX(-this.player.velocity.x)
    this.player.fliplayer(-1)
    this.player.verifyAnimation("run")
    
  } else {
    this.player.setVelocityX(0)
    this.player.verifyAnimation("stop")
  }
  if (up.isDown && this.player.allowJump) {
    this.player.setVelocityY(-this.player.velocity.y)
  }
  if (space.isDown && time > this.lastFired) {
    var bullet = this.bullets.get()

    if (bullet) {
      bullet.fire(this.player.sprite.x, this.player.sprite.y);
      this.lastFired = time + 50
    }
    
  }
}