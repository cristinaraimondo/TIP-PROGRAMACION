class Volcan extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'volcan');

    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setScale(2)
    this.setSize(16, 16);
    this.anims.play('volcan');
    this.hitDelay = false;


  }
}
export default Volcan;