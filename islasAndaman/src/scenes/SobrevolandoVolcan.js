import PersonajeDos from '../Player/PersonajeDos.js';
import PlantaFlor from '../objetos/plantaFlor.js';
import Cristales from "../objetos/Cristales.js"
import Volcan from "../enemigos/Volcan.js"

class SobrevolandoVolcan extends Phaser.Scene {
    constructor() {
        super('sobrevolandoVolcan');


    }

    init() {
        this.scene.moveUp();
        this.scene.launch("EstadoPersonaje")
        this.camara = this.cameras.main

        this.actual_cristales = 0

    }
    preload() {
        this.load.image("bg", "assets/bg_volcano.png");
        this.load.image("planta", "assets/bg_volcanon.png");
        this.load.image("flor", "assets/plantaFlor.png");
        this.load.image("cristal", "assets/volcanoCristal.png");
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
        this.load.image("bolafuego", "assets/energia.png")
    }

    create() {

        this.backg = this.add.tileSprite(400, 300, 800, 600, "bg")
            .setScrollFactor(0)



        this.registry.events.on('update_cristales', () => {
            this.actual_cristales++;


        })

        this.textConsejo = this.add.text(500, 100, "Recoger:\n\ncristales: 10\n\nplantas de vida: 5\n\ncuando tengas todo\n\npodrás subirte al avión").setScrollFactor(0)

        this.cristal = this.physics.add.image(600, 450, "cristal").setSize(32, 32).setOffset(18, 70)
        this.planta = this.add.image(10, 650, "planta").setSize(30, 1)

        //creo las particulas, son solo parte de la escena no collisionan
        this.particles = this.add.particles('flares')

        this.particles.createEmitter({
            frame: 'yellow',
            radial: false,
            x: 100,
            y: { min: 0, max: 860, steps: 256 },
            lifespan: 2000,
            speedX: { min: 200, max: 400 },
            quantity: 4,
            gravityY: -50,
            scale: { start: 0.4, end: 0, ease: 'Power3' },
            blendMode: 'ADD'
        });
        this.particles.createEmitter({
            frame: 'yellow',
            radial: false,
            x: 800,
            y: { min: 0, max: 1060, steps: 256 },
            lifespan: 2500,
            speedX: { min: 200, max: 400 },

            quantity: 4,
            gravityY: -50,
            scale: { start: 0.2, end: 0, ease: 'Power2' },
            blendMode: 'ADD'
        });



        this.personaje = new PersonajeDos({
            scene: this,
            x: 100,
            y: 300,
            gravityY: 0

        });


        const timeLine = this.tweens.createTimeline();
        timeLine.add({
            targets: [this.textConsejo],
            alpha: 0,
            delay: 25000,
            duration: 3000
        });

        timeLine.play();

        this.groupFloor = this.physics.add.staticGroup({
            key: 'planta',
            repeat: 4,
            setXY: {
                x: 50,
                y: 600,
                stepX: 800
            },
            setScale: {
                x: 0.5

            }

        });
        this.bolaFuego = this.physics.add.image(507, 550, "bolafuego").setScale(0.7)
        this.volcan = new Volcan({
            scene: this,
            x: 500,
            y: 530,
            gravityY: 0

        });
        this.bolaFuego2 = this.physics.add.image(1107, 550, "bolafuego").setScale(0.7)
        this.volcan2 = new Volcan({
            scene: this,
            x: 1100,
            y: 530,
            gravityY: 0

        });
        //800 pixeles en 3 segundos
        this.speed = Phaser.Math.GetSpeed(-800, 3)


        this.itemsGroup = new PlantaFlor({
            physicsWorld: this.physics.world,
            scene: this,
        });
        this.itemsGroupCristales = new Cristales({
            physicsWorld: this.physics.world,
            scene: this,


        });

        this.itemsGroupCristales.addCristalItem()

        //collision
        this.physics.add.collider([this.personaje], this.groupFloor);

        this.physics.add.overlap(this.itemsGroup, this.personaje, () => {
            this.registry.events.emit('plantaCollected');
            this.itemsGroup.destroyItem();
            this.registry.events.emit('resume')
        });
        this.physics.add.overlap(this.itemsGroupCristales, this.personaje, () => {
            this.registry.events.emit('cristalCollected');
            this.itemsGroupCristales.destroyItem();
            this.registry.events.emit('resume')
        });

        this.physics.add.overlap([this.bolaFuego, this.bolaFuego2], this.personaje, () => {
            this.personaje.pierdeVidas()
            this.registry.events.emit('sobrevolando')
        });

    }

    update(time, delta) {
        // La función de actualización pasa 2 valores:
        // La hora actual (en ms)
        // Y el tiempo delta, que se deriva del tiempo transcurrido desde el último fotograma, /
        //con un poco de suavizado sujeto al rango aplicado

        this.bolaFuego.y += this.speed * delta;
        if (this.bolaFuego.y < 0) {
            this.bolaFuego.y = 550
        }
        this.bolaFuego2.y += this.speed * delta;
        if (this.bolaFuego2.y < 0) {
            this.bolaFuego2.y = 550
        }

        if (this.personaje.y > this.game.config.height) {
            this.personaje.setPosition(400, 100)
            this.personaje.pierdeVidas()
            this.registry.events.emit('sobrevolando')

        }
        this.personaje.update();
        this.cameras.main.scrollX = this.personaje.x - 100;
        this.backg.tilePositionX = this.personaje.x;
        this.backg.tilePositionx = this.planta.x



    }
}
export default SobrevolandoVolcan;
