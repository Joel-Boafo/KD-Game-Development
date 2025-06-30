import eventHandler, { getLogo } from "../helpers.js";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        getLogo(this);
    }

    create() {

        this.titleText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'Brick Breaker', {
            fontSize: '64px',
            fill: '#FFF',
        }).setOrigin(0.5);

        this.logo = this.add.image(this.cameras.main.centerX + 300, this.cameras.main.centerY - 95, 'Logo');
        this.logo.setScale(0.05);

        this.startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Click to Start', {
            fontSize: '32px',
            fill: '#FFF'
        }).setOrigin(0.5);

        this.startText = this.tweens.add({
            targets: this.startText,
            duration: 800,
            repeat: -1,
            yoyo: true,
            alpha: 0,
        })

        eventHandler(this, 'GameScene');
    }

    update() {

    }
}