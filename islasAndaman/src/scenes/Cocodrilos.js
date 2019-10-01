class Cocodrilos extends Phaser.Scene {
    constructor() {
        super({ key: 'Cocos' });
    }

    init() {
        this.scene.launch("Vidas")
        this.points = 0;
    }



    create() {
        this.boton = this.add.image(400, 300, 'pelota').setScale(1);

        this.currentScene = this.scene.get(this);
        this.coco = this.add.sprite(400, 500, 'coco', 1).setScale(2);
        //this.anims.play("caminamecoco")


    }

    update(time, delta) {

    }
}

export default Cocodrilos;
