import Bootloader from './Bootloader.js';
import Play from './scenes/Play.js';
import Intro from './scenes/Intro.js';
import Volcanes from './scenes/Volcanes.js';
import Cocodrilos from './scenes/Cocodrilos.js';
import Game_over from './scenes/Game_over.js';
import Ataque_huevos from './scenes/Ataque_huevos.js';
import Ivan from './scenes/Ivan.js';
import Lluvia from './scenes/Lluvia.js';
import EstadoPersonaje from "./scenes/EstadoPersonaje.js";

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
                y: 0,
                x: 0
            }
        }
    },
    scene: [
        Bootloader,
        Intro,
        Cocodrilos,
        Volcanes,
        Ataque_huevos,
        Ivan,
        EstadoPersonaje,
        Lluvia,
        Game_over
    ]
};

new Phaser.Game(config);
