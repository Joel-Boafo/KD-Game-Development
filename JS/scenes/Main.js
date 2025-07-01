import Paddle from "../objects/Paddle.js";
import BrickController from "../Controllers/BrickController.js";
import CloneBall from "../powerups/CloneBall.js";
import IncreasePaddleSize from "../powerups/IncreasePaddleSize.js";
import BallController from "../Controllers/BallController.js";
import { LEVELS, POWER_UP_TYPES } from "../constants.js";
import UIController from "../Controllers/UIController.js";
import { dropRandomPowerUp } from "../helpers.js";
import AudioController from "../Controllers/AudioController.js";

// Define the main game scene class
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.audioController = new AudioController(this);
  }

  preload() {
    this.audioController.config();
  }

  create() {
    // Initialize variables
    this.paddle;
    this.balls = [];
    this.lava;
    this.lives = 3;
    this.score = 0;
    this.levelIndex = 0;
    this.liveText;
    this.scoreText;
    this.bestEducationText;
    this.isFullScreen = false;
    this.isAttachedToPaddle = true;
    this.levels = LEVELS;

    this.bricksInfo = {
      width: 50,
      height: 50,
      count: {
        row: 4,
        col: 20,
      },
      offset: {
        top: 90,
        left: 500,
      },
      padding: 10,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: "gameContainer",
      },
    };
    this.PowerUpTypes = POWER_UP_TYPES;

    this.bricksCount = this.bricksInfo.count.row * this.bricksInfo.count.col;

    // Creation
    this.paddle = new Paddle(this, 400, 570);

    this.audioController.init();

    this.lava = this.add.rectangle(
      0,
      this.sys.game.config.height - 10,
      this.sys.game.config.width * 4.5,
      10,
      "#FF0000"
    );

    this.brickController = new BrickController(
      this,
      this.levels[this.levelIndex],
      this.bricksInfo,
      this.balls,
      this.ballBrickCollision
    );

    this.ballController = new BallController(
      this,
      this.paddle,
      this.lava,
      this.brickController.getGroup(),
      this.ballBrickCollision
    );
    this.balls = this.ballController.getBalls();
    this.ball = this.balls[0];
    this.uiController = new UIController(this, this.score, this.lives);

    // Applied physics
    this.physics.add.existing(this.ball);
    this.physics.add.existing(this.paddle);
    this.physics.add.existing(this.lava);

    // Ball speed
    this.ball.body.velocity.x = 250;
    this.ball.body.velocity.y = 250;

    // Ball collision (bounce against walls)
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.y = 1;
    this.ball.body.bounce.x = 1;

    // Prevent from going off-screen
    this.paddle.body.immovable = true;
    this.lava.body.immovable = true;

    // Make collision between the paddle and the ball possible with a callback
    this.physics.add.collider(
      this.paddle,
      this.ball,
      this.bounceOffPaddle,
      null,
      this
    );

    // Match the position of the mouse with the center of the paddle
    // Paddle movement with the mouse pointer
    this.paddleSpeed = 8;

    // Create a cursor keys object to handle keyboard input for left and right arrows
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown", (e) => {
      if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.P) {
        this.scene.pause();
        this.scene.launch("PauseMenu");
      }
    });

    this.input.keyboard.on("keydown", (e) => {
      if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.F) {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        } else {
          this.scale.startFullscreen();
        }
      }
    });

    this.scale.on(
      "resize",
      (gameSize) => {
        const width = gameSize.width;
        const height = gameSize.height;

        // Update text positions
        this.uiController.resize(width);

        // Ensure the game is not in GameOverScene to avoid updating bounds there
        if (this.scene.isActive("GameOverScene")) {
          return;
        }

        // Update the lava position and size only if it's a valid physics body
        if (this.lava && this.lava.body) {
          this.lava.setPosition(0, height - 10); // Lava at the bottom of the screen
          this.lava.setSize(width, 10); // Lava should span the full width of the screen
        }

        // Update the world bounds only if it's safe to do so
        if (this.physics && this.physics.world) {
          this.physics.world.setBounds(0, 0, width, height); // Update the world bounds
        }

        // Make sure the ball is still colliding with the world bounds
        if (this.ball && this.ball.body) {
          this.ball.body.collideWorldBounds = true;
        }
      },
      this
    );
  }

  update() {
    if (this.lives === 0) {
      this.audioController.play('gameOver');
      // Stop physics and switch to GameOverScene
      this.physics.pause();
      this.scene.start("GameOverScene");
    }

    if (this.brickController.getBricksCount() === 0) {
      this.levelIndex++;
      if (this.levelIndex < this.levels.length) {
        this.brickController.resetLevel(
          this.levels[this.levelIndex],
          this.balls
        );
        this.isAttachedToPaddle = true;
        this.ball.setPosition(
          this.paddle.x,
          this.paddle.y - this.paddle.height * 1.1
        );
        this.ball.body.setVelocity(0, 0); // Reset ball velocity until spacebar is pressed
      } else {
        this.physics.pause();
        this.audioController.play('victory');
        this.scene.start("VictoryScene");
      }
    }

    if (this.isAttachedToPaddle) {
      this.ball.x = this.paddle.x;
      this.ball.y = this.paddle.y - this.paddle.height * 1.1;
    }

    // Move paddle left
    if (this.cursors.left.isDown) {
      this.paddle.move("left", this.paddleSpeed, this.paddle.width / 2);
    }

    // Move paddle right
    if (this.cursors.right.isDown) {
      this.paddle.move("right", this.paddleSpeed, this.paddle.width / 2);
    }

    if (this.cursors.space.isDown && this.isAttachedToPaddle) {
      this.isAttachedToPaddle = false;
      if (this.ball) {
        this.ball.body.setVelocityY(-300);
      }
    }
  }

  // Make the ball be able to bounce off of the paddle
  bounceOffPaddle(paddle, ball) {
    ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x);
  }

  // Handles increasing of the score and the breaking of the bricks on collision
  ballBrickCollision(ball, brick) {
    this.audioController.play('brickHit');
    brick.destroy();
    this.score++;
    this.brickController.decrementBricks();

    if (Math.random() < 0.2) {
      dropRandomPowerUp(this, brick.x, brick.y);
    }

    ball.body.velocity.x = ball.body.velocity.x + 5;
    ball.body.velocity.y = ball.body.velocity.y + 5;
    this.uiController.updateScore(this.score);
  }

  dropBallPowerUp(x, y) {
    new CloneBall(this, x, y);
  }

  dropPaddleSizePowerUp(x, y) {
    new IncreasePaddleSize(this, x, y);
  }

  collectBallPowerUp(powerUp) {
    powerUp.destroy();
    this.cloneBall();
  }

  collectPaddleSizePowerUp(powerUp) {
    powerUp.destroy();
    this.increasePaddleSize();
  }

  increasePaddleSize() {
    this.paddle.grow();
  }

  cloneBall() {
    this.ballController.cloneBall();
  }
}
