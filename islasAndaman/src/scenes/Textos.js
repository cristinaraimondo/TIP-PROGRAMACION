class Textos extends Phaser.Scene {
    constructor() {
        super({ key: "Textos" })
    }
    init() {
        this.scene.moveUp();
    }

    create() {
        this.textConsejo = this.add.text(500, 100, "Recoger:\n\ncristales: 10\n\nplantas de vida: 5\n\ncuando tengas todo\n\npodrás subirte al avión");

        this.textCocos = this.add.text(350, 100, "matar al coco:saltando encima,\n\n  sino te mata a vos\n\nmatar moscas:con la barra dispara\n\npuntos de las llaves: 500 cada una\n\npara pasar el nivel\n\ndebes reunir 1800 puntos\n\nsolo pasas si comes manzanas")


        this.registry.events.on("mostrarTexto", () => {

            this.textCocos.visible = true

        })
        this.registry.events.on("mostrarTextoSobrevol", () => {

            this.textConsejo.visible = true

        })


    }
}
export default Textos