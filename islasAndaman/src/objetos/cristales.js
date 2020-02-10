class Cristales extends Phaser.Physics.Arcade.StaticGroup {
  constructor(config) {
    super(config.physicsWorld, config.scene);

  }

  addCristalItem() {

    for (var i = 0; i < 10; i++) {

      this.create(
        Phaser.Math.Between(50, 2700),
        Phaser.Math.Between(300, this.scene.scale.height - 60, ),
        "cristal", ""

      ).setScale(0.5).setSize(10, 10).setOffset(50, 60).setDepth(2)


    }
  }

  destroyItem() {
    this.children.entries[0].destroy();


  }

}

export default Cristales;