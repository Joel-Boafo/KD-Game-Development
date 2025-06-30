import PowerUp from "./PowerUp.js";

export default class CloneBall {
  constructor(scene, x, y) {
    this.arc = scene.add.circle(x, y, 10, 0x00ff00);
    scene.physics.add.existing(this.arc);

    new PowerUp(scene, this.arc.body);

    scene.physics.add.collider(scene.paddle, this.arc, () => {
      this.arc.destroy();
      scene.cloneBall();
    });
  }
}
