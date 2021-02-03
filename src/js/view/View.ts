import createElement from '../utils/createElement';
import pageLayoutElements from './pageLayoutElements';
import Sounds from './sounds';

export default class View {
  body: HTMLElement;
  sounds: Sounds;
  startPage: HTMLElement | null;
  canvas: HTMLCanvasElement;
  scoreEl: HTMLElement | null;
  scoreWrap: HTMLElement | null;
  healthEl: HTMLElement | null;
  healthWrap: HTMLElement | null;
  modalScore: HTMLElement | null;
  isGameRun: boolean;
  menuEventHandlers: any;
  canvasEventHandlers: any;
  buttons: any;
  graphicsLevelValue: number;
  topPage: any;
  userName: any;
  userScore: any;
  displays: { shipImg: any; shipName: any; shipSpeed: any; shipHealth: any; shipLaser: any; };
  userNameInput: any;
  tableTop: any;
  options: any;
  
  constructor() {
    this.body = document.body;
    this.sounds = new Sounds();
    this.startPage = null;
    this.canvas = null;
    this.scoreEl = null;
    this.scoreWrap = null;
    this.healthEl = null;
    this.healthWrap = null;
    this.modalScore = null;
    this.isGameRun = false;

    this.menuEventHandlers = null;
    this.canvasEventHandlers = null;

    this.buttons = {
      prevShip: null,
      nextShip: null,
    };
    this.displays = {
      shipImg: null,
      shipName: null,
      shipSpeed: null,
      shipHealth: null,
      shipLaser: null
    };

    this.options = {
      musicVolumeRange: null,
      effectsVolumeRange: null,
      graphicsLevelRange: null,
    };

    this.graphicsLevelValue = 100;

    this.topPage = null;
    this.userName = null;
    this.userScore = null;
  }

  init(): void {
    this.createStartPage();
    this.createMainMenu();
    this.createScoreDisplay();
    this.createHealthPlayerDisplay();
    this.sounds.init();
  }

  createStartPage(): void {
    this.startPage = createElement('div', 'start-page');
    this.body.prepend(this.startPage);
  }

  createMainMenu(): void {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterbegin', pageLayoutElements.mainMenu);
  }

  createProfileMenu(): void {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterbegin', pageLayoutElements.profileMenu);
    this.buttons.prevShip = document.querySelector('.btn-prev');
    this.buttons.nextShip = document.querySelector('.btn-next');
    this.displays.shipImg = document.querySelector('.profile-menu__img');
    this.displays.shipName = document.querySelector('.profile-menu__ship-name');
    this.displays.shipSpeed = document.querySelector('.profile-menu__ship-speed');
    this.displays.shipHealth = document.querySelector('.profile-menu__ship-health');
    this.displays.shipLaser = document.querySelector('.profile-menu__ship-laser');
    this.userNameInput = document.querySelector('.profile-menu__input');
  }

  createOptionMenu(): void {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterbegin', pageLayoutElements.optionsMenu);
    this.options.musicVolumeRange = document.getElementById('musicVolume');
    this.options.effectsVolumeRange = document.getElementById('effectsVolume');
    this.options.musicVolumeRange.value = this.sounds.gameMusicVolume;
    this.options.effectsVolumeRange.value = this.sounds.gameSfxVolume;
    this.options.graphicsLevelRange = document.getElementById('graphicsLevel');
    this.options.graphicsLevelRange.value = this.graphicsLevelValue;
  }

  createTopPage(): void {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterbegin', pageLayoutElements.topPage);
    this.topPage = document.querySelector('.top-page');
    this.tableTop = document.querySelector('.top-page__tbody');
  }

  createTopList(list: any[]): void {
    const fragment = document.createDocumentFragment();
    list.forEach((item, i) => {
      const tr = document.createElement('tr');
      tr.insertAdjacentHTML('afterbegin', `<td>${i + 1}</td><td>${item.name}</td><td>${item.score}</td>`);
      fragment.append(tr);
    });
    this.tableTop.append(fragment);
  }

  createAboutPage(): void {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterbegin', pageLayoutElements.about);
  }

  updateCurrentShipDisplay(ship: { x: number; y: number; width: number; height: number; name: number; speed: number; health: number; projectileSpeed: number; }): void {
    this.displays.shipImg.style.backgroundPosition = `${-ship.x}px ${-ship.y}px`;
    this.displays.shipImg.style.width = `${ship.width}px`;
    this.displays.shipImg.style.height = `${ship.height}px`;
    this.displays.shipName.innerHTML = `${ship.name}`;
    this.displays.shipSpeed.innerHTML = `${ship.speed}`;
    this.displays.shipHealth.innerHTML = `${ship.health}`;
    this.displays.shipLaser.innerHTML = `${ship.projectileSpeed}`;
  }

  renderCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.body.prepend(canvas);
    this.canvas.classList.add('hidden');
  }

  createTooltip(message: string, timer: number): void {
    const tooltip = createElement('div', 'tooltip', `<p class="tooltip__message">${message}</p>`);
    this.body.prepend(tooltip);
    setTimeout(() => tooltip.remove(), timer);
  }

  createModal(currentScore: number): void {
    this.startPage.innerHTML = '';
    this.startPage.insertAdjacentHTML('afterbegin', pageLayoutElements.modal);
    this.modalScore = document.querySelector('.modal__score');
    this.modalScore.innerHTML = currentScore.toString();
  }

  createScoreDisplay(): void {
    this.body.insertAdjacentHTML('afterbegin', pageLayoutElements.score);
    this.scoreEl = document.getElementById('scoreEl');
    this.scoreWrap = document.querySelector('.score');
    this.scoreWrap.classList.add('hidden');
  }

  createHealthPlayerDisplay(): void {
    this.body.insertAdjacentHTML('afterbegin', pageLayoutElements.health);
    this.healthEl = document.getElementById('healthEl');
    this.healthWrap = document.querySelector('.health');
    this.healthWrap.classList.add('hidden');
  }

  scoreElUpdate(currentScore: number): void {
    this.scoreEl.innerHTML = currentScore.toString();
  }

  healthElUpdate(currentHealth: number): void {
    this.healthEl.innerHTML = currentHealth.toString();
  }

  addMenuListenerEvents(): void {
    window.addEventListener('click', this.menuEventHandlers);
    window.addEventListener('keydown', this.menuEventHandlers);
    window.addEventListener('input', this.menuEventHandlers);
    window.addEventListener('mouseover', this.onHoverHandler.bind(this));
  }

  addCanvasListenerEvents(): void {
    this.canvas.addEventListener('click', this.canvasEventHandlers);
    this.canvas.addEventListener('mousemove', this.canvasEventHandlers);
    this.canvas.addEventListener('enemyHit', this.canvasEventHandlers);
    this.canvas.addEventListener('playerHit', this.canvasEventHandlers);
    this.canvas.addEventListener('gameOver', this.canvasEventHandlers);
    this.canvas.addEventListener('enemyExplosion', this.canvasEventHandlers);
    this.canvas.addEventListener('enemyShot', this.canvasEventHandlers);
    window.addEventListener('keyup', this.canvasEventHandlers);
    window.addEventListener('keydown', this.canvasEventHandlers);
  }

  removeMenuListenerEvents(): void {
    window.removeEventListener('click', this.menuEventHandlers);
    window.removeEventListener('keydown', this.menuEventHandlers);
    window.removeEventListener('input', this.menuEventHandlers);
    window.removeEventListener('mouseover', this.onHoverHandler.bind(this));
  }

  removeCanvasListenersEvents(): void {
    this.canvas.removeEventListener('click', this.canvasEventHandlers);
    this.canvas.removeEventListener('mousemove', this.canvasEventHandlers);
    this.canvas.removeEventListener('enemyHit', this.canvasEventHandlers);
    this.canvas.removeEventListener('playerHit', this.canvasEventHandlers);
    this.canvas.removeEventListener('gameOver', this.canvasEventHandlers);
    this.canvas.removeEventListener('enemyExplosion', this.canvasEventHandlers);
    this.canvas.removeEventListener('enemyShot', this.canvasEventHandlers);
    window.removeEventListener('keyup', this.canvasEventHandlers);
    window.removeEventListener('keydown', this.canvasEventHandlers);
  }

  newGameItemHandler(): void {
    this.startPage.classList.add('hidden');
    this.createMainMenu();
    this.canvas.classList.remove('hidden');
    this.scoreWrap.classList.remove('hidden');
    this.healthWrap.classList.remove('hidden');
    this.isGameRun = true;
    this.addCanvasListenerEvents();
    this.removeMenuListenerEvents();
  }

  pauseEventHandler(): void {
    if (this.isGameRun) {
      this.showStartPage();
      this.isGameRun = !this.isGameRun;
    } else {
      this.showGamePage();
      this.isGameRun = !this.isGameRun;
    }
  }

  onHoverHandler(e: { target: { classList: { contains: (arg0: string) => any; }; }; }) {
    if (e.target.classList.contains('main-menu__item')) {
      this.sounds.playHoverSound();
    }
  }

  showStartPage(): void {
    this.startPage.classList.remove('hidden');
    this.canvas.classList.add('hidden');
    this.scoreWrap.classList.add('hidden');
    this.healthWrap.classList.add('hidden');
    this.removeCanvasListenersEvents();
    this.addMenuListenerEvents();
  }

  showGamePage(): void {
    this.startPage.classList.add('hidden');
    this.canvas.classList.remove('hidden');
    this.scoreWrap.classList.remove('hidden');
    this.healthWrap.classList.remove('hidden');
    this.addCanvasListenerEvents();
    this.removeMenuListenerEvents();
  }
}
