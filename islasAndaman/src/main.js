import Bootloader from './Bootloader.js';
import Intro from './scenes/Intro.js';
import Volcanes from './scenes/Volcanes.js';
import Cocodrilos from './scenes/Cocodrilos.js';
import Game_over from './scenes/Game_over.js';
import Ataque_huevos from './scenes/Ataque_huevos.js';
import SobrevolandoVolcan from './scenes/SobrevolandoVolcan.js';
import Lluvia from './scenes/Lluvia.js';
import EstadoPersonaje from "./scenes/EstadoPersonaje.js";
import textroll from "./scenes/textroll.js"
import SalvandoCompas from './scenes/SalvandoCompas.js';
import Selva from './scenes/Selva.js';
import VolandoLava from './scenes/volandoLava.js';


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
        },
        audio: {
            disableWebAudio: true
        }
    },
    scene: [
        Bootloader,
        Intro,
        Cocodrilos,
        Volcanes,
        Ataque_huevos,
        SalvandoCompas,
        textroll,
        SobrevolandoVolcan,
        Selva,
        VolandoLava,
        EstadoPersonaje,
        Lluvia,
        Game_over,
        
    ]

    
};


new Phaser.Game(config);
