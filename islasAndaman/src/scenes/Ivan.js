class Ivan extends Phaser.Scene {
    constructor() {
        super('Ivan');
        this.moreno;
    }

    preload() {
        console.log('Scene: Ivan');
    }

    create() {
        this.moreno = this.add.sprite(200, 500, 'moreno', 1).setScale(2);
        // this.cursor = this.scene.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        // if (this.cursor.left.isDown) {
        //     this.scene.sleep('Anara');
        //     this.scene.sleep('Kelen');
        // } else {
        //     this.scene.launch('Anara');
        //     this.scene.launch('Ivan');
        //     this.scene.launch('Kelen');
        // }
    }
}
export default Ivan;
