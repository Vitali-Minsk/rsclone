import mainTheme from '../../assets/audio/game-theme.mp3';
import laser from '../../assets/audio/laser.mp3';
import damage1 from '../../assets/audio/damage1.wav';
import playerDamageSrc from '../../assets/audio/damage-02.wav';
import explosionSrc1 from '../../assets/audio/explosion-01.wav';
import explosionSrc2 from '../../assets/audio/explosion-02.mp3';
import explosionSrc3 from '../../assets/audio/explosion-03.mp3';
import explosionSrc4 from '../../assets/audio/explosion-04.wav';
import enemyShotSrc1 from '../../assets/audio/shot-01.mp3';
import enemyShotSrc4 from '../../assets/audio/shot-04.wav';
import audioHoverSrc from '../../assets/audio/hover.wav';
import audioClickSrc from '../../assets/audio/click.wav';

export default {
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
    enemyShot4: enemyShotSrc4,
  },
  uiSounds: {
    hover: audioHoverSrc,
    click: audioClickSrc,
  },
};
