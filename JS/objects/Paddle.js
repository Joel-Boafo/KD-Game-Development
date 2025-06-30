export default class Paddle extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, 140, 10, 0xffffff);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.setOrigin(0.5);
    }

    move(direction, speed, minX) {
        direction === "left" ? this.x = Phaser.Math.Clamp(this.x - speed, minX, this.scene.scale.width - minX) : this.x = Phaser.Math.Clamp(this.x + speed, minX, this.scene.scale.width - minX);
    }

    grow(duration = 10000) {
        this.setScale(2, 1);
        this.scene.time.delayedCall(duration, () => {
            this.setScale(1, 1);
        });
    }
}