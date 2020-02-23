import PersonajeDos from '../player/PersonajePrincipal.js';
class Volcanes extends Phaser.Scene {
    constructor() {
        super({ key: 'Volcanes' });
    }


    preload() {
        this.load.image("ground", "assets/volcanon.png");
        this.load.image("fondo", "assets/fondo.png");

    }
    create() {
        this.backg = this.add.image(0, 0, "fondo").setOrigin(0, 0).setScale(1.01)

        this.gameOptions = {
            bounceHeight: 300,// altura de rebote
            personajeGravity: 1200,// gravedad personaje
            personajePosition: 0.2, // posicion personaje
            platformSpeed: 650, // velocidad de la plataforma cuando hago el click
            platformDistanceRange: [250, 450], // rango de  distancia entre las plataformas
            platformHeightRange: [-50, 50], //rango de altura de las plataformas
            platformLengthRange: [100, 200], // rango de largo de las plataformas
            localStorageName: "bestballscore3",

        }
        this.play = new PersonajeDos({
            scene: this,
            x: 100,
            y: 100,
            setScale: 0.5,
            collideWorldBounds: true

        });


        this.platformGroup = this.physics.add.group();
        this.play.body.gravity.y = this.gameOptions.personajeGravity;

        this.play.body.setBounce(1);
        this.play.body.checkCollision.down = true;

        this.play.body.checkCollision.up = false;

        this.play.body.checkCollision.left = false;

        this.play.body.checkCollision.right = false;

        this.play.setSize(30, 50, true)
        let platformX = this.play.x


        for (let i = 0; i < 10; i++) {
            let platform = this.platformGroup.create(platformX, this.game.config.height / 4 * 3 + Phaser.Math.Between(this.gameOptions.platformHeightRange[0], this.gameOptions.platformHeightRange[1]), "ground");
            platform.setOrigin(0.5, 1);
            platform.setImmovable(true);
            platform.displayWidth = Phaser.Math.Between(this.gameOptions.platformLengthRange[0], this.gameOptions.platformLengthRange[1]);
            platformX += Phaser.Math.Between(this.gameOptions.platformDistanceRange[0], this.gameOptions.platformDistanceRange[1]);

        }

        this.input.on("pointerdown", this.movePlatforms, this);
        this.input.on("pointerup", this.stopPlatforms, this);
        this.score = 0;
        this.topScore = localStorage.getItem(this.gameOptions.localStorageName) == null ? 0 : localStorage.getItem(this.gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, "");
        this.textConsejo = this.add.text(480, 20, "si superas el mejor puntaje\n\npodes pasar a la siguiente\n\npantalla, allì podras recoger\n\nel avión y tendras una\n\nagradable compañìa\n\nUtiliza el click del mouse para\n\nsaltar de una plataforma a otra. ");
        this.updateScore(this.score);




    }
    updateScore(inc) {
        this.score += inc;
        this.scoreText.text = "Puntos: " + this.score + "\nMejor puntaje: " + this.topScore;
        if (this.score > 15) {


            this.scene.sleep('Volcanes')
            this.scene.start('sobrevolandoVolcan', { points: this.actual_points, });

        }
    }
    movePlatforms() {
        this.platformGroup.setVelocityX(-this.gameOptions.platformSpeed);

    }
    stopPlatforms() {
        this.platformGroup.setVelocityX(0);
    }
    getRightmostPlatform() {
        let rightmostPlatform = 0;
        this.platformGroup.getChildren().forEach(function (platform) {
            rightmostPlatform = Math.max(rightmostPlatform, platform.x);
        });
        return rightmostPlatform;



    }
    update() {
        this.physics.world.collide(this.platformGroup, this.play);
        this.physics.world.collide(this.platformGroup, this.play2);
        this.platformGroup.getChildren().forEach(function (platform) {
            if (platform.getBounds().right < 0) {
                this.updateScore(1);
                platform.x = this.getRightmostPlatform() + Phaser.Math.Between(this.gameOptions.platformDistanceRange[0], this.gameOptions.platformDistanceRange[1]);
                platform.displayWidth = Phaser.Math.Between(this.gameOptions.platformLengthRange[0], this.gameOptions.platformLengthRange[1]);
            }
        }, this);
        if (this.play.y > this.game.config.height) {
            localStorage.setItem(this.gameOptions.localStorageName, Math.max(this.score, this.topScore));
            this.scene.start('Volcanes');
        }
    }
}

export default Volcanes;
