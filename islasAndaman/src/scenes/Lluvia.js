class Lluvia extends Phaser.Scene {
    constructor() {
        super('Lluvia');
    }

    init() {
        console.log('Se ha iniciado la escena lluvia');
        this.camara = this.cameras.main;

    }

    create() {
        (this.audioAvion = this.sound.add('thunder', {
            loop: false
        })),
            (this.audioLluvia = this.sound.add('lalluvia', {
                loop: false
            }));
        const scenesArray = { scenes: ["Lluvia"] }

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
        const timeLine = this.tweens.createTimeline();

        timeLine.add({
            targets: scenesArray,
            alpha: 0,
            paused: true,
            delay: 2000,


            onComplete: () => {
                this.cameras.main.flash(500);
                // this.audioAvion.play();
                // this.audioLluvia.play();
            }
        });
        timeLine.play();







    }


    update(time, delta) {

    }
}

export default Lluvia;
