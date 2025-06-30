export default class BrickController {
    constructor(scene, levelData, bricksInfo, balls, onBrickHit) {
        this.scene = scene;
        this.levelData = levelData;
        this.bricksInfo = bricksInfo;
        this.balls = balls;
        this.onBrickHit = onBrickHit;

        this.bricksGroup = this.scene.physics.add.staticGroup();
        this.createBricks();
    }

    createBricks() {
        this.bricksGroup.clear(true, true); // verwijdert oude bricks als ze bestaan

        this.levelData.brickPattern.forEach((row, rowIndex) => {
            row.forEach((brick, colIndex) => {
                if (brick === 1) {
                    const x = colIndex * (this.bricksInfo.width + this.bricksInfo.padding) + this.bricksInfo.offset.left;
                    const y = rowIndex * (this.bricksInfo.height + this.bricksInfo.padding) + this.bricksInfo.offset.top;

                    const newBrick = this.scene.add.rectangle(x, y, 50, 20, 0xffffff);
                    this.scene.physics.add.existing(newBrick, true);
                    this.bricksGroup.add(newBrick);
                }
            });
        });

        this.bricksCount = this.levelData.brickPattern.flat().filter((brick) => brick === 1).length;

        this.balls.forEach((ball) => {
            this.scene.physics.add.collider(ball, this.bricksGroup, this.onBrickHit, null, this.scene);
        });
    }

    resetLevel(levelData, balls) {
        this.levelData = levelData;
        this.balls = balls;
        this.createBricks();
    }

    getGroup() {
        return this.bricksGroup;
    }

    getBricksCount() {
        return this.bricksCount;
    }

    decrementBricks() {
        this.bricksCount--;
    }
}