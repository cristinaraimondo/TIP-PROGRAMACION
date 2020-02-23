export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, sprite ) {
        super(scene, x, y, sprite);
        scene.physics.add.collider(this, scene.collisionLayer);
        scene.add.existing(this);
        
    }
    pierdeVidas() {

        if(!this.hitDelay) {
            this.hitDelay = true;
            this.life--;
            this.scene.registry.events.emit('remove_life')
            this.setTint(0x1abc9c);
            this.scene.time.addEvent({
                delay: 600,
                callback: () => {
                    this.hitDelay = false;
                    this.clearTint();
                }
            })
      
        }
      }
      pierdeJuego() {
        
        if (this.life === 0) {
            this.scene.registry.events.emit("game_over")
      
        }
      }
      pierdePuntos(){
        if (!this.hitDelay) {
            console.log("Collisiona")
            this.hitDelay = true;
            this.puntos--;
            this.scene.registry.events.emit("restarPuntos");
            this.setTint(0x1abc9c)
      
            this.scene.time.addEvent({
                delay: 500,
                callback: () => {
                    this.hitDelay = false;
                    this.clearTint();
        
      
                }
            })
      
        }

      }
      
    
}