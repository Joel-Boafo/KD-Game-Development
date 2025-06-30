export const LEVELS = [
    {
      brickPattern: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
    {
      brickPattern: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      ],
    },
];

export const POWER_UP_TYPES = {
    CLONE_BALL: "cloneBall",
    INCREASE_PADDLE_SIZE: "increasePaddleSize",
};

export const SOUNDS = {
    audio: {
        volume: 0.5,
        location: "assets/audio",
        files: {
            brickHit: "bricks-hit.mp3",
            cloneBall: "cloneball.mp3",
            gameOver: "gameover.mp3",
            lifeLost: "life-lost.mp3",
            paddleGrow: "paddlegrow.mp3",
            paddleShrink: "paddleshrink.mp3",
            victory: "victory.mp3",
        }
    }
};