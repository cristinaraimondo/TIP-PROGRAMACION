import PersonajeDos from '../Player/PersonajeDos.js';
import Comida from '../objetos/Comida.js';
import PajaroRojo from "../enemigos/PajaroRojo.js";

import Huevos from "../objetos/Huevos.js"


class Ataque_huevos extends Phaser.Scene {

    constructor() {
        super('Anara');
    }

    init() {
        console.log('Anara');
        this.scene.launch("EstadoPersonaje")
        this.camara = this.cameras.main

    }

    create() {



        this.bg = this.add
            .tileSprite(480, 320, 960, 640, 'sel')
            .setScrollFactor(0);
        (this.collisioHuevo = this.sound.add('huevo', {
            loop: false
        })),
            (this.comida = this.sound.add('comida', {
                loop: false
            })),
            (this.cuervo = this.sound.add('cuervo', {
                loop: false
            })),

            this.laterales = this.physics.add.staticGroup();
        this.laterales.create(-600, 0, "lateralIzquierdo").setOrigin(0).setSize(20, 800)
        this.laterales.create(1900, 0, "lateralDerecho").setOrigin(0).setSize(20, 800)

        this.scene.launch('Lluvia')

        this.cameras.main.setSize(960, 640);
        this.apagarLluvia = setTimeout(() => { this.scene.sleep("Lluvia"), this.sound.stopAll(), console.log("se ha detenido la escena lluvia") }, 20000)


        this.wall_floor = this.physics.add.staticGroup();
        this.wall_floor.create(0, 500, 'floor').setOrigin(0)
        this.wall_floor.create(-1300, 500, 'floor').setOrigin(0);
        this.wall_floor.create(1500, 500, 'floor').setOrigin(0)

        this.wall_floor.create(1400, 620, 'agua').setScale(2)
        this.wall_floor.refresh();



        // Items
        this.itemsGroup = new Comida({
            physicsWorld: this.physics.world,
            scene: this
        });


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
            setCollideWorldBounds: true


        });

        //collisions

        this.physics.add.collider([this.personajedos, this.huevosGroup], this.wall_floor);
        this.physics.add.collider(this.personajedos, this.pajaroRojo, () => {
            console.log("pega al pajaro")
            this.registry.events.emit('update_points');
            this.cuervo.play()


        });
        this.physics.add.collider([this.personajedos, this.pajaroRojo, this.huevosGroup,], this.laterales)
        this.physics.add.overlap(this.personajedos, this.huevosGroup, () => {
            this.personajedos.huevoCollision();
            this.collisioHuevo.play()

        });
        this.physics.add.collider(this.pajaroRojo, this.laterales, () => {
            this.pajaroRojo.lateralCollision()


        });

        this.physics.add.overlap(this.itemsGroup, this.personajedos, () => {
            this.registry.events.emit('update_points');
            this.itemsGroup.destroyItem();
            this.huevosGroup.addHuevo();
            this.comida.play();

        });



    }

    update() {
        this.personajedos.update();
        this.pajaroRojo.update();
        this.huevosGroup.update()
        this.cameras.main.scrollX = this.personajedos.x - 400;
        this.bg.tilePositionX = this.personajedos.x;




    }


}

export default Ataque_huevos;
