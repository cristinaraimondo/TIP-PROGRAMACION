class Kelen extends Phaser.Scene {
    constructor() {
        super('Kelen');
        this.rubio;
    }

    preload() {
        console.log('Scene: Kelen');
    }

    create() {
        this.rubio = this.add.sprite(400, 500, 'rubio', 1).setScale(2);
    }

    update(time, delta) {}
}

export default Kelen;
