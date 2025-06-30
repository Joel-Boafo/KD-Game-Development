export default class UIController {
  constructor(scene, initalScore = 0, InitalLives = 3) {
    this.scene = scene;
    this.score = initalScore;
    this.lives = InitalLives;

    this.scoreText = scene.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: "32px",
      fill: "#FFF",
    });

    this.livesText = this.scene.add.text(
        this.scene.scale.width - 200,
        16,
        `Lives: ${this.lives}`,
        { fontSize: "32px", fill: "#FFF" }
    );
  }

  updateScore(newScore) {
    this.score = newScore;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  updateLives(newLives) {
    this.lives = newLives;
    this.livesText.setText(`Lives: ${this.lives}`);
  }

  resize(width) {
    this.livesText.setPosition(width - 200, 16);
    this.scoreText.setPosition(16, 16);
  }

  getScore() {
    return this.score;
  }

  getLives() {
    return this.lives;
  }
}
