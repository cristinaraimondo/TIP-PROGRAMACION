class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {
        this.load.setPath('./assets/');

        this.load.audio('aircraft', ['aircraft.mp3']);
        this.load.audio('islaMusic', ['islandMusic.mp3'])
        this.load.audio('huevo', ['collisionhuevo.mp3']);
        this.load.audio('cuervo', ['cuervo.mp3']);
        this.load.image('avion', 'avioneta.png');
        this.load.image(['logo', 'background_text', 'selector']);
        this.load.image("agua", "agua.png");
        this.load.image("vohue", "huevo.png");
        this.load.image('SELVA', 'objects/objects.png');
        this.load.audio('lalluvia', ['lalluvia.mp3']);
        this.load.audio('thunder', ['thunder.mp3']);
        this.load.audio('comida', ['bounce.ogg']);
        this.load.image("lateralIzquierdo", "lateralIzquierdo.png")
        this.load.image("lateralDerecho", "lateralDerecho.png")
        this.load.image("boton", "boton.png")
        this.load.image("floorCocos", "floorCocos.png")
        this.load.image("manzana", "apple.png")
        this.load.image("bullet", "laser.png")
        this.load.image("arbol", "arboles/arboljunto.png")
        this.load.image("rama", "arboles/rama.png")
        this.load.image("ramados", "arboles/ramados.png")
        this.load.image("llave", "arboles/llave.png")
        this.load.atlas(
            'objects',
            'objects/objects.png',
            'objects/objects_atlas.json'
        );
        this.load.image('pelota', 'sel.jpg');
        this.load.image("flor", "plantaFlor.png");
        this.load.image('sel', 'sel.png');
        this.load.image("life", "life.png");
        this.load.image('floor', 'floor.jpg');
        this.load.atlas("pajaroRojo", "pajerto/pajerto.png", "pajerto/pajerto_atlas.json ");
        this.load.animation("pajarorojo", "pajerto/pajerto_anim.json");
        this.load.image("food", "food.png")
        this.load.image("pantano", "pant.png")
        //this.load.image("bgVolcan", "bgVolcan.png")


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

        this.load.atlas(
            'coco',
            'cococam/coco.png',
            'cococam/coco_atlas.json'
        );
        this.load.animation("coco", 'cococam/coco_anim.json');
        /////////////////////////////////////////////////////
        this.load.atlas(
            'mosca',
            'moscamala/moscamala.png',
            'moscamala/moscamala_atlas.json'
        );
        this.load.animation("mosca", 'moscamala/moscamala_anim.json');
        /////////////////////////////////////////////////////////////////////

        this.load.atlas(
            'volcan',
            'volcan/volcan3.png',
            'volcan/volcan3_atlas.json'
        );
        this.load.animation('volcan', 'volcan/volcan3_anim.json');
        //////////////////////////////////////////////////////////


        this.load.on('complete', () => {
            const configFont = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add(
                'font',
                Phaser.GameObjects.RetroFont.Parse(this, configFont)
            );


        });
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Cargando...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        this.load.image('aven', 'titulo.png');
        for (var i = 0; i < 5; i++) {
            this.load.image('aven' + i, 'titulo.png');
        }
    }
    create() {
        const aven = this.add.image(400, 300, 'aven');

        const timeLine = this.tweens.createTimeline();

        timeLine.add({
            targets: aven,
            alpha: 0,
            delay: 3000,
            duration: 500,
            onComplete: () => {
                this.scene.start('sobrevolandoVolcan');


            }


        });
        timeLine.play();






    }
}
export default Bootloader;
