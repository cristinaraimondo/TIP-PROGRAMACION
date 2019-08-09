import PersonajeDos from '../Player/PersonajeDos.js';
class Anara extends Phaser.Scene {
    constructor() {
        super('Anara');
    }

    init() {
        console.log('Anara');
    }

    create() {
        this.add.image(0, 0, 'sel').setOrigin(0);

        this.wall_floor = this.physics.add.staticGroup();

        //this.wall_floor.create(0, 500, 'floor').setOrigin(0, 0);
        this.wall_floor.create(0, this.scale.height, 'floor').setOrigin(0, 1);

        this.wall_floor.refresh();
        //this.wall_floor.refresh();

        // Personaje
        this.personajedos = new PersonajeDos({
            scene: this,
            x: 100,
            y: 100
        });

        this.physics.add.collider([this.personajedos], this.wall_floor);
    }

    update() {
        this.personajedos.update();
    }
}

export default Anara;
