import PersonajeDos from '../Player/PersonajeDos.js';
class SalvandoCompas extends Phaser.Scene {
    constructor() {
        super('final');
    }

    init() {
        console.log('final');
        
    }

    create() {
        this.bg = this.add
            .tileSprite(480, 320, 960, 640, 'sel')
            .setScrollFactor(0);
       
        this.cameras.main.setSize(960, 640);
      

        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(0, this.scale.height, 'floor').setOrigin(0, 1);

        this.wall_floor.refresh();

        // Personaje
        this.personajedos = new PersonajeDos({
            scene: this,
            x: 100,
            y: 100,
            setScale: 0.5
        });

        this.physics.add.collider([this.personajedos], this.wall_floor);
        const timeLine = this.tweens.createTimeline();

    }
    update() {
        this.personajedos.update();

        this.cameras.main.scrollX = this.personajedos.x - 400;
        this.cameras.main.scrollY = 0;
        this.bg.tilePositionX = this.personajedos.x;
    }
}

export default SalvandoCompas;
