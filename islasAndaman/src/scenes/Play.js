import Personaje from '../Player/Personaje.js';
class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
    }
    init() {
        console.log('Se ha iniciado la escena Play');
    }
    create() {
        this.add.image(0, 0, 'sel').setOrigin(0);
        this.wall_floor = this.physics.add.staticGroup();
        this.wall_floor.create(0, this.scale.height, 'floor').setOrigin(0, 1);
        this.wall_floor.refresh();
        this.wall_floor.getChildren()[2].setOffset(0, 15);
        // Personaje
        this.personaje = new Personaje({
            scene: this,
            x: 100,
            y: 100
        });
        this.physics.add.collider([this.personaje], this.wall_floor);
    }
    update() {
        this.personaje.update();
    }
}

export default Play;
