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
        this.contenedor = this.add.image(200, 100, 'cont').setScale(2);
        this.texto = this.add.text(
            40,
            70,
            'UN AVION CON DESTINO A LA INDIA, SE ESTRELLO EN LAS ISLAS DE ANDAMAN \n SOBREVIVIERON TODOS LOS PASAJEROS PERO SOLO 3 VALIENTES\nEMPRENDIERON LA AVENTURA POR ESTAS ISLAS LLENAS DE PELIGROS,\nEN BUSCA DE UN BARCO QUE FUE LOCALIZADO POR EL RADAR DEL AVIÓN\nY DE ESTA MANERA SALVAR AL RESTO DE LOS PASAJEROS \nEN LA SIGUIENTE PANTALLA ELIGE UN JUGADOR PARA COMENZAR ESTA AVENTURA.',
            { fontSize: 9 }
        );

        this.avion = this.add.image(200, 100, 'avion').setScale(0.3);
        this.boton = this.add.image(400, 550, 'boton').setScale(0.2);

        const container = this.add.container(0, -400);
        container.add([this.contenedor, this.texto]);
        this.add.tween({
            targets: [container],
            // ease: 'Bounce',
            y: 4
        });
        const avion = this.add.container(-10, -50);
        avion.add([this.avion]);
        this.add.tween({
            targets: [avion],
            // ease: 'Bounce',
            y: 410,
            x: 500
        });
        this.input.once(
            'pointerup',
            function() {
                this.scene.start('Selva');
            },
            this
        );
    }

    update(time, delta) {}
}

export default Intro;
