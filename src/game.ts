import * as Phaser from 'phaser';
import { configControls, createControls } from './controls';
import { createPlayer, loadPlayerSprites, Player } from './player';
import { Slime, createSlime, loadSlimeSprites } from './slime';
import { loadBulletSprites } from './bullet';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export default class Game extends Phaser.Scene {
  player: Player;
  slime: Slime;
  controls: Phaser.Types.Input.Keyboard.CursorKeys;
  water: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super(sceneConfig);
  }

  preload() {
    this.load.image('tiles', './assets/map/grass.png');
    this.load.image('border', './assets/map/water.png');
    this.load.tilemapTiledJSON('map', './assets/map/map.json');
    loadPlayerSprites(this);
    loadBulletSprites(this);
    loadSlimeSprites(this);
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tilesetGrass = map.addTilesetImage('grass', 'tiles');
    const tilesetWater = map.addTilesetImage('water', 'border');
    const ground = map.createLayer('grass', tilesetGrass, 0, 0);
    this.water = map.createLayer('water', tilesetWater, 0, 0);
    this.water.setCollisionByProperty({ collider: true });
    this.player = createPlayer(this);
    this.physics.add.collider(this.player, this.water);
    this.player.anims.play('player_idle', true);
    this.controls = createControls(this);
    this.slime = createSlime(this);
    this.physics.add.overlap(this.player, this.slime, this.handleSlimeCollision, null, this);
  }

  update(_time: number, _delta: number): void {
    configControls(this.player, this.slime, this.controls, this);
  }

  handleSlimeCollision(slime: Slime, player: Player): void {
    const playerBounds = player.getBounds();
    const slimeBounds = slime.getBounds();
    console.log('por cima');
    // if (playerBounds.centerY < slimeBounds.centerY) {
    //   player.y = slimeBounds.top - player.height / 2;
    // }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  pixelArt: true,
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 640,
  scene: Game,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
