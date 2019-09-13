class Lluvia extends Phaser.Scene {
    constructor() {
        super('Lluvia');
    }

    init() {
        console.log('Se ha iniciado la escena Play');
    }

    create() {

        for (var i = 0; i < 2; i++) {
            var lluvia = this.add.particles('lluvia', [
                {
                    frame: 'lluvia',
                    x: 60,
                    y: -200,
                    angle: { min: 90, max: 20 },
                    speed: 500,
                    gravityY: 350,
                    lifespan: 30000,
                    quantity: 3,
                    delay: 3000,
                    completeDelay: 800,
                    scale: { min: 0.5, max: 0.2 }
                },
                {
                    frame: 'lluvia',
                    x: 300,
                    y: -200,
                    ease: 'Linear',
                    angle: { min: 90, max: 20 },
                    speed: 700,
                    gravityY: 350,
                    lifespan: 3000,
                    quantity: 3,
                    delay: 3000,

                    scale: { min: 0.5, max: 0.2 }
                }
            ]);
        }


        this.physics.add.collider([this.lluvia], this.wall_floor);


    }


    update(time, delta) {

    }
}

export default Lluvia;
