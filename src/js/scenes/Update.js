export default function Update() {
	const {down, up, left, right} = this.keys

	if (right.isDown) 
		this.player.moveHorizontal(false)
	else if (left.isDown)
		this.player.moveHorizontal(true)
	else 
		this.player.moveStopped()

	if (up.isDown && this.player.sprite.body.onFloor())
		this.player.moveJump()



	this.player.setLavaCollision(this.player.property.takingDamage)



	this.player.property.takingDamage = false
}