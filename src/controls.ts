export function createControls(
  scene: Phaser.Scene
): Phaser.Types.Input.Keyboard.CursorKeys {
  return scene.input.keyboard.createCursorKeys();
}

export function configControls(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
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
    attack(player);
    return;
  }

  player.anims.play('player_idle', true);
}

const defaultVelocity = 200;

function moveRight(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
): void {
  player.setFlipX(false);
  player.anims.play('player_walk', true);
  player.setVelocityX(defaultVelocity);
}

function moveLeft(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
): void {
  player.setFlipX(true);
  player.anims.play('player_walk', true);
  player.setVelocityX(-defaultVelocity);
}

function moveUp(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
): void {
  player.anims.play('player_walk', true);
  player.setVelocityY(-defaultVelocity);
}

function moveDown(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
): void {
  player.anims.play('player_walk', true);
  player.setVelocityY(defaultVelocity);
}

function attack(
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
): void {
  player.anims.play('player_attack', true);
}
