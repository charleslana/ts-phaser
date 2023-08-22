import * as Phaser from 'phaser';
import { configControls, createControls } from './controls';
import { createPlayer, loadSprites } from './player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export default class Game extends Phaser.Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  controls: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor() {
    super(sceneConfig);
  }

  preload() {
    this.load.image('tiles', './assets/map/grass.png');
    this.load.image('border', './assets/map/water.png');
    this.load.tilemapTiledJSON('map', './assets/map/map.json');
    loadSprites(this);
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tilesetGrass = map.addTilesetImage('grass', 'tiles');
    const tilesetWater = map.addTilesetImage('water', 'border');
    const ground = map.createLayer('grass', tilesetGrass, 0, 0);
    const water = map.createLayer('water', tilesetWater, 0, 0);
    this.player = createPlayer(this);
    this.player.anims.play('player_idle', true);
    this.controls = createControls(this);
  }

  update(_time: number, _delta: number): void {
    configControls(this.player, this.controls, this);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 640,
  scene: Game,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};

const game = new Phaser.Game(config);
