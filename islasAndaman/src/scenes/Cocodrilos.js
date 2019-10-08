import Coco from "../enemigos/coco.js"
import PersonajeDos from "../player/PersonajeDos.js"
class Cocodrilos extends Phaser.Scene {
    constructor() {
        super({ key: 'Cocos' });
    }

    init(data) {
        console.log("se ha iniciado la escena cocos")
        this.scene.launch("EstadoPersonaje")

        this.camara = this.cameras.main;
        this.life = 5

        if (Object.keys(data).length !== 0) {
            this.life = data.life;
        }
    }



    create() {

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

        this.physics.add.collider([this.personajedos], this.floor);
        this.physics.add.collider([this.personajedos], this.groupFloor);





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
