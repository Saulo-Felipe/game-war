export default function Update() {
	let {down, up, left, right, space} = this.keys

	if (right.isDown)
		this.player.moveHorizontal(false)
	else if (left.isDown)
		this.player.moveHorizontal(true)
	else
		this.player.moveStopped()

	if (up.isDown && this.player.sprite.body.onFloor())
		this.player.moveJump()

	if (space.isDown)
		this.player.fire()

	if (this.player.property.fireTime > 0)
		this.player.property.fireTime -= 1

	if (this.player.sprite.body.speed > 0) {
		this.player.lavaCollision()
	}



}