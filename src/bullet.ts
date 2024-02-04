import * as Phaser from 'phaser';
import { Player } from './player';

export interface Bullet extends Phaser.Physics.Arcade.Image {
  startX?: number;
}

export const loadBulletSprites = (scene: Phaser.Scene): void => {
  scene.load.image('bullet', './assets/bullet.png');
};

export const createBullet = (player: Player, scene: Phaser.Scene): Bullet => {
  const x = player.flipX ? player.x - 20 : player.x + 60;
  const y = player.y - 18;
  const bullet: Bullet = scene.physics.add.image(x, y, 'bullet').setScale(0.1);
  bullet.startX = bullet.x;
  const directionMultiplier = player.flipX ? -1 : 1;
  const bulletSpeed = 700 * directionMultiplier;
  bullet.setVelocityX(bulletSpeed);

  scene.events.on('update', () => {
    // console.log(`bullet x: ${bullet.x}`);
    const distanceTraveled = Math.abs(bullet.x - bullet.startX);
    const maxDistance = 200;
    if (distanceTraveled >= maxDistance) {
      // console.log(`chamou o ${player.flipX ? 'left' : 'right'}`);
      bullet.destroy();
    }
  });
  return bullet;
};
