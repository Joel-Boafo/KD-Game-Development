export default class PowerUp {
  constructor(scene, body) {
    this.scene = scene;
    this.body = body;
    this.body.setVelocityY(100);
    this.body.setAllowGravity(false);
  }
}
