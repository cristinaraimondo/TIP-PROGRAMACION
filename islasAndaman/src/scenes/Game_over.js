class Game_over extends Phaser.Scene {

    constructor() {
        super({ key: 'finScene' });
    }
    preload() {
        this.load.image('fin', 'img/fin-bueno.jpg');
    }

    create() {
        this.add.image(480, 320, 'fin');
    }
}





export default Game_over;
