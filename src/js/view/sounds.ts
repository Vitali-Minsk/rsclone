import audioSrc from './audioSrc';

export default class Sounds {
  gameSounds: {
    gameTheme: HTMLAudioElement | null,
    shot: HTMLAudioElement | null,
    playerDamage: HTMLAudioElement | null,
    damage: HTMLAudioElement | null,
    explosions: HTMLAudioElement[] | null,
    enemyShots: HTMLAudioElement[] | null,
  };
  menuSounds: {
    audioHover: HTMLAudioElement | null,
    audioClick: HTMLAudioElement | null,
  };
  gameMusicVolume: number;
  gameSfxVolume: number;
  constructor() {
    this.gameSounds = {
      gameTheme: null,
      shot: null,
      playerDamage: null,
      damage: null,
      explosions: null,
      enemyShots: null,
    };
    this.menuSounds = {
      audioHover: null,
      audioClick: null,
    };

    this.gameMusicVolume = 0.7;
    this.gameSfxVolume = 0.7;
  }

  init(): void {
    this.loadSounds();
  }

  loadSounds(): void {
    this.gameSounds.gameTheme = Sounds.createSound(audioSrc.gameTheme);
    this.gameSounds.shot = Sounds.createSound(audioSrc.shot);
    this.gameSounds.playerDamage = Sounds.createSound(audioSrc.playerDamage);
    this.gameSounds.damage = Sounds.createSound(audioSrc.damage);
    this.gameSounds.explosions = Sounds.createSounds(audioSrc.explosions);
    this.gameSounds.enemyShots = Sounds.createSounds(audioSrc.enemyShots);
    this.menuSounds.audioHover = Sounds.createSound(audioSrc.uiSounds.hover);
    this.menuSounds.audioClick = Sounds.createSound(audioSrc.uiSounds.click);
  }

  static createSound(path: string): HTMLAudioElement {
    const sound = new Audio();
    sound.src = path;
    return sound;
  }

  static createSounds(pathObj: { [s: string]: string; }): any[] {
    const soundsArr = [];
    Object.values(pathObj).forEach((path: string) => {
      const sound = this.createSound(path);
      soundsArr.push(sound);
    });
    return soundsArr;
  }

  playSound(sound: HTMLAudioElement, isLoop?: boolean): void {
    const audio = sound;
    const isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended
    && audio.readyState > 2;
    if (isPlaying) audio.pause();
    audio.currentTime = 0;
    audio.volume = this.gameSfxVolume;
    audio.play();
    if (isLoop) {
      audio.loop = true;
      audio.volume = this.gameMusicVolume;
    }
  }

  playRandSound(arr: string | any[]): void {
    const audio = arr[Math.floor(Math.random() * arr.length)];
    const isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended
    && audio.readyState > 2;
    if (isPlaying) audio.pause();
    audio.currentTime = 0;
    audio.volume = this.gameSfxVolume;
    audio.play();
  }

  static pauseSounds(arr: any[]): void {
    arr.forEach((sound) => {
      const audio = sound;
      if (audio.muted) {
        audio.muted = false;
      } else {
        audio.muted = true;
      }
    });
  }

  pauseGameTheme(): void {
    if (this.gameSounds.gameTheme.muted) {
      this.gameSounds.gameTheme.muted = false;
    } else {
      this.gameSounds.gameTheme.muted = true;
    }
  }

  playGameTheme(): void {
    this.playSound(this.gameSounds.gameTheme, true);
  }

  playPlayerHitSound(): void {
    this.playSound(this.gameSounds.playerDamage);
  }

  pausePlayerHitSound(): void {
    if (this.gameSounds.playerDamage.muted) {
      this.gameSounds.playerDamage.muted = false;
    } else {
      this.gameSounds.playerDamage.muted = true;
    }
  }

  playExplosionSound(): void {
    this.playRandSound(this.gameSounds.explosions);
  }

  pauseExplosionSound(): void {
    Sounds.pauseSounds(this.gameSounds.explosions);
  }

  playEnemyHitSound(): void {
    this.playSound(this.gameSounds.damage);
  }

  pauseEnemyHitSound(): void {
    if (this.gameSounds.damage.muted) {
      this.gameSounds.damage.muted = false;
    } else {
      this.gameSounds.damage.muted = true;
    }
  }

  playPlayerShotSound(): void {
    this.playSound(this.gameSounds.shot);
  }

  pausePlayerShotSound(): void {
    if (this.gameSounds.shot.muted) {
      this.gameSounds.shot.muted = false;
    } else {
      this.gameSounds.shot.muted = true;
    }
  }

  playEnemyShotSound(): void {
    this.playRandSound(this.gameSounds.enemyShots);
  }

  pauseEnemyShotSound(): void {
    Sounds.pauseSounds(this.gameSounds.enemyShots);
  }

  pauseAllSounds(): void {
    this.pauseGameTheme();
    this.pausePlayerHitSound();
    this.pauseExplosionSound();
    this.pauseEnemyHitSound();
    this.pausePlayerShotSound();
    this.pauseEnemyShotSound();
  }

  playHoverSound(): void {
    this.playSound(this.menuSounds.audioHover);
  }

  playClickSound(): void {
    this.playSound(this.menuSounds.audioClick);
  }
}
