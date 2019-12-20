class Textos extends Phaser.Scene {
    constructor() {
        super({ key: "Textos" })
    }
    init() {
        this.scene.moveUp();
    }

    create() {
        this.textConsejo = this.add.text(500, 100, "Recoger:\n\ncristales: 10\n\nplantas de vida: 5\n\ncuando tengas todo\n\npodrás subirte al avión");
    }




}
export default Textos