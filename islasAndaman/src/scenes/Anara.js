class Anara extends Phaser.Scene {
    constructor() {
        super('Anara');
        this.ninia;
    }

    preload() {
        console.log('Scene: Anara');
    }

    create() {
        this.fondo = this.add.image(400, 300, 'pelota').setScale(1);
        this.ninia = this.add.sprite(300, 500, 'chicoidle', 1).setScale();
        this.ninia.anims.play('quieto');
        // this.prevMov = 'frente';
        // this.cursor = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        // if (this.cursor.right.isDown) this.scene.sleep('Ivan');
        // if (this.cursor.left.isDown) {
        //     this.anims.play('cam');
        //     this.body.setVelocityX(-200);
        // }
    }
}

export default Anara;
