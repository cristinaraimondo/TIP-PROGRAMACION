class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {
        this.load.setPath('./assets/');
        this.load.audio('aircraft', ['aircraft.mp3']);
        this.load.image('avion', 'avioneta.png');
        this.load.image(['logo', 'background_text', 'selector']);
        this.load.image("agua", "agua.png");
        this.load.image("vohue", "huevo.png");
        this.load.image('SELVA', 'objects/objects.png');
        this.load.audio('lalluvia', ['lalluvia.mp3']);
        this.load.audio('thunder', ['thunder.mp3']);
        this.load.image("lateralIzquierdo", "lateralIzquierdo.png")
        this.load.image("lateralDerecho", "lateralDerecho.png")

        this.load.atlas(
            'objects',
            'objects/objects.png',
            'objects/objects_atlas.json'
        );
        this.load.image('pelota', 'sel.jpg');
        this.load.image('sel', 'sel.png');
        this.load.image("life", "life.png");
        this.load.image('floor', 'floor.jpg');
        this.load.atlas("pajaroRojo", "pajaroRojo/pajaro.png", "pajaroRojo/pajaroatlas.json ");
        this.load.animation("pajarorojo", "pajaroRojo/pajaroanim.json");


        this.load.image('font', 'font/font.png');
        this.load.json('fontJSON', 'font/font.json');

        this.load.atlas(
            'aviocayendo',
            'aviocayendo/aviocayendo.png',
            'aviocayendo/aviocayendo_atlas.json'
        );
        this.load.animation('avioANIM', 'aviocayendo/aviocayendo_anim.json');

        this.load.atlas(
            'lluvia',
            'lluvia/llluvia.png',
            'lluvia/lluviaatlas.json'
        );
        this.load.animation('lluviaanim', 'lluvia/lluviaanim.json');

        this.load.atlas(
            'rubioidle',
            'rubioidle/rubioidle.png',
            'rubioidle/rubioidle_atlas.json'
        );
        this.load.animation('rubioidleANIM', 'rubioidle/rubioidle_anim.json');

        this.load.atlas(
            'chiqui',
            'chiqui/chiqui.png',
            'chiqui/chiqui_atlas.json'
        );
        this.load.animation('chiquian', 'chiqui/chiqui_anim.json');

        this.load.atlas(
            'chicoidle',
            'chicoidle/chicoidle.png',
            'chicoidle/chicoidle_atlas.json'
        );
        this.load.animation('chicoidleANIM', 'chicoidle/chicoidle_anim.json');

        this.load.on('complete', () => {
            const configFont = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add(
                'font',
                Phaser.GameObjects.RetroFont.Parse(this, configFont)
            );
            this.scene.start('Anara');
            //this.scene.launch('Lluvia');
        });
    }
}
export default Bootloader;
