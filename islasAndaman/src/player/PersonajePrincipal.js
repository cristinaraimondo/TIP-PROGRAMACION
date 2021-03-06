
import Player from "./player.js"
class PersonajeDos extends Player {
    constructor(config) {
        super(config.scene, config.x, config.y, 'personajeDos');

        this.scene = config.scene;
       
        this.scene.physics.world.enable(this);

        this.setScale();
        this.body.setSize(32, 128);
        this.body.setOffset(25, 5);
        this.body.setBounce(0.2);
        //this.body.setCollideWorldBounds(true)

        this.body.setGravityY(1000)


        this.jumping = false;

        this.anims.play('chuquidle');
        this.prevMov = 'chuquidle';

        this.hitDelay = false;

        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.life = 5
       
    }
    update() {
        if (this.cursor.left.isDown) {
            this.body.setVelocityX(-200);

            this.flipX = true;
            if (this.prevMov !== 'left' && !this.jumping) {
                this.prevMov = 'left';
                this.anims.play('chuquider');
            }
        } else if (this.cursor.right.isDown) {
            this.body.setVelocityX(200);
            this.flipX = false;
            if (this.prevMov !== 'right' && !this.jumping) {
                this.prevMov = 'right';
                this.anims.play('chuquider');
            }

        } else {
            this.body.setVelocityX(0);
            this.body.setSize(32, 110);
            if (this.prevMov !== 'chuquidle' && !this.jumping) {
                this.prevMov = 'chuquidle';
                this.anims.play('chuquidle');
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursor.up)
            && !this.jumping) {
            this.jumping = true;
            this.body.setVelocityY(-800);
            if (this.prevMov !== 'jump') {
                this.prevMov = 'jump';
                this.anims.play('chuquider');
            }
        } else if (this.body.blocked.down) {
            this.jumping = false;
        }
    }
}

export default PersonajeDos;
