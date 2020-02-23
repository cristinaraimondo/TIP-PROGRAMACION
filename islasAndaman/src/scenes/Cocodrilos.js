import Coco from "../enemigos/coco.js"
import PersonajeDos from "../player/PersonajePrincipal.js"
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
    preload (){
    this.load.image('tv', 'assets/tv.png');
      }
   

    create() {

        this.scene.launch("EstadoPersonaje")
        this.registry.events.emit("mostrarTexto")
        this.physics.world.setBounds(480, 320, 500, 550, true)


        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.boton = this.add.tileSprite(400, 300, 800, 600, 'pantano')
            .setScrollFactor(0)


        

        //plataformas
        this.groupFloor = this.physics.add.staticGroup({
            key: 'floorCocos',
            repeat: 8,
            setXY: {
                x: 50,
                y: 650,
                stepX: 500
            },
            setScale: {
                x: 2

            }
        });
        this.itemsManzanas = new Manzana({
            physicsWorld: this.physics.world,
            scene: this
        })


        this.ramas = this.physics.add.staticGroup();
        this.ramas.create(910, 550, "rama").setOrigin(1).setScale(0.2).setSize(100, 50).setOffset(300, 300)
        this.ramas.create(1150, 500, "ramados").setOrigin(1).setScale(0.2).setSize(100, 40).setOffset(400, 350)


        this.arbol = this.add.image(1200, 650, "arbol").setOrigin(1).setScale(0.2)

        this.ramas2 = this.physics.add.staticGroup();
        this.ramas2.create(1510, 550, "rama").setOrigin(1).setScale(0.2).setSize(100, 50).setOffset(300, 300)
        this.ramas2.create(1750, 500, "ramados").setOrigin(1).setScale(0.2).setSize(100, 40).setOffset(400, 350)


        this.arbol2 = this.add.image(1800, 650, "arbol").setOrigin(1).setScale(0.2)


        this.llave = this.physics.add.image(1130, 100, "llave").setOrigin(1).setScale(0.1).setSize(200, 100).setOffset(8, 50)
        this.llave1 = this.physics.add.image(800, 80, "llave").setOrigin(1).setScale(0.1).setSize(200, 100).setOffset(10, 50)
        this.llave2 = this.physics.add.image(900, 150, "llave").setOrigin(1).setScale(0.1).setSize(200, 100).setOffset(10, 50)
        this.currentScene = this.scene.get(this);
        this.bullets = new Bullets(this.physics.world, this, []);
        const content = ["Para matar al coco debes saltar encima sino el coco te mata",
        "CUIDADO con la mosca...si te toca pierdes vidas pero si le disparas con la barra ESPACIADORA la puedes matar",
        "junta puntos para pasar de nivel, alimentandote con manzanas ,pero tambien tienes", 
        "llaves que te darán 500 puntos cada una.solo puedes pasar de nivel con las manzanas.",
        "Con 1800 puntos pasas de nivel", "VAMOS QUE TUS AMIGOS ESPERAN...!!!"

     ];
        const cuadro=this.add.image(10, 300, 'tv').setOrigin(0).setAlpha(0.6).setScale(1.5) .setScrollFactor(0)
        const text = this.add.text(30, 320, content, { fontFamily: 'Arial', color: '#ffffff', fontSize: 12, wordWrap: { width: 220 } }).setOrigin(0).setScrollFactor(0)

         const timeLine = this.tweens.createTimeline();
         timeLine.add({
         targets:[text, cuadro],
         alpha: 0,
         delay: 25000,
         duration: 3000
        });
    
        timeLine.play();


        this.coco = new Coco({
            scene: this,
            x: 400,
            y: 550,
            setScale: 0.5,
            collideWorldBounds: true,
            velocityX: -10



        });
        this.coco2 = new Coco({
            scene: this,
            x: 800,
            y: 550,
            setScale: 0.5,
            collideWorldBounds: true,
            velocityX: -10


        });
        this.personajedos = new PersonajeDos({
            scene: this,
            x: 100,
            y: 350,
            setScale: 0.5,
            collideWorldBounds: true,


        });
        this.tweens.add({
            targets: [this.coco],
            props: {
                x: { value: 20, duration: 2000, flipX: true },

            },

            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: [this.coco2],
            props: {
                x: { value: 120, duration: 6000, flipX: true },

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

        this.physics.add.collider([this.personajedos, this.coco], this.floor);
        this.physics.add.collider([this.personajedos], this.groupFloor);
        this.physics.add.collider([this.personajedos], this.ramas);
        this.physics.add.overlap([this.coco2, this.coco],this.personajedos,  () => {
            this.personajedos.pierdeVidas();
            this.personajedos.pierdeJuego()


        });
        this.physics.add.collider(this.personajedos, this.coco, () => {

            this.registry.events.emit("points_other")
           


        });

        this.physics.add.overlap(this.bullets, this.mosca, this.bullets.enemyCollision, () => {
            this.registry.events.emit("points_other")

        });
        this.physics.add.overlap(this.personajedos, this.mosca, () => {
            this.personajedos.pierdeVidas();
             this.personajedos.pierdeJuego()
        });

        this.physics.add.overlap(this.itemsManzanas, this.personajedos, () => {
            this.registry.events.emit("points_other")
            this.registry.events.emit('cambioVolcanes')


            this.itemsManzanas.destroyItem();
            // this.comida.play();

        });
        this.physics.add.overlap(this.llave, this.personajedos, () => {
            this.registry.events.emit("super_points")
            this.llave.destroy()
        });
        this.physics.add.overlap(this.llave1, this.personajedos, () => {
            this.registry.events.emit("super_points")
            this.llave1.destroy()
        });
        this.physics.add.overlap(this.llave2, this.personajedos, () => {
            this.registry.events.emit("super_points")
            this.llave2.destroy()

        });




    }

    update(time, delta) {

        if (this.personajedos.y > this.game.config.height) {
           
            this.personajedos.setPosition(10, 100)
            this.personajedos.pierdeVidas()
            this.personajedos.pierdeJuego()
           
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
