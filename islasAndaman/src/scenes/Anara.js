class Anara extends Phaser.Scene {
    constructor() {
        super('Anara');
        this.ninia;
    }

    preload() {
        console.log('Scene: Anara');
    }

    create() {
        this.ninia = this.add.sprite(300, 500, 'ninia1', 1).setScale(2);
    }

    update(time, delta) {}
}

export default Anara;
