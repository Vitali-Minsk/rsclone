import View from './view/View';
import Model from './models/Model';
import spaceShips from './models/shipsImgSource';
import tooltipMessages from './view/tooltipMessage';
import sendRequest from './request';

export default class Controller {
  view: View;
  model: Model;
  shipIndex: number;
  isFirstGame: boolean;
  gameOver: boolean;
  constructor() {
    this.view = new View();
    this.model = new Model();
    this.shipIndex = 0;
    this.isFirstGame = true;
    this.gameOver = false;
  }

  init(): void {
    this.view.init();
    this.view.renderCanvas(this.model.canvas);
    this.view.menuEventHandlers = this.menuEventHandlers.bind(this);
    this.view.canvasEventHandlers = this.canvasEventHandlers.bind(this);
    this.view.addMenuListenerEvents();
  }

  menuEventHandlers(e: { target: { classList: { contains: (arg0: string) => any; }; }; code: string; type: string; }): void {
    if (e.target.classList.contains('new-game')) {
      this.menuNewGameItemHandler();
    }
    if (e.target.classList.contains('continue') && !this.gameOver) {
      this.menuContinueItemHandler();
    }
    if (e.target.classList.contains('save-game') && !this.gameOver) {
      this.menuSaveGameItemHandler();
    }
    if (e.target.classList.contains('load-game')) {
      this.menuLoadGameItemHandler();
    }
    if (e.target.classList.contains('top-list')) {
      this.menuTopPageItemHandler();
    }
    if (e.target.classList.contains('options')) {
      this.menuOptionsItemHandler();
    }
    if ((e.code === 'Escape' && e.type === 'keydown' && !this.gameOver)) {
      this.escapeKeyHandler();
    }
    if (e.target.classList.contains('btn-start-game')) {
      this.btnStartGameHandler();
    }
    if (e.target.classList.contains('btn-main-menu')) {
      this.btnMainMenuHandler();
    }
    if (e.target === this.view.buttons.prevShip) {
      this.btnPrevShipHandler();
    }
    if (e.target === this.view.buttons.nextShip) {
      this.btnNextShipHandler();
    }
    if (e.type === 'input' && e.target === this.view.options.musicVolumeRange) {
      this.optionsMusicVolumeRangeHandler();
    }
    if (e.type === 'input' && e.target === this.view.options.effectsVolumeRange) {
      this.optionsEffectsVolumeRangeHandler();
    }
    if (e.type === 'input' && e.target === this.view.options.graphicsLevelRange) {
      this.optionsGraphicsLevelRangeHandler();
    }
    if (e.target.classList.contains('btn-about')) {
      this.btnAboutHandler();
    }
    if (e.target === this.view.userNameInput) {
      this.inputUserNameHandler();
    }
  }

  canvasEventHandlers(e: { type: string; code: string; }): void {
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
    if ((e.code === 'Escape' && e.type === 'keydown' && !this.gameOver)) {
      this.escapeKeyHandler();
    }
    if (e.type === 'enemyHit') {
      this.view.scoreElUpdate(this.model.score);
      this.view.sounds.playEnemyHitSound();
    }
    if (e.type === 'playerHit') {
      this.view.healthElUpdate(this.model.player.health);
      this.view.sounds.playPlayerHitSound();
    }
    if (e.type === 'gameOver') {
      this.gameOverEventHandler();
    }
    if (e.type === 'enemyExplosion') {
      this.view.sounds.playExplosionSound();
    }
    if (e.type === 'enemyShot') {
      this.view.sounds.playEnemyShotSound();
    }
  }

  menuNewGameItemHandler(): void {
    this.view.createProfileMenu();
    this.view.sounds.playClickSound();
    const currentShip: any = spaceShips[this.shipIndex];
    this.view.updateCurrentShipDisplay(currentShip);
  }

  menuContinueItemHandler(): void {
    if (this.isFirstGame) {
      this.view.createTooltip(tooltipMessages.failedContinue, 1000);
      return;
    }
    this.view.sounds.playClickSound();
    this.view.pauseEventHandler();
    this.model.pauseGame();
    this.view.sounds.pauseAllSounds();
  }

  menuSaveGameItemHandler(): void {
    if (this.isFirstGame) {
      this.view.createTooltip(tooltipMessages.failedSave, 1000);
      return;
    }
    this.view.sounds.playClickSound();
    this.model.saveGame();
    this.view.createTooltip(tooltipMessages.saveGame, 2000);
  }

  menuLoadGameItemHandler(): void {
    if (!Model.checkSaves()) return;
    this.gameOver = false;
    this.view.sounds.playClickSound();
    this.view.newGameItemHandler();
    this.model.loadGame(this.updateDisplays.bind(this));
    this.view.createTooltip(tooltipMessages.loadGame, 2000);
    if (!this.isFirstGame) this.view.sounds.pauseAllSounds();
    this.view.sounds.playGameTheme();
    this.isFirstGame = false;
  }

  menuTopPageItemHandler(): void {
    this.view.sounds.playClickSound();
    this.view.createTopPage();
    this.getRatingPlayers();
  }

  menuOptionsItemHandler(): void {
    this.view.sounds.playClickSound();
    this.view.createOptionMenu();
  }

  escapeKeyHandler(): void {
    if (this.isFirstGame) return;
    this.view.sounds.playClickSound();
    this.view.pauseEventHandler();
    this.model.pauseGame();
    this.view.sounds.pauseAllSounds();
  }

  btnStartGameHandler(): void {
    this.gameOver = false;
    this.view.sounds.playClickSound();
    this.view.newGameItemHandler();
    this.model.startNewGame(this.shipIndex);
    if (!this.isFirstGame) {
      this.view.sounds.pauseAllSounds();
    } else {
      this.view.createTooltip(tooltipMessages.startFirstGame, 5000);
    }
    this.view.sounds.playGameTheme();
    this.updateDisplays(this.model.score, this.model.player.health);
    this.isFirstGame = false;
  }

  btnMainMenuHandler(): void {
    this.view.sounds.playClickSound();
    this.view.createMainMenu();
  }

  btnPrevShipHandler(): void {
    this.view.sounds.playClickSound();
    if (this.shipIndex > 0) {
      this.shipIndex -= 1;
      const currentShip: any  = spaceShips[this.shipIndex];
      this.view.updateCurrentShipDisplay(currentShip);
    }
  }

  btnNextShipHandler(): void {
    this.view.sounds.playClickSound();
    if (this.shipIndex < 10) {
      this.shipIndex += 1;
      const currentShip: any = spaceShips[this.shipIndex];
      this.view.updateCurrentShipDisplay(currentShip);
    }
  }

  btnAboutHandler(): void {
    this.view.sounds.playClickSound();
    this.view.createAboutPage();
  }

  inputUserNameHandler(): void {
    this.model.userName = this.view.userNameInput.value;
  }

  optionsMusicVolumeRangeHandler(): void {
    this.view.sounds.playClickSound();
    this.view.sounds.gameMusicVolume = this.view.options.musicVolumeRange.value;
    this.view.sounds.gameSounds.gameTheme.volume = this.view.options.musicVolumeRange.value;
  }

  optionsEffectsVolumeRangeHandler(): void {
    this.view.sounds.playClickSound();
    this.view.sounds.gameSfxVolume = this.view.options.effectsVolumeRange.value;
  }

  optionsGraphicsLevelRangeHandler(): void {
    this.view.sounds.playClickSound();
    this.model.background.numStars = this.view.options.graphicsLevelRange.value;
    this.model.numberSparks = this.view.options.graphicsLevelRange.value / 10;
    this.view.graphicsLevelValue = this.view.options.graphicsLevelRange.value;
  }

  gameOverEventHandler(): void {
    this.gameOver = true;
    this.view.healthElUpdate(this.model.player.health);
    this.view.sounds.playExplosionSound();
    this.sendUserData();
    setTimeout(() => {
      this.view.sounds.pauseAllSounds();
      this.view.createModal(this.model.score);
      this.view.showStartPage();
    }, 1000);
  }

  updateDisplays(currentScore: number, currentHealth: number): void {
    this.view.scoreElUpdate(currentScore);
    this.view.healthElUpdate(currentHealth);
  }

  getRatingPlayers(): void {
    sendRequest('GET')
      .then((data: any[]) => {
        this.view.createTopList(data);
      })
      .catch((err: any) => console.log(err));
  }

  sendUserData(): void {
    sendRequest('POST', { name: this.model.userName || 'Player', score: this.model.score });
  }
}
