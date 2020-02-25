import Bootloader from './Bootloader.js';
import Intro from './scenes/Intro.js';
import SaltandoLava from './scenes/SaltandoLava.js';
import Cocodrilos from './scenes/Cocodrilos.js';
import Game_over from './scenes/Game_over.js';
import Ataque_huevos from './scenes/Ataque_huevos.js';
import BuscandoHelicoptero from './scenes/BuscandoHelicoptero.js';
import Lluvia from './scenes/Lluvia.js';
import UI from "./scenes/UI.js";
import textroll from "./scenes/textroll.js"
import SalvandoCompas from './scenes/SalvandoCompas.js';
import PantallaLava from './scenes/PantallaLava.js';
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
            debug: false,
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
        SaltandoLava,
        Ataque_huevos,
        SalvandoCompas,
        textroll,
        BuscandoHelicoptero,
        PantallaLava,
        VolandoLava,
        UI,
        Lluvia,
        Game_over,
        
    ]

    
};


new Phaser.Game(config);
