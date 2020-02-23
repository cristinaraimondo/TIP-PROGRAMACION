
class EstadoPersonaje extends Phaser.Scene {
  constructor() {
    super({ key: "EstadoPersonaje" })
  }

  init() {
    console.log("se ha iniciado la escena EstadoPersonaje")
    this.scene.moveUp();

    this.actual_points = 0
    this.actual_life = 5
    this.cantLlave = 0
    this.cristalCollected = 0
    this.plantaCollected = 0

    console.log(this.actual_points)


  }
 

  create() {
    //textos
    this.scoreText = this.add.text(12, 12, `Plantas: ${this.plantaCollected}`, { fontSize: '32px', fill: '#21767f', fontFamily: 'rockwell, symbol' });
    this.scoreText.visible = false
    this.cristalText = this.add.text(12, 40, `Cristales: ${this.cristalCollected}`, { fontSize: '32px', fill: '#21767f', fontFamily: 'rockwell, symbol' });
    this.cristalText.visible = false
    this.winTxt = this.add.text(125, 130, `\n *****  ¡Anda a buscar a EVE...y al helicoptero!  ***** \n `, { fontSize: '30px', fill: '#21767f', fontFamily: 'rockwell, symbol', backgroundColor: 'pink', align: 'center' });
    this.winTxt.visible = false;

    

    var groupLife = this.add.group({
      key: "life",
      repeat: 4,
      setXY: {
        x: 150,
        y: 150,
        stepX: 35
      },
      setScale: {
        x: 2

      }
    });


   

    this.points = this.add.bitmapText(
      this.scale.width - 20, 20, "font",
      Phaser.Utils.String.Pad('0', 6, '0', 1)
    ).setOrigin(1, 0)




    //eventos
    this.registry.events.on("remove_life", () => {
      //this.groupLife.getChildren()[this.groupLife.getChildren().length - 1]
      this.actual_life = groupLife.getChildren().length
      if (this.actual_life >= 1) {
        groupLife.getChildren()[groupLife.getChildren().length - 1].destroy()
      }
      console.log("vidas" + this.actual_life)
      

    })

    this.registry.events.on("game_over", () => {

      this.scene.start("Game_over", { points: this.actual_points })
      this.registry.events.removeAllListeners();
      this.scene.stop(("Anara"))
      this.scene.stop(("Lluvia"))
      this.scene.stop(("Cocos"))
      this.scene.stop(("Textos"))


      this.sound.stopAll()

    })

    this.registry.events.on('update_points', () => {
      this.actual_points += 10;
      this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 6, '0', 1));



      if (this.actual_points >= 500) {

        this.scene.start("Cocos")
        this.registry.events.removeAllListeners();
        this.scene.stop("Anara")
        this.scene.stop("Lluvia")
        this.sound.stopAll()
      
       
        console.log("vidas personaje    " + this.actual_life)
      }

    })
    // referencia a la escena del juego
    this.gameScene = this.scene.get('sobrevolandoVolcan');
    this.gameSceneCoco = this.scene.get("Cocos")



    // eventos desde la escena
    this.registry.events.on('plantaCollected', () => {
      this.scoreText.visible = true

      this.plantaCollected+= 1;
      this.scoreText.setText(`Plantas: ${this.plantaCollected}`);
      console.log('plantaCollected' + this.plantaCollected)

    });

    this.registry.events.on('cristalCollected', () => {

      this.cristalText.visible = true
      this.cristalCollected+= 1;
      this.cristalText.setText(`Cristales: ${this.cristalCollected}`);
    })

    this.registry.events.on('resume', () => {
      if (this.plantaCollected === 5 && this.cristalCollected === 10) {
        this.winTxt.visible = true;

      
   
        this.gameScene = this.scene.pause('sobrevolandoVolcan');
       

        // muestro el texto para buscar a Eve y reinicio el juego
        const timeLine = this.tweens.createTimeline();

        timeLine.add({
          targets: this.gameScene,
          alpha: 0,
          delay: 3000,
          duration: 500,
          onComplete: () => {
            
            this.cameras.main.flash(500);
            this.scene.resume('sobrevolandoVolcan')
            this.winTxt.visible = false
           



          


          }
        });
        timeLine.play();
      }
     

    })

  

    this.registry.events.on("points_other", () => {
      this.actual_points += 50
      console.log("cuanto comio  " + this.actual_points)

      this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 6, '0', 1));

    })
    this.registry.events.on("super_points", () => {
      this.actual_points += 500
      console.log("cuanto comio  " + this.actual_points)

      this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 6, '0', 1));

    })

    this.registry.events.on('cambioVolcanes', () => {//registra el evento de cambio de escena

      if (this.actual_points >= 1800) {
        this.scene.start('Volcanes', { points: this.actual_points, });
        this.scene.stop("Cocos")

        console.log("vidas personaje    " + this.actual_life)
      }

    })
    this.registry.events.on('sobrevolando', () => {//registra el evento y vuelvo a la misma escena

      if (this.actual_life == 0) {

        this.scene.start('sobrevolandoVolcan', { points: this.actual_points, });
        //limpio para que no se acumule
        this.registry.events.removeAllListeners();
        console.log("vidas personaje    " + this.actual_life)
      }

    })
    this.registry.events.on('cambioAvion', () => {//registra el evento y cambia a volandoLava

      if (this.plantaCollected === 5 && this.cristalCollected === 10) {
        this.scene.resume('sobrevolandoVolcan')
       
      }

    })


  
  }
 
  update(time, delta) { }


}
export default EstadoPersonaje;