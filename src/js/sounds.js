import audioSrc from './audioSrc';

export default class Sounds {
  constructor() {
    this.gameSounds = {};
    this.menuMusic = null;
    this.menuSounds = {};

    this.gameMusicVolume = 0.7;
    this.gameSfxVolume = 0.7;
  }

  init() {
    this.loadSounds();
  }

  loadSounds() {
    this.gameSounds.gameTheme = Sounds.createSound(audioSrc.gameTheme);
    this.gameSounds.shot = Sounds.createSound(audioSrc.shot);
    this.gameSounds.playerDamage = Sounds.createSound(audioSrc.playerDamage);
    this.gameSounds.damage = Sounds.createSound(audioSrc.damage);
    this.gameSounds.explosions = Sounds.createSounds(audioSrc.explosions);
    this.gameSounds.enemyShots = Sounds.createSounds(audioSrc.enemyShots);
    this.menuSounds.audioHover = Sounds.createSound(audioSrc.uiSounds.hover);
    this.menuSounds.audioClick = Sounds.createSound(audioSrc.uiSounds.click);
  }

  static createSound(path) {
    const sound = new Audio();
    sound.src = path;
    return sound;
  }

  static createSounds(pathObj) {
    const soundsArr = [];
    Object.values(pathObj).forEach((path) => {
      const sound = this.createSound(path);
      soundsArr.push(sound);
    });
    return soundsArr;
  }

  playSound(sound, isLoop) {
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

  playRandSound(arr) {
    const audio = arr[Math.floor(Math.random() * arr.length)];
    const isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended
    && audio.readyState > 2;
    if (isPlaying) audio.pause();
    audio.currentTime = 0;
    audio.volume = this.gameSfxVolume;
    audio.play();
    // audio.play();
  }

  static pauseSounds(arr) {
    arr.forEach((sound) => {
      const audio = sound;
      if (audio.muted) {
        audio.muted = false;
      } else {
        audio.muted = true;
      }
      // sound.pause();
      // sound.currentTime = 0;
    });
  }

  pauseGameTheme() {
    if (this.gameSounds.gameTheme.muted) {
      this.gameSounds.gameTheme.muted = false;
    } else {
      this.gameSounds.gameTheme.muted = true;
    }
  }

  playGameTheme() {
    this.playSound(this.gameSounds.gameTheme, true);
  }

  playPlayerHitSound() {
    this.playSound(this.gameSounds.playerDamage);
  }

  pausePlayerHitSound() {
    // this.gameSounds.playerDamage.pause();
    if (this.gameSounds.playerDamage.muted) {
      this.gameSounds.playerDamage.muted = false;
    } else {
      this.gameSounds.playerDamage.muted = true;
    }
  }

  playExplosionSound() {
    this.playRandSound(this.gameSounds.explosions);
  }

  pauseExplosionSound() {
    Sounds.pauseSounds(this.gameSounds.explosions);
  }

  playEnemyHitSound() {
    this.playSound(this.gameSounds.damage);
  }

  pauseEnemyHitSound() {
    // this.gameSounds.damage.pause();
    if (this.gameSounds.damage.muted) {
      this.gameSounds.damage.muted = false;
    } else {
      this.gameSounds.damage.muted = true;
    }
  }

  playPlayerShotSound() {
    this.playSound(this.gameSounds.shot);
  }

  pausePlayerShotSound() {
    // this.gameSounds.shot.pause();
    if (this.gameSounds.shot.muted) {
      this.gameSounds.shot.muted = false;
    } else {
      this.gameSounds.shot.muted = true;
    }
  }

  playEnemyShotSound() {
    this.playRandSound(this.gameSounds.enemyShots);
  }

  pauseEnemyShotSound() {
    Sounds.pauseSounds(this.gameSounds.enemyShots);
  }

  pauseAllSounds() {
    this.pauseGameTheme();
    this.pausePlayerHitSound();
    this.pauseExplosionSound();
    this.pauseEnemyHitSound();
    this.pausePlayerShotSound();
    this.pauseEnemyShotSound();
  }

  // getAllSfxArray() {
  //   const allSfxArr = Object.values(this.gameSounds).flat();
  //   return allSfxArr.slice(1, allSfxArr.length);
  // }

  playHoverSound() {
    this.playSound(this.menuSounds.audioHover);
  }

  playClickSound() {
    this.playSound(this.menuSounds.audioClick);
  }
}
