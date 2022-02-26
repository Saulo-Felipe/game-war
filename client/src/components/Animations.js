export default function Animations(scene) {

  // Player
	scene.anims.create({
    key: "run",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Run",
      suffix: ".png",
      start: 1,
      end: 8,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "run-shoot",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Run-shoot",
      suffix: ".png",
      start: 1,
      end: 8,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "stopped",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Idle",
      suffix: ".png",
      start: 1,
      end: 10,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "stopped-shoot",
    frameRate: 10,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Idle-shoot",
      suffix: ".png",
      start: 1,
      end: 10,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "jump",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Jump",
      suffix: ".png",
      start: 1,
      end: 6,
      zeroPad: 1
    }),
    repeat: -1
  })
  scene.anims.create({
    key: "jump-shoot",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("steve", {
      prefix: "Jump-shoot",
      suffix: ".png",
      start: 1,
      end: 6,
      zeroPad: 1
    }),
    repeat: -1
  })


  // Explosion
  scene.anims.create({
    key: 'explodeAnimation',
    frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 6 }),
    frameRate: 13,
    hideOnComplete: true,
    showOnStarte: true
  })
}