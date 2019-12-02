class Jugador extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    scene.physics.add.collider(this, scene.collisionLayer);
    scene.add.existing(this);
    this.velocidad = 100;
    this.direccion = 1;
  }
  update() {
    this.body.setVelocityX(this.direccion * this.velocidad);

    if (this.direccion > 0) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
  }
}
export default Jugador;