import * as Phaser from 'phaser';
import { Player } from './player';

export const loadBulletSprites = (scene: Phaser.Scene): void => {
  scene.load.image('bullet', './assets/bullet.png');
};

export const createBullet = (player: Player, scene: Phaser.Scene): void => {
  const x = player.flipX ? player.x - 20 : player.x + 60;
  const y = player.y - 18;
  const bullet = scene.physics.add.image(x, y, 'bullet').setScale(0.1);
  if (player.flipX) {
    bullet.setFlipX(true);
    bullet.setVelocityX(-700);
    return;
  }
  bullet.setVelocityX(700);
};
