import eventHandler from "../helpers.js";

export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    preload() {

    }

    create() {
        this.victoryText = this.add.text(this.cameras.main.centerX - 150, this.cameras.main.centerY - 100, 'You Win!', {
            font: '64px',
            fill: '#00FF00',
        });

        this.restartText = this.add.text(this.cameras.main.centerX - 150, this.cameras.main.centerY, 'Click to restart', {
            font: '32px', 
            fill: '#FFFFFF',
        });

        this.restartText = this.tweens.add({
            targets: this.restartText,
            duration: 800,
            repeat: -1,
            yoyo: true,
            alpha: 0,
        });

        eventHandler(this, 'GameScene');
    }

    update() {

    }
}