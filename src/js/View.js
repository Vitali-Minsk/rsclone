import createElement from './utils/createElement';
import pageLayoutElements from './pageLayoutElements';
import Sounds from './sounds';

export default class View {
  constructor() {
    this.body = document.body;
    this.sounds = new Sounds();
    this.startPage = null;
    this.canvas = null;
    this.scoreEl = null;
    this.scoreWrap = null;
    this.healthEl = null;
    this.healthWrap = null;
    this.startGameBtn = null;
    this.modal = null;
    this.modalScore = null;
    this.isGameRun = false;

    this.menuEventHandlers = null;
    this.canvasEventHandlers = null;

    this.buttons = {};
    this.displays = {};

    this.options = {};

    this.graphicsLevelValue = 100;
  }

  init() {
    this.createStartPage();
    this.createMainMenu();
    this.createScoreDisplay();
    this.createHealthPlayerDisplay();
    this.sounds.init();
  }

  createStartPage() {
    this.startPage = createElement('div', 'start-page');
    this.body.prepend(this.startPage);
  }

  createMainMenu() {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterBegin', pageLayoutElements.mainMenu);
  }

  createProfileMenu() {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterBegin', pageLayoutElements.profileMenu);
    this.buttons.prevShip = document.querySelector('.btn-prev');
    this.buttons.nextShip = document.querySelector('.btn-next');
    this.displays.shipImg = document.querySelector('.profile-menu__img');
    this.displays.shipName = document.querySelector('.profile-menu__ship-name');
    this.displays.shipSpeed = document.querySelector('.profile-menu__ship-speed');
    this.displays.shipHealth = document.querySelector('.profile-menu__ship-health');
  }

  createOptionMenu() {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterBegin', pageLayoutElements.optionsMenu);
    this.options.musicVolumeRange = document.getElementById('musicVolume');
    this.options.effectsVolumeRange = document.getElementById('effectsVolume');
    this.options.musicVolumeRange.value = this.sounds.gameMusicVolume;
    this.options.effectsVolumeRange.value = this.sounds.gameSfxVolume;
    this.options.graphicsLevelRange = document.getElementById('graphicsLevel');
    this.options.graphicsLevelRange.value = this.graphicsLevelValue;
  }

  createAboutPage() {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterBegin', pageLayoutElements.about);
    console.log('Author - Vitali Burakou');
  }

  updatecurrentShipDisplay(ship) {
    this.displays.shipImg.style.backgroundPosition = `${-ship.x}px ${-ship.y}px`;
    this.displays.shipImg.style.width = `${ship.width}px`;
    this.displays.shipImg.style.height = `${ship.height}px`;
    this.displays.shipName.innerHTML = `${ship.name}`;
    this.displays.shipSpeed.innerHTML = `${ship.speed}`;
    this.displays.shipHealth.innerHTML = `${ship.health}`;
  }

  renderCanvas(canvas) {
    this.canvas = canvas;
    this.body.prepend(canvas);
    this.canvas.classList.add('hidden');
  }

  createModal(currentScore) {
    this.body.insertAdjacentHTML('afterBegin', pageLayoutElements.modal);
    this.startGameBtn = document.querySelector('.modal__button');
    this.modal = document.querySelector('.modal');
    this.modalScore = document.querySelector('.modal__score');
    this.modalScore.innerHTML = currentScore;
  }

  createScoreDisplay() {
    this.body.insertAdjacentHTML('afterBegin', pageLayoutElements.score);
    this.scoreEl = document.getElementById('scoreEl');
    this.scoreWrap = document.querySelector('.score');
    this.scoreWrap.classList.add('hidden');
  }

  createHealthPlayerDisplay() {
    this.body.insertAdjacentHTML('afterBegin', pageLayoutElements.health);
    this.healthEl = document.getElementById('healthEl');
    this.healthWrap = document.querySelector('.health');
    this.healthWrap.classList.add('hidden');
  }

  scoreElUpdate(currentScore) {
    this.scoreEl.innerHTML = currentScore;
  }

  healthElUpdate(currentHealth) {
    this.healthEl.innerHTML = currentHealth;
  }

  addMenuListenerEvents() {
    window.addEventListener('click', this.menuEventHandlers);
    window.addEventListener('keydown', this.menuEventHandlers);
    window.addEventListener('input', this.menuEventHandlers);
    window.addEventListener('mouseover', this.onHoverHandler.bind(this));
  }

  addCanvasListenerEvents() {
    this.canvas.addEventListener('click', this.canvasEventHandlers);
    this.canvas.addEventListener('mousemove', this.canvasEventHandlers);
    this.canvas.addEventListener('enemyHit', this.canvasEventHandlers);
    this.canvas.addEventListener('playerHit', this.canvasEventHandlers);
    this.canvas.addEventListener('playerExplosion', this.canvasEventHandlers);
    this.canvas.addEventListener('enemyExplosion', this.canvasEventHandlers);
    this.canvas.addEventListener('enemyShot', this.canvasEventHandlers);
    window.addEventListener('keyup', this.canvasEventHandlers);
    window.addEventListener('keydown', this.canvasEventHandlers);
  }

  removeMenuListenerEvents() {
    window.removeEventListener('click', this.menuEventHandlers);
    window.removeEventListener('keydown', this.menuEventHandlers);
    window.removeEventListener('input', this.menuEventHandlers);
    window.removeEventListener('mouseover', this.onHoverHandler.bind(this));
  }

  removeCanvasEventHandlers() {
    this.canvas.removeEventListener('click', this.canvasEventHandlers);
    this.canvas.removeEventListener('mousemove', this.canvasEventHandlers);
    this.canvas.removeEventListener('enemyHit', this.canvasEventHandlers);
    this.canvas.removeEventListener('playerHit', this.canvasEventHandlers);
    this.canvas.removeEventListener('playerExplosion', this.canvasEventHandlers);
    this.canvas.removeEventListener('enemyExplosion', this.canvasEventHandlers);
    this.canvas.removeEventListener('enemyShot', this.canvasEventHandlers);
    window.removeEventListener('keyup', this.canvasEventHandlers);
    window.removeEventListener('keydown', this.canvasEventHandlers);
  }

  newGameItemHandler() {
    this.startPage.classList.add('hidden');
    this.createMainMenu();
    this.canvas.classList.remove('hidden');
    this.scoreWrap.classList.remove('hidden');
    this.healthWrap.classList.remove('hidden');
    console.log('new game');
    this.isGameRun = true;
    this.addCanvasListenerEvents();
    this.removeMenuListenerEvents();
  }

  pauseEventHandler() {
    if (this.isGameRun) {
      this.startPage.classList.remove('hidden');
      this.canvas.classList.add('hidden');
      this.scoreWrap.classList.add('hidden');
      this.healthWrap.classList.add('hidden');
      this.removeCanvasEventHandlers();
      this.addMenuListenerEvents();
      this.isGameRun = !this.isGameRun;
    } else {
      this.startPage.classList.add('hidden');
      this.canvas.classList.remove('hidden');
      this.scoreWrap.classList.remove('hidden');
      this.healthWrap.classList.remove('hidden');
      this.addCanvasListenerEvents();
      this.removeMenuListenerEvents();
      this.isGameRun = !this.isGameRun;
    }
  }

  onHoverHandler(e) {
    if (e.target.classList.contains('main-menu__item')) {
      this.sounds.playHoverSound();
    }
  }
}
