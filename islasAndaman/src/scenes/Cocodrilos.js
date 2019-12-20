import Coco from "../enemigos/coco.js"
import PersonajeDos from "../player/PersonajeDos.js"
import MoscaMala from "../enemigos/MoscaMala.js";
import Manzana from "../objetos/Manzanas.js"
import Bullets from "../objetos/Bullets.js"

class Cocodrilos extends Phaser.Scene {
    constructor() {
        super({ key: 'Cocos' });
    }

    init(data) {
        console.log("se ha iniciado la escena cocos" + data)

        this.registry.events.emit('update_points', this.actual_life)
        this.camara = this.cameras.main;

        this.actual_points = 0

        this.actual_life = data
    }



    create() {

        this.scene.launch("EstadoPersonaje")

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.boton = this.add.tileSprite(480, 320, 960, 420, 'pantano').setScale(1.5)
            .setScrollFactor(0)


        this.currentScene = this.scene.get(this);
        this.bullets = new Bullets(this.physics.world, this, []);

        //plataformas
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
        /////Collision

        this.physics.add.collider([this.personajedos], this.floor);
        this.physics.add.collider([this.personajedos], this.groupFloor);
        this.physics.add.overlap(this.personajedos, this.coco, () => {
            this.personajedos.pierdeVidas();


        });
        this.physics.add.collider(this.personajedos, this.coco, () => {

            this.registry.events.emit("points_other")
            this.coco.setPosition(1200, 550)

        });

        this.physics.add.overlap(this.bullets, this.mosca, this.bullets.enemyCollision, () => {
            this.registry.events.emit("points_other")

        });
        this.physics.add.overlap(this.personajedos, this.mosca, () => {
            this.personajedos.pierdeVidas();
        });

        this.physics.add.overlap(this.itemsManzanas, this.personajedos, () => {
            this.registry.events.emit("points_other")
            this.registry.events.emit('cambioVolcanes')
            'cambioVolcanes'

            this.itemsManzanas.destroyItem();
            // this.comida.play();

        });


    }

    update(time, delta) {

        if (this.personajedos.y > this.game.config.height) {
            //this.scene.start(this);
            this.personajedos.setPosition(400, 100)
            this.personajedos.pierdeVidas()
        }
        this.personajedos.update(this.cursors);

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.bullets.fireBullet(this.personajedos.x, this.personajedos.y, this.personajedos.prevMov);
        }


        this.mosca.update();

        this.cameras.main.scrollX = this.coco.x - 400,

            this.cameras.main.scrollX = this.personajedos.x - 400,
            this.boton.tilePositionX = this.coco.x
        this.boton.tilePositionX = this.personajedos.x;






    }
}

export default Cocodrilos;
