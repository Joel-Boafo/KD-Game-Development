export default function eventHandler(scene, targetScene, isPauseMenu = false, event = 'pointerdown') {
    if (isPauseMenu) {
        return scene.input.on(event, () => {
            scene.scene.resume(targetScene);
            scene.scene.stop();
        })
    }
    return scene.input.on(event, () => {
        scene.scene.start(targetScene);
    })
};

export function dropRandomPowerUp(scene, x, y) {
    const powerUpTypes = Object.values(scene.PowerUpTypes);
    const randomType =
      powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];

    switch (randomType) {
      case scene.PowerUpTypes.CLONE_BALL:
        scene.dropBallPowerUp(x, y);
        break;
      case scene.PowerUpTypes.INCREASE_PADDLE_SIZE:
        scene.dropPaddleSizePowerUp(x, y);
        break;
    }
};