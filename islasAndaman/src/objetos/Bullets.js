export default class Bullets extends Phaser.Physics.Arcade.Group {
    constructor (world, scene, children) {
      super(world, scene, children);
      this.scene = scene;
  
      this.createMultiple({
        frameQuantity: 5,
        key: 'bullet',
        active: false,
        visible: false,
       angle: 45,
        
      });
    }
  
    enemyCollision(bullet, enemy) {
      bullet.active = false;
      bullet.visible = false;
      bullet.destroy()
        this.visible = false;
     
    }
  
    fireBullet (x, y, direction) {
      const bullet = this.getFirstDead(false);
      if (bullet) {
       
        bullet.enableBody(true);
        bullet.active = true;
        bullet.visible = true;
        bullet.setPosition(x, y);
        bullet.setScale(0.50)
       
        switch (direction) {
          case 'up':
            bullet.setVelocityX(-500);
            break;
         
           
          case 'left':
            bullet.setVelocityX(-500);
           
           
            break;
          case 'right':
            bullet.setVelocityX(650);
            break;
          default:
            bullet.setVelocityY(-300);
            
        }
     
        this.scene.time.addEvent({
          delay: 1500,
         
          callback: () => {
            bullet.disableBody();
            bullet.active = false;
            bullet.visible = false;
            bullet.setVelocity(0);
            
            
          }
        });
      }
    }
  }
  