import Coco from "../enemigos/coco.js"
import PersonajeDos from "../player/PersonajeDos.js"
class Cocodrilos extends Phaser.Scene {
    constructor() {
        super({ key: 'Cocos' });
    }

    init() {
        console.log("se ha iniciado la escena cocos")
        this.scene.launch("Vidas")
        this.points = 0;
        this.camara = this.cameras.main;
    }



    create() {
        this.floor = this.physics.add.staticGroup();
        this.floor.create(100, 600, 'floorCocos').setOrigin(0).setScale(2)
        this.boton = this.add.tileSprite(480, 320, 960, 420, 'pantano').setScale(1.5)
            .setScrollFactor(0)

        this.currentScene = this.scene.get(this);


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





    }

    update(time, delta) {
        this.personajedos.update();
        this.cameras.main.scrollX = this.coco.x - 400,
            this.boton.tilePositionX = this.coco.x, this.personajedos.x;




    }
}

export default Cocodrilos;
