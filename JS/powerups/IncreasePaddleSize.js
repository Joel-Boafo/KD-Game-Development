import PowerUp from "./PowerUp.js";

export default class IncreasePaddleSize {
  constructor(scene, x, y) {
    this.rectangle = scene.add.rectangle(x, y, 50, 10, 0x00ff00);
    scene.physics.add.existing(this.rectangle);
    
    new PowerUp(scene, this.rectangle.body);

    scene.physics.add.collider(scene.paddle, this.rectangle, () => {
      this.rectangle.destroy();
      scene.increasePaddleSize();
    });
  }
}
