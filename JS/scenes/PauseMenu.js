import eventHandler from "../helpers.js";

export default class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    preload() {

    }

    create() {
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Paused', {
            fontSize: '64px',
            fill: '#FFFFFF',
        }).setOrigin(0.5);

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