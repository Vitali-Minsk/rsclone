import View from './View';
import Model from './Model';
import spaceShips from './shipsImgSource';

export default class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model();
    this.shipIndex = 0;
    this.isFirstGame = true;
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
      this.view.createProfileMenu();
      this.view.sounds.playClickSound();

      const currentShip = spaceShips[this.shipIndex];
      this.view.updatecurrentShipDisplay(currentShip);
    }
    if (e.target.innerHTML === 'Continue') {
      if (this.isFirstGame) return;
      this.view.sounds.playClickSound();
      this.view.pauseEventHandler();
      this.model.pauseGame();
      this.view.sounds.pauseAllSounds();
    }
    if (e.target.innerHTML === 'Save Game') {
      if (this.isFirstGame) return;
      this.view.sounds.playClickSound();
      this.model.saveGame();
    }
    if (e.target.innerHTML === 'Load Game') {
      this.view.sounds.playClickSound();
      this.view.newGameItemHandler();
      this.model.loadGame(this.updateDisplays.bind(this));
      if (!this.isFirstGame) this.view.sounds.pauseAllSounds();
      this.view.sounds.playGameTheme();
      this.isFirstGame = false;
    }
    if (e.target.innerHTML === 'Options') {
      this.view.sounds.playClickSound();
      this.view.createOptionMenu();
    }
    if ((e.code === 'Escape' && e.type === 'keydown')) {
      if (this.isFirstGame) return;
      this.view.sounds.playClickSound();
      this.view.pauseEventHandler();
      this.model.pauseGame();
      this.view.sounds.pauseAllSounds();
    }
    if (e.target.innerHTML === 'Start game') {
      this.view.sounds.playClickSound();
      this.view.newGameItemHandler();
      this.model.startNewGame(this.shipIndex);
      if (!this.isFirstGame) this.view.sounds.pauseAllSounds();
      this.view.sounds.playGameTheme();
      this.updateDisplays(this.model.score, this.model.player.health);
      this.isFirstGame = false;
    }
    if (e.target.innerHTML === 'Main menu') {
      this.view.sounds.playClickSound();
      this.view.createMainMenu();
    }
    if (e.target === this.view.buttons.prevShip) {
      this.view.sounds.playClickSound();
      if (this.shipIndex > 0) {
        this.shipIndex -= 1;
        const currentShip = spaceShips[this.shipIndex];
        this.view.updatecurrentShipDisplay(currentShip);
      }
    }
    if (e.target === this.view.buttons.nextShip) {
      this.view.sounds.playClickSound();
      if (this.shipIndex < 10) {
        this.shipIndex += 1;
        const currentShip = spaceShips[this.shipIndex];
        this.view.updatecurrentShipDisplay(currentShip);
      }
    }
    if (e.type === 'input' && e.target === this.view.options.musicVolumeRange) {
      this.view.sounds.playClickSound();
      this.view.sounds.gameMusicVolume = this.view.options.musicVolumeRange.value;
      this.view.sounds.gameSounds.gameTheme.volume = this.view.options.musicVolumeRange.value;
    }
    if (e.type === 'input' && e.target === this.view.options.effectsVolumeRange) {
      this.view.sounds.playClickSound();
      this.view.sounds.gameSfxVolume = this.view.options.effectsVolumeRange.value;
    }
    if (e.type === 'input' && e.target === this.view.options.graphicsLevelRange) {
      this.view.sounds.playClickSound();
      this.model.background.numStars = this.view.options.graphicsLevelRange.value;
      this.model.numberSparks = this.view.options.graphicsLevelRange.value / 10;
      this.view.graphicsLevelValue = this.view.options.graphicsLevelRange.value;
    }
    if (e.target.innerHTML === 'About') {
      this.view.sounds.playClickSound();
      this.view.createAboutPage();
    }
  }

  canvasEventHandlers(e) {
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
      if (this.isFirstGame) return;
      this.view.sounds.playClickSound();
      this.view.pauseEventHandler();
      this.model.pauseGame();
      this.view.sounds.pauseAllSounds();
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
    }
    if (e.type === 'enemyExplosion') {
      this.view.sounds.playExplosionSound();
    }
    if (e.type === 'enemyShot') {
      this.view.sounds.playEnemyShotSound();
    }
  }

  updateDisplays(currentScore, currentHealth) {
    this.view.scoreElUpdate(currentScore);
    this.view.healthElUpdate(currentHealth);
  }
}

//
