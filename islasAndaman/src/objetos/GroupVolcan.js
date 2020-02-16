class GroupVolcan extends Phaser.Physics.Arcade.StaticGroup {
  constructor(config) {
    super(config.physicsWorld, config.scene);
    this.createvolv()


  }

  createvolv() {


    for (var i = 0; i < 5; i++) {

      this.create(
        Phaser.Math.Between(50, 2110),
        Phaser.Math.Between(550, this.scene.scale.height - 180, ),
        "volcan", ""

      ).setScale().setSize(10, 10).setOffset(50, 50)


    }

  }


}


export default GroupVolcan;