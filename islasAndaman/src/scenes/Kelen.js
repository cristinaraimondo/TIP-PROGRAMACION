class Kelen extends Phaser.Scene {
    constructor() {
        super('Kelen');
        this.rubio;
    }

    preload() {
        console.log('Scene: Kelen');
    }

    create() {
        this.rubio = this.add.sprite(400, 500, 'rubioidle', 1).setScale(2);

        this.input.keyboard.on('keydown_C', () => {
            this.scene.sleep('Anara');
            this.scene.sleep('ivan');
        });
        this.life = 3;
    }

    update(time, delta) {}
}

export default Kelen;
