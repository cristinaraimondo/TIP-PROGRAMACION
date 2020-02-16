class Volcan extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'volcan');

    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setScale(2)
    this.body.setSize(16, 16);
    this.body.setOffset(40, 40)
    this.body.setImmovable(true)

    this.anims.play('volcan');
    this.hitDelay = false;



  }
}
export default Volcan;