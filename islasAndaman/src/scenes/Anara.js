import PersonajeDos from '../Player/PersonajeDos.js';
class Anara extends Phaser.Scene {
    constructor() {
        super('Anara');
    }

    init() {
        console.log('Anara');
        this.camara = this.cameras.main;
        (this.audioAvion = this.sound.add('thunder', {
            loop: false
        })),
            (this.audioLluvia = this.sound.add('lalluvia', {
                loop: true
            }));
    }

    create() {
        this.bg = this.add
            .tileSprite(480, 320, 960, 640, 'sel')
            .setScrollFactor(0);
        this.scene.launch('Lluvia');
        this.cameras.main.setSize(960, 640);
        const scenesArray = { scenes: ['Lluvia'] };

        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(0, this.scale.height, 'floor').setOrigin(0, 1);

        this.wall_floor.refresh();

        // Personaje
        this.personajedos = new PersonajeDos({
            scene: this,
            x: 100,
            y: 100,
            setScale: 0.5
        });

        this.physics.add.collider([this.personajedos], this.wall_floor);
        const timeLine = this.tweens.createTimeline();

        timeLine.add({
            targets: scenesArray,
            alpha: 0,
            paused: true,
            delay: 2000,
            repeatDelay: 100,

            onComplete: () => {
                this.cameras.main.flash(500);
                this.audioAvion.play();
                this.audioLluvia.play();
            }
        });
        timeLine.play();
    }

    update() {
        this.personajedos.update();

        this.cameras.main.scrollX = this.personajedos.x - 400;
        this.cameras.main.scrollY = 0;
        this.bg.tilePositionX = this.personajedos.x;
    }
}

export default Anara;
