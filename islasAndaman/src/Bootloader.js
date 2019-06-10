class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    init() {}

    preload() {
        console.log('Bootloader');
        this.load.path = './assets/';
        this.load.audio('aircraft', ['aircraft.mp3']);

        this.load.image('fondo', 'SELVA.png');
        this.load.image('chica', 'ninia.png');
        this.load.image('cont', 'contenedor.png');
        this.load.image('font', 'font/font.png'),
            this.load.json('font_json', 'font/font.json');
        this.load.image('avion', 'avioneta.png');
        this.load.image('ninia', 'Run.png');
        this.load.image('ninio', 'ninio.png');
        this.load.image('boton', 'start.png');
        this.load.image('pelota', 'sel.jpg');
        this.load.spritesheet('ninio', 'atlas_name_PP3');
        this.load.spritesheet('moreno', 'moreno/2x.png', {
            frameWidth: 16,
            frameHeight: 21.33
        });
        this.load.spritesheet('ninia1', 'ninia/ninias.png', {
            frameWidth: 16,
            frameHeight: 21.33
        });
        this.load.spritesheet('rubio', 'rubio/rubio.png', {
            frameWidth: 16,
            frameHeight: 21.33
        });

        this.load.on('complete', () => {
            this.scene.start('Intro');
        });
    }

    create() {
        this.scene.start('Intro');
        const audio = this.sound.add('aircraft');
        audio.play();
    }
}
export default Bootloader;
