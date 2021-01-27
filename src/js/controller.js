import View from './View';
import Model from './Model';

export default class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model();
  }

  init() {
    this.view.init();
    this.view.renderCanvas(this.model.canvas);

    this.view.menuEventHandlers = this.menuEventHandlers.bind(this);
    this.view.canvasEventHandlers = this.canvasEventHandlers.bind(this);
    this.view.addMenuListenerEvents();
  }

  menuEventHandlers(e) {
    if (e.target.innerHTML === 'New Game') {
      this.view.newGameItemHandler();
      this.model.startNewGame();
      this.view.sounds.playGameTheme();
    }
    if (e.target.innerHTML === 'Continue') {
      this.view.pauseEventHandler();
      this.model.pauseGame();
    }
    if ((e.code === 'Escape' && e.type === 'keydown')) {
      this.view.pauseEventHandler();
      this.model.pauseGame();
    }
  }

  canvasEventHandlers(e) {
    // console.log(e.type);
    if (e.type === 'keydown' && (e.code === 'KeyW' || e.code === 'KeyS' || e.code === 'KeyA' || e.code === 'KeyD')) {
      this.model.keys[e.code] = true;
    } else if (e.type === 'keyup' && (e.code === 'KeyW' || e.code === 'KeyS' || e.code === 'KeyA' || e.code === 'KeyD')) {
      this.model.keys[e.code] = false;
    }
    if (e.type === 'mousemove') {
      this.model.mouseMoveHandler(e);
    }
    if (e.type === 'click') {
      this.model.playerShot(e);
      this.view.sounds.playPlayerShotSound();
    }
    if ((e.code === 'Escape' && e.type === 'keydown')) {
      this.view.pauseEventHandler();
      this.model.pauseGame();
    }
    if (e.type === 'enemyHit') {
      this.view.scoreElUpdate(this.model.score);
      this.view.sounds.playEnemyHitSound();
    }
    if (e.type === 'playerHit') {
      this.view.healthElUpdate(this.model.player.health);
      this.view.sounds.playPlayerHitSound();
    }
    if (e.type === 'playerExplosion') {
      this.view.healthElUpdate(this.model.player.health);
      this.view.sounds.playExplosionSound();
      this.view.createModal(this.model.score);
    }
    if (e.type === 'enemyExplosion') {
      this.view.sounds.playExplosionSound();
    }
    if (e.type === 'enemyShot') {
      this.view.sounds.playEnemyShotSound();
    }
  }
}
//
