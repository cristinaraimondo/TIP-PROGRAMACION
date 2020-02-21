class Personaje extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'eve');

        this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setScale(2);
    this.body.setSize(64, 32);
    this.body.setOffset(15, 5);
    this.body.setBounce(0.2);

    this.body.setGravityY(0)
    this.body.setVelocityX(-10)

    this.jumping = false;

    this.anims.play('izquierda');
    this.prevMov = 'frent';

    this.hitDelay = false;

    }

}

export default Personaje;
