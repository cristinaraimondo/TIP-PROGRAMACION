import Coco from "../enemigos/coco.js"
import PersonajeDos from "../player/PersonajeDos.js"
import MoscaMala from "../enemigos/MoscaMala.js";
import Manzana from "../objetos/Manzanas.js"
class Cocodrilos extends Phaser.Scene {
    constructor() {
        super({ key: 'Cocos' });
    }

    init(data) {
        console.log("se ha iniciado la escena cocos")


        this.camara = this.cameras.main;
        this.life = 5

        this.points = data.actual_points
    }



    create() {
        this.scene.launch("EstadoPersonaje")
        const sceneDatos = this.scene.get("EstadoPersonaje")

        const vidasDB = localStorage.getItem("life");
        this.betsPoints = (vidasDB !== null) ? vidasDB : 0;


        if (this.life > this.betsPoints) {
            localStorage.setItem("life", this.life);
        }

        this.boton = this.add.tileSprite(480, 320, 960, 420, 'pantano').setScale(1.5)
            .setScrollFactor(0)

        this.currentScene = this.scene.get(this);

        this.groupFloor = this.physics.add.staticGroup({
            key: 'floorCocos',
            repeat: 4,
            setXY: {
                x: 50,
                y: 650,
                stepX: 800
            },
            setScale: {
                x: 2

            }
        });
        this.itemsManzanas = new Manzana({
            physicsWorld: this.physics.world,
            scene: this
        })

        this.personajedos = new PersonajeDos({
            scene: this,
            x: 100,
            y: 350,
            setScale: 0.5,
            collideWorldBounds: true,


        });
        this.coco = new Coco({
            scene: this,
            x: 400,
            y: 550,
            setScale: 0.5,
            collideWorldBounds: true,


        });
        this.tweens.add({
            targets: this.coco,
            props: {
                x: { value: 20, duration: 2000, flipX: true },

            },

            yoyo: true,
            repeat: -1
        });

        this.mosca = new MoscaMala({
            scene: this,
            x: 100,
            y: 350,
            setScale: 0.5,
            collideWorldBounds: true,


        });
        this.tweens.add({
            targets: this.mosca,
            props: {
                x: { value: 800, duration: 2000, flipX: true },
                y: { value: 500, duration: 10000, },
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.physics.add.collider([this.personajedos], this.floor);
        this.physics.add.collider([this.personajedos], this.groupFloor);
        this.physics.add.collider(this.personajedos, this.coco, () => {
            this.personajedos.pierdeVidas();


        });

        this.physics.add.overlap(this.itemsManzanas, this.personajedos, () => {
            sceneDatos.addPoints()

            this.itemsManzanas.destroyItem();
            // this.comida.play();

        });


    }

    update(time, delta) {
        this.personajedos.update();
        this.cameras.main.scrollX = this.coco.x - 400,
            this.cameras.main.scrollX = this.personajedos.x - 400,
            this.boton.tilePositionX = this.coco.x
        this.boton.tilePositionX = this.personajedos.x;





    }
}

export default Cocodrilos;
