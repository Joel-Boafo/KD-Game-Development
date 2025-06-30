import eventHandler from "../helpers.js";

export default  class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  preload() {}

  create() {
    this.gameOverText = this.add.text(
        this.cameras.main.centerX, 
        this.cameras.main.centerY - 100,
        "Game Over",
        { font: "64px", fill: "#FF0000" }
      ).setOrigin(0.5);

    this.restartText = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Click to restart",
        { font: "32px", fill: "#FFFFFF" }
      ).setOrigin(0.5);

    // Add a tween to fade in and out the restart text
    this.tweens.add({
      targets: this.restartText,
      duration: 800,
      repeat: -1,
      yoyo: true,
      alpha: 0,
    });

    // Restart the game on pointer down
    eventHandler(this, 'GameScene');
  }

  update() {}
}
