import Personaje from '../Player/Personaje.js';
//import PajaroRojo from "../enemigos/PajaroRojo.js";

class Ivan extends Phaser.Scene {
    constructor() {
        super('ivan');
        this.moreno;
    }

    init() {
        console.log('Se ha iniciado la escena Play');
        this.camara = this.cameras.main;

    }

    create() {
        this.bg = this.add
            .tileSprite(480, 320, 960, 640, 'sel')
            .setScrollFactor(0);
        this.scene.launch('Lluvia');
        this.cameras.main.setSize(960, 640);


        const lluvias = this.add.sprite(500, 10, 'lluvia').setScale(0.3);
        const scenesArray = { scenes: ['Lluvia'] };

        // Personaje
        this.personaje = new Personaje({
            scene: this,
            x: 100,
            y: 400
        });
        //enemigo 

        // this.pajaroEnemigo = new PajaroRojo({
        //     scene: this,
        //     x: 600,
        //     y: 10
        // })

        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(0, 500, 'floor').setOrigin(0);

        this.wall_floor.refresh();

        this.physics.add.collider(
            [this.personaje, this.grupo],
            this.wall_floor
        );

        const timeLine = this.tweens.createTimeline();

        timeLine.add({
            targets: scenesArray,
            alpha: 1,
            paused: true,
            hold: 2900,
            delay: 1000,
            repeatDelay: 100,

            onComplete: () => {
                this.cameras.main.flash(600);
                this.audioAvion.play();
                this.audioLluvia.play();
            }
        });
        timeLine.play();
    }

    update() {
        this.personaje.update();
        //this.pajaroEnemigo.update();
        this.personaje.x += 0.1;
        this.cameras.main.scrollX = this.personaje.x - 400;
        this.cameras.main.scrollY = 0;
        this.bg.tilePositionX = this.personaje.x;


    }
}
export default Ivan;
