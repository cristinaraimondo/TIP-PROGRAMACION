class Vidas extends Phaser.Scene {
  constructor() {
    super({ key: "Vidas" })
  }

  init() {
    console.log("se ha iniciado la escena vidas")
    this.actual_points = 0;
    console.log(this.actual_points)

  }
  create() {

    this.groupLife = this.add.group({
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
      this.scale.width - 40, 20, "font",
      Phaser.Utils.String.Pad("0", 6, "0", 1)).setOrigin(1, 0)

    //eventos
    this.registry.events.on("remove_life", () => {
      this.groupLife.getChildren()[this.groupLife.getChildren().length - 1].destroy();

    })
    this.registry.events.on("game_over", () => {
      this.registry.events.removeAllListeners();
      this.scene.start("Game_over", { points: this.actual_points })
      this.scene.stop(("Anara"))
      this.scene.stop(("Lluvia"))

    })

    this.registry.events.on("update_points", () => {

      this.actual_points += 10;
      console.log("cuanto comio  " + this.actual_points)

      this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 6, "0", 1))
      if (this.actual_points === 150) {

        this.scene.start("Cocos")
        this.scene.stop("Anara")
        this.scene.stop("Lluvia")


      }
    })


  }
  update() {


  }

}
export default Vidas;