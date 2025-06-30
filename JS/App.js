import StartScene from "./scenes/Start.js";
import VictoryScene from "./scenes/Victory.js";
import GameOverScene from "./scenes/GameOver.js";
import PauseMenu from "./scenes/PauseMenu.js";
import GameScene from "./scenes/Main.js";

// Game configuration including the new GameScene class
const config = {
    type: Phaser.AUTO,
    width: 800, // Default width
    height: 600, // Default height
    scene: [StartScene, GameScene, VictoryScene, GameOverScene, PauseMenu],
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE, // Allow resizing to fit the screen
      autoCenter: Phaser.Scale.CENTER_BOTH, // Ensure the game is centered
    },
  };
  
  // Standard new Phaser game instance
new Phaser.Game(config);