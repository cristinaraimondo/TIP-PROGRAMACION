import Bootloader from './Bootloader.js';
import Play from './scenes/Play.js';
import Intro from './scenes/Intro.js';
import Volcanes from './scenes/Volcanes.js';
import Selva from './scenes/Selva.js';
import Game_over from './scenes/Game_over.js';
import Anara from './scenes/Anara.js';
import Ivan from './scenes/Ivan.js';
import Kelen from './scenes/Kelen.js';

const config = {
    title: 'Islas_andaman',
    version: '0.0.1',
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser_container',
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 2000
            }
        }
    },
    scene: [Bootloader, Intro, Game_over, Selva, Volcanes, Anara, Ivan, Kelen]
};

new Phaser.Game(config);
