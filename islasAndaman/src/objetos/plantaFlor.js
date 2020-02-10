class PlantaFlor extends Phaser.Physics.Arcade.StaticGroup {
  constructor(config) {
    super(config.physicsWorld, config.scene);
    this.addFlorItem();
  }

  addFlorItem() {


    for (var i = 0; i < 5; i++) {

      this.create(
        Phaser.Math.Between(50, 2700),
        Phaser.Math.Between(300, this.scene.scale.height - 30, ),
        "flor", ""

      ).setScale(0.5).setSize(10, 10).setOffset(50, 50)


    }
  }

  destroyItem() {
    this.children.entries[0].destroy();

  }

}

export default PlantaFlor;