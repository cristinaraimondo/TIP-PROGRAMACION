class TextRoll extends Phaser.Scene {
    constructor() {
        super({ key: 'textroll' });
     }
   
     preload (){
    this.load.image('tv', 'assets/tv.png');
      }

     create ()
{
    const content = ["En esta escena deberás tener cuidado con los pájaros",
    "que te quitan vida.Cada vez que comes un item azul nacen huevos que",
    "te atacan. con las MANZANAS sumas puntos pero no puedes pasar de nivel",
    "solo lo logras con los AZULES. Cuando consigas 500 puntos podrás pasar de ",
    "nivel y estarás mucho mas cerca.de tus amigos. Que nada te desaliente...",
    "Avanza y vence todos los peligros"

     ];

   const cuadro=this.add.image(10, 300, 'tv').setOrigin(0).setAlpha(0.6)

    var graphics = this.make.graphics();

    // graphics.fillStyle(0xffffff);
    graphics.fillRect(30, 300, 300, 150);

    var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    const text = this.add.text(30, 320, content, { fontFamily: 'Arial', color: '#ffffff', fontSize: 12, wordWrap: { width: 140 } }).setOrigin(0)
          

    text.setMask(mask);

    //  The rectangle they can 'drag' within
    var zone = this.add.zone(30, 300, 200, 100).setOrigin(0).setInteractive();

    zone.on('pointermove', function (pointer) {

        if (pointer.isDown)
        {
            text.y += (pointer.velocity.y / 10);

            text.y = Phaser.Math.Clamp(text.y, -400, 500);
        }

    });

    const timeLine = this.tweens.createTimeline();

timeLine.add({
    targets:[text, cuadro,],
    alpha: 0,
    delay: 20000,
    duration: 3000
    
});

timeLine.play();

}



}

export default TextRoll;