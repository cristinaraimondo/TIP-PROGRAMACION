class Intro extends Phaser.Scene {
    constructor() {
        super({ key: 'Intro' });
    }

    init() {
        console.log('Scene: Intro');
    }

    create() {
        this.fondo = this.add.image(100, 200, 'fondo');
        // const fuenteConfig=this.cache.json.get('font_json');
        // this.cache.bitmapFont.add('nombreFuente', Phaser.GameObjects.RetroFont.Parse(this, fuenteConfig))
        //  this.texto=this.add.bitmapText(100, 150, 'nombreFuente', 'UN AVION CON DESTINO A LA INDIA, SE ESTRELLO EN LAS ISLAS DE ANDAMAN',9)

        // this.marron = this.add.sprite(500, 500, 'marron', 1).setScale(2);
        // this.marron.anims.play('frente');

        this.contenedor = this.add.image(200, 100, 'cont').setScale(2);
        this.texto = this.add.text(
            40,
            70,
            'UN AVION CON DESTINO A LA INDIA, SE ESTRELLO EN LAS ISLAS DE ANDAMAN \n SOBREVIVIERON TODOS LOS PASAJEROS PERO SOLO 3 VALIENTES\nEMPRENDIERON LA AVENTURA POR ESTAS ISLAS LLENAS DE PELIGROS,\nEN BUSCA DE UN BARCO QUE FUE LOCALIZADO POR EL RADAR DEL AVIÓN\nY DE ESTA MANERA SALVAR AL RESTO DE LOS PASAJEROS \nEN LA SIGUIENTE PANTALLA ELIGE UN JUGADOR PARA COMENZAR ESTA AVENTURA.',
            { fontSize: 9 }
        );

        this.avion = this.add.image(200, 100, 'avion').setScale(0.3);

        const container = this.add.container(0, -400);
        container.add([this.contenedor, this.texto]);
        this.add.tween({
            targets: [container],
            y: 4
        });
        const avion = this.add.container(-10, -50);
        avion.add([this.avion]);
        this.add.tween({
            targets: [avion],
            alpha: 0,
            y: 410,
            x: 500
        });
        this.boton = this.add
            .image(400, 550, 'boton')
            .setScale(0.3)
            .setInteractive();
        this.boton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.boton,
                //ease: 'Bounce.easeIn',
                y: -200,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('Selva');
                }
            });
        });

        const pressButton = this.add
            .dynamicBitmapText(400, 500, 'font', 'PRESIONA EL BOTON', 8)
            .setOrigin(0.5);

        this.add.tween({
            targets: pressButton,
            alpha: 0,
            ease: x => (x < 0.5 ? 0 : 1),
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    update(time, delta) {}
}

export default Intro;
