import { SOUNDS } from "../constants.js";

export default class AudioController {
    constructor(scene) {
        this.scene = scene;
        this.sounds = {};
    }

    config() {
        Object.entries(SOUNDS.audio.files).forEach(([key, filename]) => {
            this.scene.load.audio(key, `${SOUNDS.audio.location}/${filename}`);
        });
    }

    init() {
        Object.entries(SOUNDS.audio.files).forEach(([key, filename]) => {
            this.sounds[key] = this.scene.sound.add(key);
        });

        this.scene.sound.volume = SOUNDS.audio.volume;
    }

    play(sound) {
        return this.sounds[sound]?.play() || console.error(`Sound ${sound} not found`);
    }
}