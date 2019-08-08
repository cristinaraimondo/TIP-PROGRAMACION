class Rocas extends Phaser.GameObjects.Group {
    constructor(Scene, key, cant = 0) {
        const pos = {
            x: 750,
            y: 460
        };
        super(Scene, {
            key: key,
            frame: 'mont',
            repeat: cant - 1,
            setXY: {
                x: pos.x,
                y: pos.y,
                stepY: -96
            }
        });

        this.create(pos.x, this.getLast(true).y - 130, key, 'montpunta');

        this.children.iterate(x => {
            x.setScale(2);

            x.setAlpha(0);
            x.setScrollFactor(0.9);
        });
    }
}
export default Rocas;
