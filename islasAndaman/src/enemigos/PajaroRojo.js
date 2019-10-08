class PajaroRojo extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'pajaroRojo');

    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setScale(0.5);
    this.body.setSize(64, 64);
    this.body.setOffset(25, 5);

    this.body.setGravityX(10)

    this.velocidad = 40;
    this.direccion = 1;

    this.hitDelay = false;



  }


  update() { }
}


export default PajaroRojo












