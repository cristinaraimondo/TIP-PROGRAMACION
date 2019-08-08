class Personaje extends Phaser.GameObjects.Sprite {
  constructor(config) {
      super(config.scene, config.x, config.y, 'personaje');

      this.scene = config.scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enable(this);

      this.setScale(2);
      this.body.setSize(14, 20);
      this.body.setOffset(2, 5);
      this.body.setBounce(0.2);

      this.jumping = false;

      this.anims.play('rubioidle');
      this.prevMov = 'rubioidle';

      this.hitDelay = false;

      this.cursor = this.scene.input.keyboard.createCursorKeys();

      this.life = 3;

  }

  update() {
      if(this.cursor.left.isDown) {
          this.body.setVelocityX(-200);
          this.flipX = true;
          if(this.prevMov !== 'left' && !this.jumping) {
              this.prevMov = 'left';
              this.anims.play('rubioizq');
          }
      } else if(this.cursor.right.isDown) {
          this.body.setVelocityX(200);
          this.flipX = false;
          if(this.prevMov !== 'right' && !this.jumping) {
              this.prevMov = 'right';
              this.anims.play('rubioder');
          }

      } else if(this.cursor.down.isDown && !this.jumping) {
          this.body.setVelocityX(0);
          this.body.setSize(14, 15);
          this.body.setOffset(2, 10);

          if(this.prevMov !== 'down' && !this.jumping) {
              this.prevMov = 'down';
              this.anims.play('rubioidle');
          }

      }
      else {
          this.body.setVelocityX(0);
          this.body.setSize(14, 20);
          this.body.setOffset(2, 5);
          if(this.prevMov !== "rubioidle" && !this.jumping) {
              this.prevMov = "rubioidle";
              this.anims.play("rubioidle");
          }
      }

      if(Phaser.Input.Keyboard.JustDown(this.cursor.up) && !this.jumping) {
          this.jumping = true;
          this.body.setVelocityY(-800);
          if(this.prevMov !== 'jump') {
              this.prevMov = 'jump';
              this.anims.play('rubioder');
          }
      } else if(this.body.blocked.down) {
          this.jumping = false;
      }
  }

  bombCollision() {
      if(!this.hitDelay) {

      }
  }
}

export default Personaje;