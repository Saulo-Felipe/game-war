export const steve = (scene) => {

  // Player
	// scene.anims.create({
  //   key: "run",
  //   frameRate: 15,
  //   frames: scene.anims.generateFrameNames("steve", {
  //     prefix: "Run",
  //     suffix: ".png",
  //     start: 1,
  //     end: 8,
  //     zeroPad: 1
  //   }),
  //   repeat: -1
  // })
  // scene.anims.create({
  //   key: "run-shoot",
  //   frameRate: 15,
  //   frames: scene.anims.generateFrameNames("steve", {
  //     prefix: "Run-shoot",
  //     suffix: ".png",
  //     start: 1,
  //     end: 8,
  //     zeroPad: 1
  //   }),
  //   repeat: -1
  // })
  // scene.anims.create({
  //   key: "stopped-shoot",
  //   frameRate: 15,
  //   frames: scene.anims.generateFrameNames("steve", {
  //     prefix: "Idle",
  //     suffix: ".png",
  //     start: 1,
  //     end: 10,
  //     zeroPad: 1
  //   }),
  //   repeat: -1
  // })
  // scene.anims.create({
  //   key: "stopped",
  //   frameRate: 10,
  //   frames: scene.anims.generateFrameNames("steve", {
  //     prefix: "GhostGun-idle",
  //     suffix: ".png",
  //     start: 1,
  //     end: 11,
  //     zeroPad: 1
  //   }),
  //   repeat: -1
  // })
  // scene.anims.create({
  //   key: "jump",
  //   frameRate: 15,
  //   frames: scene.anims.generateFrameNames("steve", {
  //     prefix: "Jump",
  //     suffix: ".png",
  //     start: 1,
  //     end: 6,
  //     zeroPad: 1
  //   }),
  //   repeat: -1
  // })
  // scene.anims.create({
  //   key: "jump-shoot",
  //   frameRate: 15,
  //   frames: scene.anims.generateFrameNames("steve", {
  //     prefix: "Jump-shoot",
  //     suffix: ".png",
  //     start: 1,
  //     end: 6,
  //     zeroPad: 1
  //   }),
  //   repeat: -1
  // })


  // Explosion
  // scene.anims.create({
  //   key: 'explodeAnimation',
  //   frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 6 }),
  //   frameRate: 13,
  //   hideOnComplete: true,
  //   showOnStarte: true
  // })
}

export const ghostGun = (scene) => {
  scene.anims.create({
    key: "idle",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("ghostGun", {
      prefix: "ghostGun-idle",
      suffix: ".png",
      start: 0,
      end: 11,
      zeroPad: 1
    }),
    repeat: -1
  })

  scene.anims.create({
    key: "run",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("ghostGun", {
      prefix: "ghostGun-run",
      suffix: ".png",
      start: 0,
      end: 11,
      zeroPad: 1
    }),
    repeat: -1
  })

  scene.anims.create({
    key: "jump",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("ghostGun", {
      prefix: "ghostGun-jump",
      suffix: ".png",
      start: 0,
      end: 17,
      zeroPad: 1
    }),
    repeat: -1
  })

  scene.anims.create({
    key: "attack",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("ghostGun", {
      prefix: "ghostGun-attack",
      suffix: ".png",
      start: 0,
      end: 11,
      zeroPad: 1
    }),
    repeat: -1
  })

  scene.anims.create({
    key: "dead",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("ghostGun", {
      prefix: "ghostGun-dead",
      suffix: ".png",
      start: 0,
      end: 14,
      zeroPad: 1
    }),
    repeat: 0
  })

  scene.anims.create({
    key: "hurt",
    frameRate: 15,
    frames: scene.anims.generateFrameNames("ghostGun", {
      prefix: "ghostGun-hurt",
      suffix: ".png",
      start: 0,
      end: 11,
      zeroPad: 1
    }),
    repeat: -1
  })

}