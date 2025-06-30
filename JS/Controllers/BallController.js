import Ball from "../objects/Ball.js";

export default class BallController {
    constructor(scene, paddle, lava, bricksGroup, onBrickHit) {
        this.scene = scene;
        this.paddle = paddle;
        this.lava = lava;
        this.bricksGroup = bricksGroup;
        this.onBrickHit = onBrickHit;

        this.balls = [];

        this.spawnInitalBall();
    }

    spawnInitalBall() {
        const x = this.scene.scale.width / 2;
        const y = this.scene.scale.height * 0.8;

        const ball = new Ball(this.scene, x, y);
        this.addBall(ball);
    }

    addBall(ball) {
        this.balls.push(ball);

        this.scene.physics.add.collider(this.paddle, ball, this.scene.bounceOffPaddle, null, this.scene);
        
        this.scene.physics.add.collider(ball, this.lava, () => {
            this.handleHitLava(ball);
        }, null, this);

        this.scene.physics.add.collider(ball, this.bricksGroup, this.onBrickHit, null, this.scene);
    }

    cloneBall() {
        const latestBall = this.balls[this.balls.length - 1];
        const newBall = latestBall.clone(this.scene);
        this.addBall(newBall);
    }

    handleHitLava(ball) {
        if (this.balls.length > 1) {
            this.removeBall(ball);

            if (ball === this.scene.ball) {
                const newMain = this.balls[0];
                this.setMainBall(newMain);
            }
        } else {
            this.scene.lives--;
            this.scene.isAttachedToPaddle = true;
            this.scene.uiController.updateLives(this.scene.lives);

            if (this.balls.length === 1) {
                this.setMainBall(this.balls[0]);
            }
        }
    }

    getBalls() {
        return this.balls;
    }

    removeBall(ball) {
        ball.destroy();
        this.balls = this.balls.filter((b) => b !== ball);
    }

    setMainBall(ball) {
        this.scene.ball = ball;
    }
}