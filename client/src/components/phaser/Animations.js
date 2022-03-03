export const steveAnimation = (scene) => {

  // Player
	scene.anims.create({
    key: "steve-run",
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
    key: "steve-run-shoot",
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
    key: "steve-stopped-shoot",
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
    key: "steve-stopped",
    frameRate: 10,
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
    key: "steve-jump",
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
    key: "steve-jump-shoot",
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

export const ghostGunAnimation = (scene) => {
  scene.anims.create({
    key: "ghostGun-stopped",
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
    key: "ghostGun-run",
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
    key: "ghostGun-jump",
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
    key: "ghostGun-attack",
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
    key: "ghostGun-dead",
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
    key: "ghostGun-hurt",
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
  
  // Explosion
  scene.anims.create({
    key: 'explodeAnimation',
    frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 6 }),
    frameRate: 13,
    hideOnComplete: true,
    showOnStarte: true
  })
}
