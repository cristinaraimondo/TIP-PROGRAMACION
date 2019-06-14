class Selva extends Phaser.Scene {
    constructor() {
        super({ key: 'Selva' });
    }

    init() {
        this.points = 0;
    }

    preload() {
        this.load.path = './assets/';
    }

    create() {
        this.boton = this.add.image(400, 300, 'pelota').setScale(0.2);
        this.moreno = this.add.sprite(200, 500, 'moreno', 1).setScale(2);
        this.moreno = this.add.sprite(300, 500, 'ninia1', 1).setScale(2);
        this.rubio = this.add.sprite(400, 500, 'rubio', 1).setScale(2);
        this.pointsText = this.add
            .bitmapText(600, 100, 'font', 'PUNTOS ' + this.points)
            .setDepth(2)
            .setOrigin(0.5);
    }

    update(time, delta) {}
}

export default Selva;
