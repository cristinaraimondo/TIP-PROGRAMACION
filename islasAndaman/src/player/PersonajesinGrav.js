export default class PersonajesinGrav extends Phaser.Physics.Arcade.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, "chicorub");
    
        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this)
      this.direction = "tras";
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      
      
    }
    
  
    update() {
      this.setVelocity(0);
      // cheque si esta presionado
      if (this.cursors.up.isDown) {
        this.direction = "tras";
        this.setVelocityY(-150);
        this.anims.play("tras", true);
      } else if (this.cursors.down.isDown) {
        this.direction = 'frente';
        this.setVelocityY(150);
        this.anims.play('frente', true);
      }
      // chequeo si esta presionado
      if (this.cursors.left.isDown) {
        this.direction = 'izq';
        this.setVelocityX(-150);
        this.anims.play('izq', true);
      } else if (this.cursors.right.isDown) {
        this.direction ='der';
        this.setVelocityX(150);
        this.anims.play('der', true);
      }else if (this.cursors.right.isUp) {
        this.setVelocityX(0)
        //this.anims.play("queto")
    }
    }}