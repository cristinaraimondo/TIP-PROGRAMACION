class Coco extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'coco');

    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setScale(2);
    this.body.setSize(64, 128);
    this.body.setOffset(25, 5);
    this.body.setBounce(0.2);

    this.body.setGravityY(0)
    this.body.setVelocityX(-10)

    this.jumping = false;

    this.anims.play('camina');
    this.prevMov = 'coco';

    this.hitDelay = false;

    this.cursor = this.scene.input.keyboard.createCursorKeys();

    this.life = 5;
    this.actual_points = 0
  }
}
export default Coco;