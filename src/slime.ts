import * as Phaser from 'phaser';

export interface Slime extends Phaser.Physics.Arcade.Sprite {
  isAttacking?: boolean;
}

export function loadSlimeSprites(scene: Phaser.Scene): void {
  scene.load.spritesheet('slime_idle', './assets/slime/idle.png', {
    frameWidth: 20,
    frameHeight: 17,
    spacing: 0,
  });
}

export function createSlimeAnimations(scene: Phaser.Scene): void {
  scene.anims.create({
    key: 'slime_idle',
    frames: scene.anims.generateFrameNames('slime_idle', {
      start: 0,
      end: 6,
    }),
    frameRate: 8,
    repeat: -1,
  });
}

export const createSlime = (scene: Phaser.Scene): Slime => {
  const slime = scene.physics.add.sprite(400, 200, 'slime_idle').setScale(2);
  createSlimeAnimations(scene);
  slime.anims.play('slime_idle', true);
  return slime;
};
