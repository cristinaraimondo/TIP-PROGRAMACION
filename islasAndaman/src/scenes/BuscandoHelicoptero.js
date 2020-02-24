import PersonajeDos from '../player/PersonajePrincipal.js';
import PlantaFlor from '../objetos/plantaFlor.js';
import Cristales from "../objetos/Cristales.js"
import Volcan from "../enemigos/Volcan.js"
import GroupVolcan from "../objetos/GroupVolcan.js"
import Jugador from '../player/Helicoptero.js';
//import Personaje from "../player/Eve.js"


class SobrevolandoVolcan extends Phaser.Scene {
    constructor() {
        super('sobrevolandoVolcan');


    }

    init(data) {
        this.registry.events.removeAllListeners();
        this.scene.moveUp();
        this.scene.launch("EstadoPersonaje")
        this.camara = this.cameras.main

        this.cristalCollected = 0
        this.plantaCollected = 0

    }
    preload() {
        this.load.image("bg", "assets/bg_volcano.png");
        this.load.image("planta", "assets/bg_volcanon.png");
        this.load.image("flor", "assets/plantaFlor.png");
        this.load.image("cristal", "assets/volcanoCristal.png");
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
        this.load.image("bolafuego", "assets/energia.png")
        this.load.image("coolavion", "assets/Dead.png")

    }

    create() {

        this.backg = this.add
            .tileSprite(480, 320, 1960, 640, 'sobrevolandoVol')
            .setScrollFactor(0);


        this.registry.events.on('update_cristales', () => {
            this.actual_cristales++;
        })
        //textos
        this.scoreText = this.add.text(12, 12, `Plantas: ${this.plantaCollected}`, { fontSize: '32px', fill: '#21767f', fontFamily: 'rockwell, symbol' }).setScrollFactor(0);
        this.scoreText.visible = false
        this.cristalText = this.add.text(12, 40, `Cristales: ${this.cristalCollected}`, { fontSize: '32px', fill: '#21767f', fontFamily: 'rockwell, symbol' }).setScrollFactor(0);
        this.cristalText.visible = false
        this.winTxt = this.add.text(125, 130, `\n *****  ¡Anda a buscar a EVE...y al helicoptero!  ***** \n `, { fontSize: '30px', fill: '#21767f', fontFamily: 'rockwell, symbol', backgroundColor: 'pink', align: 'center' }).setScrollFactor(0);
        this.winTxt.visible = false;
        this.textConsejo = this.add.text(500, 100, "Recoger:\n\ncristales: 10\n\nplantas de vida: 5\n\ncuando tengas todo\n\npodrás subirte al avión").setScrollFactor(0)


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

        //timeline para que el texto se desvanezca
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

        this.group = this.physics.add.staticGroup({//lo pongo antes del personaje para que este este por delante
            Key: 'volcan',
            repeat: 10,
            setXY: {
                x: 350,
                y: 600,
                stepX: 1200
            },
            setScale: {
                x: 2

            }
        });

        this.volc = new GroupVolcan({ //son parte del escenario, no tienen colision
            physicsWorld: this.physics.world,
            scene: this,


        })
        // eventos desde la escena
        this.registry.events.on('plantaCollected', () => {
            this.scoreText.visible = true

            this.plantaCollected += 1;
            this.scoreText.setText(`Plantas: ${this.plantaCollected}`);
            console.log('plantaCollected' + this.plantaCollected)

        });

        this.registry.events.on('cristalCollected', () => {

            this.cristalText.visible = true
            this.cristalCollected += 1;
            this.cristalText.setText(`Cristales: ${this.cristalCollected}`);
        })

        this.registry.events.on('resume', () => {
            if (this.plantaCollected === 5 && this.cristalCollected === 10) {
                this.winTxt.visible = true;

                // muestro el texto para buscar a Eve  y luego lo desvanezco
                const timeLine = this.tweens.createTimeline();

                timeLine.add({
                    targets: this.winTxt,
                    alpha: 0,
                    delay: 3000,
                    duration: 500,
                    onComplete: () => {
                        this.winTxt.visible = false
                    }
                });
                timeLine.play();
            }
        })
        //volcanes y bolas de fuego con colision
        this.bolaFuego = this.physics.add.image(507, 550, "bolafuego").setScale(0.7)
        this.volcan = new Volcan({
            scene: this,
            x: 500,
            y: 500,
            gravityY: 0,
            repeat: 4,
            stepX: 800

        });


        this.bolaFuego2 = this.physics.add.image(1107, 550, "bolafuego").setScale(0.7)
        this.volcan2 = new Volcan({
            scene: this,
            x: 1100,
            y: 480,
            gravityY: 0

        });
        this.bolaFuego3 = this.physics.add.image(2107, 550, "bolafuego").setScale(0.7)
        this.volcan3 = new Volcan({
            scene: this,
            x: 2100,
            y: 480,
            gravityY: 0

        });

        //800 pixeles en 3 segundos
        this.speed = Phaser.Math.GetSpeed(-800, 3)
        this.speed2 = Phaser.Math.GetSpeed(-1200, 3)


        this.itemsGroup = new PlantaFlor({
            physicsWorld: this.physics.world,
            scene: this,
        });
        this.itemsGroupCristales = new Cristales({
            physicsWorld: this.physics.world,
            scene: this,


        });
        //los creo en capas 

        this.personaje = new PersonajeDos({
            scene: this,
            x: 600,
            y: 300,
            gravityY: 0

        });
        this.heli = new Jugador({
            scene: this,
            x: -100,
            y: 300,
            gravityX: 0,
            setVelocityX: 0

        })
        this.crearAEve()

        this.carcel = this.physics.add.staticImage(100, 400, "carcel").setScale(1.5).setSize(100).setOffset(250, 2)//con offset creo la entrada a la carcel
        this.heli.setScale(4)
        this.heli.setVelocityX(0)




        //colisiones
        this.physics.add.collider([this.personaje, this.heli,], this.groupFloor);
        this.physics.add.collider(this.carcel, this.personaje)
        this.physics.add.collider([this.volcan, this.volcan2, this.volcan3], this.personaje);
        this.physics.add.overlap(this.itemsGroup, this.personaje, () => {
            this.registry.events.emit('plantaCollected');
            this.itemsGroup.destroyItem();
            this.registry.events.emit('resume')
            this.abrirCarcel()

        });
        this.physics.add.overlap(this.heli, this.personaje, () => {

            this.scene.start('Avion')
            this.scene.stop("EstadoPersonaje")

        });
        this.physics.add.overlap([this.itemsGroupCristales], this.personaje, () => {

            this.registry.events.emit('cristalCollected');
            this.itemsGroupCristales.destroyItem();
            this.registry.events.emit('resume')
            this.abrirCarcel()
        });


        this.physics.add.overlap([this.bolaFuego, this.bolaFuego2, this.bolaFuego3], this.personaje, () => {
            this.personaje.pierdeVidas()
            this.registry.events.emit('sobrevolando')

        });

        this.physics.add.overlap([this.eve], this.personaje, () => {
            this.corazon = this.add.image(125, 430, "corazon")


        });
    }
    abrirCarcel() {
        if (this.cristalCollected === 10 && this.plantaCollected === 5) {
            this.carcel.setSize(50, 50)

        }
    }

    crearAEve() {
        this.eve = this.physics.add.sprite(300, 530, "eve", )
        this.eve.setScale(1.5)
        this.eve.body.setSize(32, 32)
        this.eve.body.setOffset(10, 10)
        this.eve.play("izquierda")
        this.eve.setGravityY(0)

        //creo interpolaciones para que Eve vaya de izquierda a derecha indefinidamente con (-1)

        this.tweens.add({
            targets: [this.eve],
            props: {
                x: { value: 20, duration: 7000, flipX: true },

            },
            yoyo: true,
            repeat: -1
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
        this.bolaFuego2.y += this.speed2 * delta;
        if (this.bolaFuego2.y < 0) {
            this.bolaFuego2.y = 550
        }
        this.bolaFuego3.y += this.speed * delta;
        if (this.bolaFuego3.y < 0) {
            this.bolaFuego3.y = 550
        }

        if (this.personaje.y > this.game.config.height) {
            this.personaje.setPosition(400, 100)
            this.personaje.pierdeVidas()
            this.registry.events.emit('sobrevolando')
        }
        this.personaje.update();
        this.cameras.main.scrollX = this.personaje.x - 500;
        // this.backg.tilePositionX = this.personaje.x;
        this.backg.tilePositionx = this.planta.x



    }
}
export default SobrevolandoVolcan;
