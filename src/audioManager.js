export class AudioManager {
    constructor() {
        
        this.soundPaths = {

            jump: new URL('./assets/jump.wav', import.meta.url).href,
            gameOver: new URL('./assets/explosion.wav', import.meta.url).href,
            bgm: new URL('./assets/2022-03-08_-_Fire_-_www.FesliyanStudios.com.mp3', import.meta.url).href,
        };

        this.bgmAudio = null;
        this.isMuted = false;
        this.bgmStarted = false;
        
        // Cache pour réutiliser les objets Audio des effets sonores
        this.sfxCache = {};
    }

    playBGM() {
        if (this.isMuted) return;

        if (!this.bgmAudio) {
            this.bgmAudio = new Audio(this.soundPaths.bgm);
            this.bgmAudio.loop = true;
            this.bgmAudio.volume = 0.4;
        }

        this.bgmAudio.play().then(() => {
            this.bgmStarted = true;
        }).catch(() => {
            const unlockAudio = () => {
                if (this.bgmAudio && !this.bgmStarted) {
                    this.bgmAudio.play().then(() => {
                        this.bgmStarted = true;
                    }).catch(() => {});
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
            this.bgmStarted = false;
        }
    }

    playSFX(name, volume = 0.1) {
        if (this.isMuted || !this.soundPaths[name]) return;

        // Réutilisation de l'objet audio existant ou création si premier appel
        if (!this.sfxCache[name]) {
            this.sfxCache[name] = new Audio(this.soundPaths[name]);
        }

        const sfx = this.sfxCache[name];
        sfx.volume = volume;
        sfx.currentTime = 0; // Réinitialise la lecture au début si le son jouait déjà
        sfx.play().catch(err => console.warn(`Erreur lecture ${name}:`, err));
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.bgmAudio) {
            this.bgmAudio.muted = this.isMuted;
        }
    }
}

export const audioManager = new AudioManager();