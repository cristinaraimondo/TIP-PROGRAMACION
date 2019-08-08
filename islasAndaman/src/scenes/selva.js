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
        this.boton = this.add.image(400, 300, 'pelota').setScale(1);
        // this.scene.launch('Anara');
        // this.scene.launch('Ivan');
        // this.scene.launch('Kelen');
        this.currentScene = this.scene.get(this);
        // this.marron = this.add.sprite(500, 500, 'marron', 1).setScale(2);
        // this.marron.anims.play('frente');

        this.pointsText = this.add
            .bitmapText(600, 100, 'font', 'PUNTOS ' + this.points)
            .setDepth(2)
            .setOrigin(0.5);
    }

    update(time, delta) {}
}

export default Selva;
