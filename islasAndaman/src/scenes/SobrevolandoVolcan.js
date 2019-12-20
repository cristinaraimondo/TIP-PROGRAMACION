import PersonajeDos from '../Player/PersonajeDos.js';


class SobrevolandoVolcan extends Phaser.Scene {
    constructor() {
        super('sobrevolandoVolcan');

    }

    init() {
        this.scene.moveUp();
        this.scene.launch("EstadoPersonaje")
        this.scene.launch("Textos")
        this.camara = this.cameras.main

    }
    preload() {
        this.load.image("bg", "assets/bg_volcano.png");
        this.load.image("planta", "assets/bg_volcanon.png");
        this.load.image("cristal", "assets/volcanoCristal.png");
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    }

    create() {
        this.backg = this.add.tileSprite(400, 300, 800, 600, "bg")
            .setScrollFactor(0)
        this.cristal = this.physics.add.image(600, 450, "cristal").setSize(64, 64).setOffset(18, 70)
        this.planta = this.add.image(10, 650, "planta").setSize(30, 1)

        this.particles = this.add.particles('flares');

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


        this.tweens.add({
            targets: this.personaje,
            props: {
                x: { value: 20, duration: 2000, flipX: true },

            },
            setGravityY: 0,
            yoyo: false,
            repeat: 0
        });


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

        //collision
        this.physics.add.collider([this.personaje], this.groupFloor);

    }

    update() {
        if (this.personaje.y > this.game.config.height) {
            this.personaje.setPosition(400, 100)
            this.personaje.pierdeVidas()
        }
        this.personaje.update();
        this.cameras.main.scrollX = this.personaje.x - 100;
        this.backg.tilePositionX = this.personaje.x;
        this.backg.tilePositionx = this.planta.x



    }
}
export default SobrevolandoVolcan;
