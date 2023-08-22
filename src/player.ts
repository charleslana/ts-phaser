export function createPlayer(
  scene: Phaser.Scene
): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
  const player = scene.physics.add.sprite(200, 200, 'player_idle');
  createAnimations(scene);
  return player;
}

export function loadSprites(scene: Phaser.Scene): void {
  scene.load.spritesheet('player_idle', './assets/player/idle.png', {
    frameWidth: 83,
    frameHeight: 64,
    spacing: 45,
  });
  scene.load.spritesheet('player_walk', './assets/player/walk.png', {
    frameWidth: 83,
    frameHeight: 64,
    spacing: 45,
  });
  scene.load.spritesheet('player_attack', './assets/player/attack.png', {
    frameWidth: 83,
    frameHeight: 64,
    spacing: 45,
  });
}

export function createAnimations(scene: Phaser.Scene): void {
  scene.anims.create({
    key: 'player_idle',
    frames: scene.anims.generateFrameNames('player_idle', {
      start: 0,
      end: 7,
    }),
    frameRate: 8,
    repeat: -1,
    yoyo: true,
  });
  scene.anims.create({
    key: 'player_walk',
    frames: scene.anims.generateFrameNames('player_walk', {
      start: 0,
      end: 6,
    }),
    frameRate: 8,
    repeat: -1,
    yoyo: true,
  });
  scene.anims.create({
    key: 'player_attack',
    frames: scene.anims.generateFrameNames('player_attack', {
      start: 0,
      end: 3,
    }),
    frameRate: 12,
    repeat: 0,
  });
}
