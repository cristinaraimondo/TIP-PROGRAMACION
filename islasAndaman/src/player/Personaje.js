class Personaje extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'personaje');

        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setScale(2);
        this.body.setSize(32, 32, true);
        this.body.setOffset(15, 44);
        this.body.setBounce(0.5);

        this.jumping = false;

        this.anims.play('idle');
        this.prevMov = 'idle';

        this.hitDelay = false;

        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.life = 3;
    }

    update() {
        if (this.cursor.left.isDown) {
            this.body.setVelocityX(-200);
            this.flipX = true;
            if (this.prevMov !== 'left' && !this.jumping) {
                this.prevMov = 'left';
                this.anims.play('rubioder');
            }
        } else if (this.cursor.right.isDown) {
            this.body.setVelocityX(200);
            this.flipX = false;
            if (this.prevMov !== 'right' && !this.jumping) {
                this.prevMov = 'right';
                this.anims.play('rubioder');
            }
        } else if (this.cursor.down.isDown && !this.jumping) {
            this.body.setVelocityX(0);
            this.body.setSize(64, 64);
            this.body.setOffset(2, 10);
            if (this.prevMov !== 'down' && !this.jumping) {
                this.prevMov = 'down';
                this.anims.play('idle');
            }
        } else {
            this.body.setVelocityX(0);
            this.body.setSize(64, 64);
            this.body.setOffset(30, 30);
            if (this.prevMov !== 'idle' && !this.jumping) {
                this.prevMov = 'idle';
                this.anims.play('idle');
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursor.up) && !this.jumping) {
            this.jumping = true;
            this.body.setVelocityY(-800);
            if (this.prevMov !== 'jump') {
                this.prevMov = 'jump';
                this.anims.play('rubioder');
            }
        } else if (this.body.blocked.down) {
            this.jumping = false;
        }
    }

    // bombCollision() {
    //     if (!this.hitDelay) {
    //     }
    // }
}

export default Personaje;
