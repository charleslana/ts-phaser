import { Player } from './player';

export function createControls(
  scene: Phaser.Scene
): Phaser.Types.Input.Keyboard.CursorKeys {
  return scene.input.keyboard.createCursorKeys();
}

export function configControls(
  player: Player,
  controls: Phaser.Types.Input.Keyboard.CursorKeys,
  _scene: Phaser.Scene
): void {
  player.setVelocityX(0);
  player.setVelocityY(0);

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
      attack(player);
    }
    return;
  }

  if (!player.isAttacking) {
    player.anims.play('player_idle', true);
    return;
  }
}

const defaultVelocity = 200;

function moveRight(player: Player): void {
  player.setFlipX(false);
  player.anims.play('player_walk', true);
  player.setVelocityX(defaultVelocity);
}

function moveLeft(player: Player): void {
  player.setFlipX(true);
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

function attack(player: Player): void {
  player.isAttacking = true;
  player.anims.play('player_attack', true);
}
