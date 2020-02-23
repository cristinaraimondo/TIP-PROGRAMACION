import Player from "./player.js"
class Jugador extends Player {
  constructor(config) {
    super(config.scene, config.x, config.y, "volar");

    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this)

this.setScale(2);

this.body.setOffset(20, 10)
this.body.setGravityY(800)
this.body.setCircle(10)
this.life = 5

this.anims.play("saltar");
this.prevMov = "saltar"
this.hitDelay = false;


}


}
export default Jugador;