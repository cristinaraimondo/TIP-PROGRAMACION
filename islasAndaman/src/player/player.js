export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, sprite ) {
        super(scene, x, y, sprite);
        scene.physics.add.collider(this, scene.collisionLayer);
        scene.add.existing(this);
        this.velocidad = 100;
        this.direccion = 1;
    }
    pierdeVidas() {

        if (!this.hitDelay) {
            console.log("Collisiona")
            this.hitDelay = true;
      
            this.life--;
            this.scene.registry.events.emit("remove_life");
      
            this.setTint(0x1abc9c)
      
            this.scene.time.addEvent({
                delay: 500,
                callback: () => {
                    this.hitDelay = false;
                    this.clearTint();
         //  this.pierdeJuego()
      
                }
            })
      
        }
      }
      pierdeJuego() {
        
        if (this.life === 0) {
           
            this.scene.registry.events.emit("game_over")
      
        }
      }
      
    
}