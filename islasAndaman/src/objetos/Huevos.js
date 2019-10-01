class Huevos extends Phaser.Physics.Arcade.Group {
  constructor(config) {
    super(config.physicsWorld, config.scene)
    this.addHuevo();
  }
  addHuevo() {
    this.create(
      Phaser.Math.Between(40, this.scene.scale.width - 40)
      , -10, 'vohue')
      .setDepth(2)
      .setBounce(1)
      .setCircle(24)
      .setVelocityX(

        (Phaser.Math.Between(0, 1)) ? 100 : -100
      )
      .setGravityY(800)
      .setScale(0.3);
  }


  update() {
    this.children.iterate(huevo => {
      if (huevo.body.velocity.x < 0) {
        huevo.setAngularVelocity(-300);
      } else {
        huevo.setAngularVelocity(300);
      }
    });

  }
}
export default Huevos;