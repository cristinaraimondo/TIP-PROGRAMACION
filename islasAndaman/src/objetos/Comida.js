class Comida extends Phaser.Physics.Arcade.StaticGroup {
  constructor(config) {
    super(config.physicsWorld, config.scene);
    this.addComidaItem();
  }

  addComidaItem() {
    this.create(
      Phaser.Math.Between(350, this.scene.scale.width - 50),
      Phaser.Math.Between(150, this.scene.scale.height - 150),
      'food'

    ).setScale(2)

  }

  destroyItem() {
    this.children.entries[0].destroy();
    this.addComidaItem();
  }

}

export default Comida;