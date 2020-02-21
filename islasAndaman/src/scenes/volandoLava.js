export default class VolandoLava extends Phaser.Scene {
    constructor() {
        super({
            key: 'escena'
        });
    }
    preload() {
        
        this.load.image('fondo', 'assets/volvol.png');
        this.load.spritesheet('heroe', 'assets/volar_PP3/volar.png', {
            frameWidth: 56,
            frameHeight: 34
        });
        this.load.image('pipe0', 'assets/volcanon.png');
        this.load.image('pipeAbajo0', 'assets/volcanon.png');
        this.load.image('pipeArriba0', 'assets/volcanon.png');

        this.load.image('pipe1', 'assets/volcanon.png');
        this.load.image('pipeAbajo1', 'assets/volcanon.png');
        this.load.image('pipeArriba1','assets/volcanon.png');

    }

create() {
    this.bg = this.add.tileSprite(480, 320, 960, 640, 'sobrevolandoVol').setScrollFactor(0);
    this.player = this.physics.add.sprite(50, 200, 'heroe');
    this.player.setGravityY(300)
    this.player.setScale(1.5)
    this.player.setSize(16,16)
    this.player.setOffset(10,10)

  

    this.input.keyboard.on('keydown',  (event) =>{
        if (event.keyCode === 32) {
            this.saltar();
        }
    });

    this.input.on('pointerdown', () => this.saltar());

    this.time.delayedCall(1000, this.nuevaColumna, [], this);
    this.player.on('animationcomplete', this.animationComplete, this);

    this.physics.world.setBoundsCollision(true);

    this.physics.world.on('worldbounds', (body) => {
        this.scene.start('escena');
    });

    this.player.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
};

saltar() {
    this.player.setVelocityY(-200);
    
}

animationComplete(animation, frame, sprite) {
    if (animation.key === 'saltar') {
       
    }
}

nuevaColumna() {
    console.log('nueva columna');
    const columna = this.physics.add.group();

    const hueco = Math.floor(Math.random(1) * 5) + 1;

    const aleatorio = Math.floor(Math.random() * 2);

    for (let i = 0; i < 8; i++) {

        //El agujero son cuatro casillas
        if (i !== hueco && i !== hueco + 1 && i !== hueco - 1) {
            let cubo;
            if (i == hueco - 2) {
                cubo = columna.create(960, i * 100, `pipeArriba${aleatorio}`);
            } else if (i == hueco + 2) {
                cubo = columna.create(960, i * 100, `pipeAbajo${aleatorio}`);
            } else {
                cubo = columna.create(960, i * 100, `pipe${aleatorio}`);
            }
            cubo.body.allowGravity = false;
        }
    }
    columna.setVelocityX(-200);
    columna.checkWorldBounds = true;
    columna.outOfBoundsKill = true;
    this.time.delayedCall(1500, this.nuevaColumna, [], this);
    this.physics.add.overlap(this.player, columna, this.hitColumna, null, this);
}

hitColumna() {
    this.scene.start('escena');
}

update(time){
    this.bg.tilePositionX = time*0.1;
}
}
