class Vidas extends Phaser.Scene {
  constructor() {
    super({ key: "Vidas" })
  }

  init() {
    console.log("se ha iniciado la escena vidas")
    //this.scene.moveUp();

  }
  create() {

    this.groupLife = this.add.group({
      key: "life",
      repeat: 2,
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
      this.scale.width - 40, 20, "font", Phaser.Utils.String.Pad("0", 6, "0", 1)).setOrigin(1, 0)

    //eventos
    this.registry.events.on("remove_life", () => {
      this.groupLife.getChildren()[this.groupLife.getChildren().length - 1].destroy();

    })



  }
  update() {

  }

}
export default Vidas;