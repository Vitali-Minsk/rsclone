import createElement from './utils/createElement';
import pageLayoutElements from './pageLayoutElements';
import Sounds from './sounds';

export default class View {
  constructor() {
    this.body = document.body;
    this.sounds = new Sounds();
    this.startPage = null;
    this.canvas = null;
    this.mainMenu = pageLayoutElements.mainMenu;
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
    this.startPage.insertAdjacentHTML('afterBegin', this.mainMenu);
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
      console.log('pause');
      this.removeCanvasEventHandlers();
      this.addMenuListenerEvents();
      this.isGameRun = !this.isGameRun;
    } else {
      this.startPage.classList.add('hidden');
      this.canvas.classList.remove('hidden');
      this.scoreWrap.classList.remove('hidden');
      this.healthWrap.classList.remove('hidden');
      console.log('pause');
      this.addCanvasListenerEvents();
      this.removeMenuListenerEvents();
      this.isGameRun = !this.isGameRun;
    }
  }
}
