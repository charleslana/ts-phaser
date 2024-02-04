import { createBullet } from './bullet';
import { Player } from './player';
import { Slime } from './slime';

export function createControls(scene: Phaser.Scene): Phaser.Types.Input.Keyboard.CursorKeys {
  return scene.input.keyboard.createCursorKeys();
}

export function configControls(
  player: Player,
  slime: Slime,
  controls: Phaser.Types.Input.Keyboard.CursorKeys,
  scene: Phaser.Scene
): void {
  player.setVelocityX(0);
  player.setVelocityY(0);

  if (player.isAttacking) {
    return;
  }

  if (controls.up.isDown && controls.right.isDown) {
    moveUpRight(player);
    return;
  }

  if (controls.up.isDown && controls.left.isDown) {
    moveUpLeft(player);
    return;
  }

  if (controls.down.isDown && controls.right.isDown) {
    moveDownRight(player);
    return;
  }

  if (controls.down.isDown && controls.left.isDown) {
    moveDownLeft(player);
    return;
  }

  if (controls.right.isDown) {
    moveRight(player);
    return;
  }

  if (controls.left.isDown) {
    moveLeft(player);
    return;
  }

  if (controls.up.isDown) {
    moveUp(player);
    return;
  }

  if (controls.down.isDown) {
    moveDown(player);
    return;
  }

  if (controls.space.isDown) {
    if (!player.isAttacking) {
      attack(player, slime, scene);
    }
    return;
  }

  player.anims.play('player_idle', true);
}

const defaultVelocity = 200;

function moveRight(player: Player): void {
  player.setFlipX(false);
  player.setOrigin(0.5, 0.5);
  player.anims.play('player_walk', true);
  player.setVelocityX(defaultVelocity);
}

function moveLeft(player: Player): void {
  player.setFlipX(true);
  player.setOrigin(0, 0.5);
  player.anims.play('player_walk', true);
  player.setVelocityX(-defaultVelocity);
}

function moveUp(player: Player): void {
  player.anims.play('player_walk', true);
  player.setVelocityY(-defaultVelocity);
}

function moveDown(player: Player): void {
  player.anims.play('player_walk', true);
  player.setVelocityY(defaultVelocity);
}

function attack(player: Player, slime: Slime, scene: Phaser.Scene): void {
  if (!player.flipX) {
    player.setOrigin(0.3, 0.5);
  } else {
    player.setOrigin(0.2, 0.5);
  }
  player.isAttacking = true;
  player.anims.play('player_attack', true);
  const bullet = createBullet(player, scene);
  scene.physics.add.overlap(bullet, slime, () => {
    slime.destroy();
  });
}

function moveUpRight(player: Player): void {
  player.setFlipX(false);
  player.setOrigin(0.5, 0.5);
  player.anims.play('player_walk', true);
  player.setVelocity(defaultVelocity, -defaultVelocity);
}

function moveUpLeft(player: Player): void {
  player.setFlipX(true);
  player.setOrigin(0, 0.5);
  player.anims.play('player_walk', true);
  player.setVelocity(-defaultVelocity, -defaultVelocity);
}

function moveDownRight(player: Player): void {
  player.setFlipX(false);
  player.setOrigin(0.5, 0.5);
  player.anims.play('player_walk', true);
  player.setVelocity(defaultVelocity, defaultVelocity);
}

function moveDownLeft(player: Player): void {
  player.setFlipX(true);
  player.setOrigin(0, 0.5);
  player.anims.play('player_walk', true);
  player.setVelocity(-defaultVelocity, defaultVelocity);
}
