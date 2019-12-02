class MoscaMala extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'mosca');

        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.physics.add.collider(this, this.scene.collisionLayer);

        this.setScale(2);
        this.body.setSize(15, 15);
        this.body.setOffset(0.5, 0.5);
        this.body.setBounce(0.2);

        //this.body.setGravityY(400)
        this.body.setVelocityX(-10)



        // this.anims.play("volar")


        this.hitDelay = false;



    }


    update() {


    }


}

export default MoscaMala
