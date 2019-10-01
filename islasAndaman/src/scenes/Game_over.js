class Game_over extends Phaser.Scene {

    constructor() {
        super({ key: "Game_over" });
    }
    init(data) {
        console.log("se inicia la scena game_over")
        this.points = 0;

        if (Object.keys(data).length !== 0) {
            this.points = data.points;
        }

    }

    create() {
        this.game_overText = this.add.bitmapText(10, 100, "font", 'SI ESTAS ACA ES PORQUE PERDISTE,\n\nDE TODAS MANERAS PODES VER CUANTOS PUNTOS HICISTE \n\nTENDRAS QUE MEJORAR PARA PODER PASAR DE PANTALLA.\n\nDALEEEEE!!!!...  QUE TUS AMIGOS TE ESPERAN.',

            ''

        )

        const pointsDB = localStorage.getItem('best_points');
        this.betsPoints = (pointsDB !== null) ? pointsDB : 0;


        this.logoMenu = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            'boton'
        ).setScale(0.2).setInteractive();

        this.pointsText = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height - 100,
            'font',
            'PUNTOS ' + this.points
        ).setDepth(2).setOrigin(0.5);

        this.bestPointsText = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height - 80,
            'font',
            'MEJOR  ' + this.betsPoints
        ).setDepth(2).setOrigin(0.5);



        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.logoMenu,
                ease: 'Bounce.easeIn',
                y: -200,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('Anara');
                }
            });

            this.add.tween({
                targets: [this.pointsText, this.bestPointsText],
                ease: 'Bounce.easeIn',
                y: 400,
                duration: 1000
            });
        });

        if (this.points > this.betsPoints) {
            localStorage.setItem('best_points', this.points);
        }
    }



}





export default Game_over;
