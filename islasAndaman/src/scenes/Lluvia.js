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
            loop: false,
            volume: 0.1
        })),
            (this.audioLluvia = this.sound.add('lalluvia', {
                loop: true,
                volume: 0.2
            }));
        const scenesArray = { scenes: ["Lluvia"] }

        for (var i = 0; i < 2; i++) {
            this.lluvia = this.add.particles('lluvia', [
                {
                    frame: 'lluvia',
                    x: 60,
                    y: -200,
                    angle: { min: 90, max: 20 },
                    speed: 500,
                    gravityY: 350,
                    lifespan: 30000,
                    quantity: 2,
                    delay: 1000,
                    duration: 2000,
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
                    quantity: 1,
                    delay: 3000,

                    scale: { min: 0.5, max: 0.2 }
                }
            ]);
        }

        const timeLine = this.tweens.createTimeline();

        timeLine.add({
            targets: [scenesArray],
            paused: true,


            onComplete: () => {
                this.cameras.main.flash(500);
                this.audioAvion.play()
                this.audioLluvia.play()

            }
        });
        timeLine.play();







    }


    update(time, delta) {

    }
}

export default Lluvia;
