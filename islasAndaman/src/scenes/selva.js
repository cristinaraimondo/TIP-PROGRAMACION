class Selva extends Phaser.Scene {
    constructor() {
        super({ key: 'Selva' });
    }

    init() {
        console.log('Scene: Selva');
    }

    preload() {
        this.load.path = './assets/';
    }

    create() {
        this.boton = this.add.image(400, 300, 'pelota').setScale(0.2);
        this.moreno = this.add.sprite(200, 500, 'moreno', 1).setScale(2);
        this.moreno = this.add.sprite(300, 500, 'ninia1', 1).setScale(2);
        this.rubio = this.add.sprite(400, 500, 'rubio', 1).setScale(2);
    }

    update(time, delta) {}
}

export default Selva;
