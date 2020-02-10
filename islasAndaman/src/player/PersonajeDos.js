import EstadoPersonaje from "../scenes/EstadoPersonaje.js"
class PersonajeDos extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'personajeDos');

        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setScale();
        this.body.setSize(16, 128);
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
            this.body.setSize(16, 110);
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

export default PersonajeDos;
