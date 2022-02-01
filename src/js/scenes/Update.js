export default function update() {
  let {left, right, up} = this.cursors

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
}