import PersonajeDos from '../Player/PersonajeDos.js';
//import Personaje from '../Player/Personaje.js';
import PajaroRojo from "../enemigos/PajaroRojo.js";

import Huevos from "../objetos/Huevos.js"


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


        this.laterales = this.physics.add.staticGroup();
        this.laterales.create(-600, 0, "lateralIzquierdo").setOrigin(0).setSize(20, 800)
        this.laterales.create(1900, 0, "lateralDerecho").setOrigin(0).setSize(20, 800)

        this.scene.launch('Lluvia')
        this.scene.launch("Vidas")
        this.cameras.main.setSize(960, 640);
        const scenesArray = { scenes: ['Lluvia'] };

        this.wall_floor = this.physics.add.staticGroup();
        this.wall_floor.create(0, 500, 'floor').setOrigin(0)
        this.wall_floor.create(-1300, 500, 'floor').setOrigin(0);
        this.wall_floor.create(1500, 500, 'floor').setOrigin(0)

        this.wall_floor.create(1400, 620, 'agua').setScale(2)
        this.wall_floor.refresh();

        this.huevosGroup = new Huevos({
            physicsWorld: this.physics.world,
            scene: this

        })


        // Personaje
        this.personajedos = new PersonajeDos({
            scene: this,
            x: 100,
            y: 350,
            setScale: 0.5,
            collideWorldBounds: true

        });
        this.pajaroRojo = new PajaroRojo({
            scene: this,
            x: 200,
            y: 100,
            setScale: 0.5,


        });


        this.physics.add.collider([this.personajedos, this.pajaroRojo, this.huevosGroup,], this.wall_floor)
        this.physics.add.collider([this.personajedos, this.pajaroRojo, this.huevosGroup,], this.laterales)


        this.physics.add.collider(this.personajedos, this.pajaroRojo);



        this.physics.add.overlap(this.personajedos, this.huevosGroup, () => this.personajedos.huevoCollision());//collision y la accion

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
        this.pajaroRojo.update();
        this.huevosGroup.update()
        this.cameras.main.scrollX = this.personajedos.x - 400;
        this.bg.tilePositionX = this.personajedos.x;


    }


}

export default Anara;
