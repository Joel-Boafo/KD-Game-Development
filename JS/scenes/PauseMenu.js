import eventHandler, { getLogo } from "../helpers.js";

export default class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    preload() {
        getLogo(this);
    }

    create() {
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Paused', {
            fontSize: '64px',
            fill: '#FFFFFF',
        }).setOrigin(0.5);

        this.logo = this.add.image(this.cameras.main.centerX + 300, this.cameras.main.centerY, 'Logo');
        this.logo.setScale(0.05);

        this.input.keyboard.on('keydown', (e) => {
            if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.P) {
                this.scene.resume('GameScene');
                this.scene.stop();
            }
        });

        eventHandler(this, 'GameScene', true);
    }

    update() {

    }
}