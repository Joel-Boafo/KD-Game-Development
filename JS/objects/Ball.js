export default class Ball extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius = 10, color = 0xffffff) {
        super(scene, x, y, radius, 0, 360, false, color);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1, 1);
        this.body.setVelocity(250, 250);
    }

    clone(scene) {
        const newBall = new Ball(scene, this.x, this.y);
        newBall.body.setVelocity(Phaser.Math.Between(-200, 200), -300);
        return newBall;
    }
}