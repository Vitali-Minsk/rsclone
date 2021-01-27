import audioSrc from './audioSrc';

export default class Sounds {
  constructor() {
    this.gameSounds = {};
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

  static playSound(sound, isLoop) {
    const audio = sound;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    if (isLoop) audio.loop = true;
  }

  static playRandSound(arr) {
    const audio = arr[Math.floor(Math.random() * arr.length)];
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  playGameTheme() {
    Sounds.playSound(this.gameSounds.gameTheme, true);
  }

  playPlayerHitSound() {
    Sounds.playSound(this.gameSounds.playerDamage);
  }

  playExplosionSound() {
    Sounds.playRandSound(this.gameSounds.explosions);
  }

  playEnemyHitSound() {
    Sounds.playSound(this.gameSounds.damage);
  }

  playPlayerShotSound() {
    Sounds.playSound(this.gameSounds.shot);
  }

  playEnemyShotSound() {
    Sounds.playRandSound(this.gameSounds.enemyShots);
  }
}
