export class AudioManager {
    constructor() {
        // URLs résolues dynamiquement par Vite
        this.soundPaths = {
            bgm: new URL('./assets/audio/marioTheme.mp3', import.meta.url).href,
            jump: new URL('./assets/audio/mario_jump.mp3', import.meta.url).href,
            gameOver: new URL('./assets/audio/mamma-mia_caQRETK.mp3', import.meta.url).href,
            hit: new URL('./assets/audio/sm64-mario-pain.mp3', import.meta.url).href,
            pipe: new URL('./assets/audio/pipe.mp3', import.meta.url).href,
            fall: new URL('./assets/audio/mario-falling.mp3', import.meta.url).href,
            coin: new URL('./assets/audio/super-mario-coin-sound.mp3', import.meta.url).href,
            mushroom: new URL('./assets/audio/01-power-up-mario.mp3', import.meta.url).href,
            stomp:new URL('./assets/audio/mario-goomba-stomp.mp3', import.meta.url).href,
            win:new URL('./assets/audio/victory-mario-series-hq-super-smash-bros.mp3', import.meta.url).href,
            restart:new URL('./assets/audio/sm64_mario_lets_go.mp3', import.meta.url).href,
            
        };

        this.bgmAudio = null;
        this.isMuted = false;
        this.bgmStarted = false;
    }

    playBGM() {
        if (this.isMuted) return;

        // Initialisation de la BGM si ce n'est pas encore fait
        if (!this.bgmAudio) {
            this.bgmAudio = new Audio(this.soundPaths.bgm);
            this.bgmAudio.loop = true;
            this.bgmAudio.volume = 0.4;
        }

        this.bgmAudio.play().then(() => {
            this.bgmStarted = true;
        }).catch(() => {
            // Déblocage sur premier clic ou touche en cas de blocage d'autoplay
            const unlockAudio = () => {
                if (this.bgmAudio) {
                    this.bgmAudio.play();
                    this.bgmStarted = true;
                }
                window.removeEventListener("keydown", unlockAudio);
                window.removeEventListener("click", unlockAudio);
            };
            window.addEventListener("keydown", unlockAudio);
            window.addEventListener("click", unlockAudio);
        });
    }

    stopBGM() {
        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.bgmAudio.currentTime = 0;
        }
    }

    playSFX(name, volume = 0.1) {
        if (this.isMuted || !this.soundPaths[name]) return;

        const sfx = new Audio(this.soundPaths[name]);
        sfx.volume = volume;
        sfx.play().catch(err => console.warn(`Erreur lecture ${name}:`, err));
    }
}

export const audioManager = new AudioManager();