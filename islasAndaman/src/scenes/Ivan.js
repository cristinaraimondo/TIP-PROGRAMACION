class Ivan extends Phaser.Scene {
    constructor() {
        super('Ivan');
        this.moreno;
    }

    preload() {
        console.log('Scene: Ivan');
    }

    create() {
        this.fondo = this.add.image(400, 300, 'pelota').setScale(1);

        this.moreno = this.add.sprite(200, 500, 'rubioidle', 1).setScale(2);
        this.moreno.anims.play('idle');
    }

    update(time, delta) {
        // if (this.cursor.left.isDown) this.scene.sleep('Anara');
        // this.scene.sleep('Kelen');
    }
}
export default Ivan;
