import PersonajesinGrav from '../Player/PersonajesinGrav.js';
class SalvandoCompas extends Phaser.Scene {
    constructor() {
        super('final');
    }

    init() {
        console.log('final');
        
    }
    preload(){
        this.load.image("playa", "assets/playa11.png");
        this.load.image("playa2", "assets/selsel81.png");
    }

    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600,'playa2')
            .setScrollFactor(0);
       
        
            this.cursors = this.input.keyboard.createCursorKeys();

        
        // Personaje
       
        this.personajen= new PersonajesinGrav({
            scene: this,
            x: 180,
            y: this.game.config.height / 2,
            setScale:3,
            collideWorldBounds: true,
            })
            this.personajen.setScale(2)
        

    }
    update() {
        this.personajen.update()
        this.personajen.update(this.cursors);
       
        this.cameras.main.scrollX = this.personajen.x - 100;
        this.bg.tilePositionX = this.personajen.x;
        
        
    }
}

export default SalvandoCompas;
