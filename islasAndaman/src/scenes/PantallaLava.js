import Volcan from "../enemigos/Volcan.js"
import Jugador from "../player/Helicoptero.js";


class SobrevolandoVolcan extends Phaser.Scene {
    constructor(){
        super('Avion');
    }
    init(data) {
       
        this.camara = this.cameras.main;
       
         }
    
    create(){
        
        this.gameOptions = {
           // gravedad del avion, hará que el avion se caiga si no clickeas
            avionGravity: 800,
            // velocidad horizontal
            avionSpeed: 125,
            // empuje
            avionEmpuje : 300,
           // altura mínima de la lava, en píxeles. Afecta la posición del espacio para pasar
            minlavaHeight: 200,
            // distancia aleatoria de la proxima lava, en pixels
            lavaDistance: [200, 480],
           // rango de agujeros entre lavas, en píxeles
            agujeroLava: [150, 300],
         
            // local storage object name
            localStorageName: 'bestvolarpyScore'
        };
        this.bg= this.add
        .tileSprite(480, 320, 1960, 640, 'sobrevolandoVol')
        //evento quitar puntos
        this.registry.events.on("restarPuntos", () => {
            if(this.score >=1){this.score--}
             });
        this.bolaFuego = this.physics.add.image(1507, 550, "bolafuego").setScale(0.7).setGravityX(-20).setCircle(5)
        this.volcan = new Volcan({
            scene: this,
            x: 500,
            y: 500,
           setGravityX:-20,
           
            stepX: 800

        });
    
        this.bolaFuego2 = this.physics.add.image(2007, 550, "bolafuego").setScale(0.7).setGravityX(-20)
        this.bolaFuego4 = this.physics.add.image(9007, 550, "bolafuego").setScale(0.7).setGravityX(-10).setAngle(-45)
        this.bolaFuego5 = this.physics.add.image(6507, 550, "bolafuego").setScale(0.7).setGravityX(-10).setAngle(-45)
        this.bolaFuego6 = this.physics.add.image(5007, 550, "bolafuego").setScale(0.7).setGravityX(-10).setAngle(-45)
        this.volcan2 = new Volcan({
            scene: this,
            x: 1000,
            y: 500,
           setGravityX:-20,
            });
        this.bolaFuego3 = this.physics.add.image(2807, 550, "bolafuego").setScale(0.7).setGravityX(-20) .setCircle(5)
        this.volcan3 = new Volcan({
            scene: this,
            x: 2800,
            y: 500,
           setGravityX:-120,
            });
       
          this.group = this.physics.add.group();
          //800 pixeles en 3 segundos
          this.speed = Phaser.Math.GetSpeed(-800, 3)
          this.speed2 = Phaser.Math.GetSpeed(-1200, 3)
          this.volcan.setScrollFactor(0);
          this.lavaGroup = this.physics.add.group();
          this.filaLava = [];
             for(let i = 0; i < 6; i++){
            this.filaLava.push(this.lavaGroup.create(0, 0, 'lavaVertical'));
            this.filaLava.push(this.lavaGroup.create(0, 0, 'lavaVertical2'));
            this.placelavas(false);
        }
         this.lavaGroup.setVelocityX(-this.gameOptions.avionSpeed);
         this.avion= new Jugador({
            scene: this,
            x: 180,
            y: this.game.config.height / 2,
            setScale: 2,
            collideWorldBounds: true,
           


        })
        
        this.avion.setGravityY = this.gameOptions.avionGravity;
        this.input.on('pointerdown', this.volar, this);
        this.score = 0;
        this.topScore = localStorage.getItem(this.gameOptions.localStorageName) == null ? 0 : localStorage.getItem(this.gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);
        //collision
        this.physics.add.overlap([this.bolaFuego,this.bolaFuego2,this.bolaFuego3,this.bolaFuego4,this.bolaFuego5,this.bolaFuego6], this.avion, () => {
           this.avion.pierdePuntos()
             });
      ;
       
     }
    updateScore(inc){
        this.score += inc;
        this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore;
        this.cambioEscena()
    }
    placelavas(addScore){
        let rightmost = this.getRightmostlava();
        let alturaAgujero = Phaser.Math.Between(this.gameOptions.agujeroLava[0], this.gameOptions.agujeroLava[1]);
        let posicionAgujero = Phaser.Math.Between(this.gameOptions.minlavaHeight + alturaAgujero / 2, this.game.config.height - this.gameOptions.minlavaHeight - alturaAgujero / 2);
        this.filaLava[0].x = rightmost + this.filaLava[0].getBounds().width + Phaser.Math.Between(this.gameOptions.lavaDistance[0], this.gameOptions.lavaDistance[1]);
        this.filaLava[0].y = posicionAgujero - alturaAgujero / 2;
        this.filaLava[0].setOrigin(0, 1);
        this.filaLava[1].x = this.filaLava[0].x;
        this.filaLava[1].y = posicionAgujero + alturaAgujero / 2;
        this.filaLava[1].setOrigin(0, 0);
        this.filaLava = [];
        if(addScore){
            this.updateScore(1);
        }
     }
    volar(){
        this.avion.body.velocity.y = -this.gameOptions.avionEmpuje;
    }
    getRightmostlava(){
        let rightmostlava = 0;
        this.lavaGroup.getChildren().forEach(function(lava){
            rightmostlava = Math.max(rightmostlava, lava.x);
        });
        return rightmostlava;
    }
    cambioEscena(){
        if(this.score === 20){
            this.scene.start('final')
        }
    }
    update(time, delta){
        this.avion.update();
        this.bg.tilePositionX = this.avion.x

        this.bolaFuego.y += this.speed * delta;
        if (this.bolaFuego.y < 0) {
            this.bolaFuego.y = 550
        }
        this.bolaFuego2.y += this.speed * delta;
        if (this.bolaFuego2.y < 0) {
            this.bolaFuego2.y = 550
        }
        this.bolaFuego3.y += this.speed * delta;
        if (this.bolaFuego3.y < 0) {
            this.bolaFuego3.y = 550
        }
        this.bolaFuego5.y += this.speed * delta;
        if (this.bolaFuego4.y < 0) {
            this.bolaFuego4.y = 550
        }
        this.bolaFuego5.y += this.speed * delta;
        if (this.bolaFuego5.y < 0) {
            this.bolaFuego5.y = 550
        }
        this.bolaFuego6.y += this.speed * delta;
        if (this.bolaFuego6.y < 0) {
            this.bolaFuego6.y = 550
        }

      Phaser.Actions.RotateAround(this.group.getChildren(), { x: 400, y: 300 }, 0.05);
      ;
      //collisiones
        this.physics.world.collide(this.avion, this.lavaGroup, function(){
            this.die();
        }, null, this);
        if(this.avion.y > this.game.config.height || this.avion.y < 0){
            this.die();
        }
        
        this.lavaGroup.getChildren().forEach(function(lava){
            if(lava.getBounds().right < 0){//si los limites de la lava son menores a 0 agrego otra lava
                this.filaLava.push(lava);
                if(this.filaLava.length == 2){
                    this.placelavas(true);
                }
            }
        }, this)
    }
    die(){
        localStorage.setItem(this.gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.scene.start('Avion');
    }
}


export default SobrevolandoVolcan;
