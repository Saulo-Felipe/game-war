export default function Bullet(scene, type) {

  if (type === "steve-bullet") {
    this.bullet = scene.matter.add.image(300, 800, "bullet")
    this.bullet.setBody({
      type: "circle",
      radius: 10
    })
    console.log(this.bullet.setVelocityX(10))
  }

  
  // setInterval(() => {
  //   this.bullet.x += 3
  // }, 100);

}