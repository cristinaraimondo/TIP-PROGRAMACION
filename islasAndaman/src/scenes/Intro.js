import Rocas from '../Rocas/Rocas.js';
import PersonajeDos from "../player/PersonajeDos.js"

class Intro extends Phaser.Scene {
    constructor() {
        super({ key: 'Intro' });
    }

    init() {
        console.log('Scene: Intro');
        this.camara = this.cameras.main;
        this.audioAvion = this.sound.add('aircraft', {
            loop: false
        });
    }

    create() {
        this.avion = this.add.image(200, 100, 'avion').setScale(0.3);

        const menuTextArray = [' '];

        const menuText = this.add.bitmapText(10, -510, 'font', menuTextArray);

        const cursor = this.input.keyboard.createCursorKeys();

        const menuContainer = this.add.container(0, 0);
        menuContainer.add([menuText]);

        menuContainer.setAlpha(0);

        const creditsTextArray = [
            '2019 UNQ\n',
            'CIU GRAL.BELGRANO .\n',
            'LICENSED BY\n',
            'CREATIVE COMMONS.\n',
            'Y CREADO CON PHASER 3'
        ];

        const textArray = {
            text: [
                'UN AVION CON DESTINO,\n\nA LA INDIA',
                'SE ESTRELLA.\n\nEN LAS ISLAS DE ANDAMAN',
                'SOBREVIVIERON TODOS\n\nPERO SOLO UN VALIENTE.',
                'SE LANZARA A LA AVENTURA,\n\nY ATRAVESARA TODOS ',
                'LOS PELIGROS PARA ENCONTRAR\n\nEL BARCO QUE LOS SALVARA.'
            ],
            count: 0
        };

        // Créditos
        const creditsText = this.add
            .bitmapText(
                this.scale.width / 2,
                this.scale.height / 2,
                'font',
                creditsTextArray,
                16,
                1
            )
            .setOrigin(0.5)
            .setDepth(2);

        // Texto historia
        const historyText = this.add
            .bitmapText(0, 0, 'font', textArray.text[0])
            .setCenterAlign()
            .setDepth(2)
            .setAlpha(0);

        Phaser.Display.Align.In.BottomCenter(
            historyText,
            this.add.zone(0, -40, 580, 580).setOrigin(0)
        );

        const background_text = this.add
            .image(0, this.scale.height, 'background_text')
            .setOrigin(0, 0.7)
            .setScrollFactor(0.7)

            .setDepth(1);

        // Fondo
        const background = this.add
            .image(0, -50, 'objects')
            .setScale(1)
            .setOrigin(0)
            .setAlpha(0);
        background.setScrollFactor(0, 0.7);

        const rocas = new Rocas(this, 'objects', 7);
        const avione = this.add
            .sprite(560, -400, 'aviocayendo')
            .setScale(2)
            .setDepth(2)
            .setAngle(-10)
            .setScrollFactor(0.9);
        avione.anims.play('avionca');

        this.personajedos = new PersonajeDos({
            scene: this,
            x: 100,
            y: 350,
            setScale: 0.5,
            collideWorldBounds: true

        });

        // rubio
        const rubio = this.add
            .sprite(700, -360, 'rubioidle')
            .setScale(1.5)
            .setDepth(2)
            .setScrollFactor(0.9)
            .setInteractive();
        rubio.anims.play('idle');
        rubio.on('pointerdown', () => this.eligeIvan());
        //chico
        const chico = this.add
            .sprite(460, -375, 'chicoidle')
            .setScale(0.7)
            .setDepth(2)
            .setScrollFactor(0.9)
            .setAlpha(100)
            .setInteractive();

        chico.anims.play('quieto');

        chico.on('pointerdown', () => this.chicoPulsado());

        const avion = this.add.container(-300, -20);
        avion.add([this.avion]);
        this.add.tween({
            targets: [avion],
            delay: 5000,
            alpha: 0,
            y: 210,
            x: 600
        });

        const timeLine = this.tweens.createTimeline();

        timeLine.add({
            targets: creditsText,
            alpha: 0,
            delay: 3000,
            duration: 500,
            onComplete: () => {
                this.cameras.main.flash(500);
                this.audioAvion.play();
            }
        });

        timeLine.add({
            targets: [background, ...rocas.getChildren()],
            alpha: 1,
            duration: 1000
        });

        timeLine.add({
            targets: [historyText],
            alpha: 1,
            repeat: textArray.text.length - 1,
            hold: 2900,
            repeatDelay: 100,
            yoyo: true,
            onRepeat: () => {
                textArray.count++;

                historyText.setText(textArray.text[textArray.count]);
                Phaser.Display.Align.In.BottomCenter(
                    historyText,
                    this.add.zone(0, -60, 800, 600).setOrigin(0)
                );
            },
            onComplete: () => {
                this.camara.pan(
                    this.scale.width / 2,
                    -500,
                    10000,
                    'Quad.easeIn'
                );
            }
        });

        timeLine.play();
    }
    chicoPulsado() {
        alert('elegiste al mejor');
        this.scene.start('Anara');
    }
    eligeIvan() {
        alert('Ivan es muy veloz, elegiste al mejor');
        this.scene.start('Anara')
        this.personajedos.setTexture()
    }
}

export default Intro;
