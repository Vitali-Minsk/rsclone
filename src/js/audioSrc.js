import mainTheme from '../assets/audio/game-theme.mp3';
import laser from '../assets/audio/laser.mp3';
import damage1 from '../assets/audio/damage1.wav';
import playerDamageSrc from '../assets/audio/damage-02.wav';
import explosionSrc1 from '../assets/audio/explosion-01.wav';
import explosionSrc2 from '../assets/audio/explosion-02.mp3';
import explosionSrc3 from '../assets/audio/explosion-03.mp3';
import explosionSrc4 from '../assets/audio/explosion-04.wav';
import enemyShotSrc1 from '../assets/audio/shot-01.mp3';
// import enemyShotSrc2 from '../assets/audio/shot-02.wav';
// import enemyShotSrc3 from '../assets/audio/shot-03.wav';
import enemyShotSrc4 from '../assets/audio/shot-04.wav';

// const audioFiles = [];

// function importAll(r) {
//   // eslint-disable-next-line no-return-assign
//   r.keys().forEach((s, i) => audioFiles[i] = r(s));
// }

// importAll(require.context('../assets/audio/', true, /\.mp3$/));
// console.log(a);

export default {
  // eslint-disable-next-line global-require
  gameTheme: mainTheme,
  shot: laser,
  damage: damage1,
  playerDamage: playerDamageSrc,
  explosions: {
    explosion1: explosionSrc1,
    explosion2: explosionSrc2,
    explosion3: explosionSrc3,
    explosion4: explosionSrc4,
  },
  enemyShots: {
    enemyShot1: enemyShotSrc1,
    // enemyShot2: enemyShotSrc2,
    // enemyShot3: enemyShotSrc3,
    enemyShot4: enemyShotSrc4,
  },

};
