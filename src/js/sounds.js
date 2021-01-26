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
    // shot.stop();
    sound.src = path;
    // sou.play();
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
}
