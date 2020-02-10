import PersonajeDos from '../Player/PersonajeDos.js';
import Comida from '../objetos/Comida.js';
import PajaroRojo from "../enemigos/PajaroRojo.js";
import Manzana from "../objetos/Manzanas.js"

import Huevos from "../objetos/Huevos.js"


class Ataque_huevos extends Phaser.Scene {

    constructor() {
        super('Anara');
    }

    init() {
        console.log('Anara');
        this.scene.launch("EstadoPersonaje")
        this.scene.launch('textroll')
        this.camara = this.cameras.main

    }

    create() {



        this.bg = this.add
            .tileSprite(480, 320, 1960, 640, 'sel')
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
            this.apple = this.add.group("manzana")
        this.laterales = this.physics.add.staticGroup();
        this.laterales.create(-600, 0, "lateralIzquierdo").setOrigin(0).setSize(20, 800)
        // this.laterales.create(1900, 0, "lateralDerecho").setOrigin(0).setSize(20, 800)

        this.scene.launch('Lluvia')

        this.cameras.main.setSize(960, 640);
        this.apagarLluvia = setTimeout(() => { this.scene.sleep("Lluvia"), this.sound.stopAll(), console.log("se ha detenido la escena lluvia") }, 20000)

        if (typeof world !== 'undefined') {
            this.scene.world.setBounds(0, 0, 300, 600, true)
        }

        this.wall_floor = this.physics.add.staticGroup();
        this.wall_floor.create(0, 500, 'floor').setOrigin(0)
        this.wall_floor.create(-1300, 500, 'floor').setOrigin(0);
        this.wall_floor.create(1500, 500, 'floor').setOrigin(0)

        this.wall_floor.create(1400, 620, 'agua').setScale(2)
        this.wall_floor.refresh();






        // Items
        this.itemsGroup = new Comida({
            physicsWorld: this.physics.world,
            scene: this,
            setScale: 0.5

        });

        this.itemsManzanas = new Manzana({
            physicsWorld: this.physics.world,
            scene: this
        })
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
        this.pajaroRojo2 = new PajaroRojo({
            scene: this,
            x: 800,
            y: 100,
            setScale: 0.5,
            setCollideWorldBounds: true


        });

        this.tweens.add({
            targets: [this.pajaroRojo],
            props: {
                x: { value: 500, duration: 2000, flipX: true },
                y: { value: 500, duration: 10000, },
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: [this.pajaroRojo2],
            props: {
                x: { value: 2000, duration: 3000, flipX: true },
                y: { value: 300, duration: 10000, },
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });


        //collisions

        this.physics.add.collider([this.personajedos, this.huevosGroup], this.wall_floor);
        this.physics.add.overlap(this.personajedos, this.pajaroRojo, () => {
            console.log("pega al pajaro")

            this.personajedos.pierdeVidas();
            this.cuervo.play()
            this.personajedos.pierdeJuego()


        });
        this.physics.add.collider([this.personajedos, this.pajaroRojo, this.huevosGroup], this.laterales)
        this.physics.add.overlap(this.personajedos, this.huevosGroup, () => {
            this.personajedos.pierdeVidas();
            this.personajedos.pierdeJuego()



            this.sound.stopAll()

            this.collisioHuevo.play()

        });

        this.physics.add.overlap(this.itemsGroup, this.personajedos, () => {
            this.registry.events.emit('update_points');
            this.itemsGroup.destroyItem();
            this.huevosGroup.addHuevo();
            this.comida.play();

        });
        this.physics.add.overlap(this.itemsManzanas, this.personajedos, () => {
            this.registry.events.emit("points_other")

            this.itemsManzanas.destroyItem();
            this.comida.play();

        });





    }


    update() {
        if (this.personajedos.y > this.game.config.height) {

            this.personajedos.setPosition(400, 100)
            this.personajedos.pierdeVidas()
        }
        this.personajedos.update();
        this.pajaroRojo.update();
        this.huevosGroup.update()
        this.cameras.main.scrollX = this.personajedos.x - 400;
        this.bg.tilePositionX = this.personajedos.x;


    }

}

export default Ataque_huevos;
