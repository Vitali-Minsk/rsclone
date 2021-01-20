import createElement from './utils/createElement';
import pageLayoutElements from './pageLayoutElements';

export default class PageLayout {
  constructor() {
    this.body = document.body;
    this.startPage = null;
    this.canvas = document.createElement('canvas');
    this.mainMenu = pageLayoutElements.mainMenu;
    // this.modal = pageLayoutElements.modal;
    this.scoreEl = null;
    this.scoreWrap = null;
    this.startGameBtn = null;
    this.modal = null;
    this.modalScore = null;
    this.isGameRun = false;
  }

  createStartPage() {
    this.startPage = createElement('div', 'start-page');
    this.body.prepend(this.startPage);
  }

  createMainMenu() {
    this.startPage.insertAdjacentHTML('afterBegin', this.mainMenu);
  }

  createCanvas() {
    this.body.prepend(this.canvas);
    this.canvas.classList.add('hidden');
  }

  createModal() {
    this.body.insertAdjacentHTML('afterBegin', pageLayoutElements.modal);
    this.startGameBtn = document.querySelector('.modal__button');
    this.modal = document.querySelector('.modal');
    this.modalScore = document.querySelector('.modal__score');
  }

  createScore() {
    this.body.insertAdjacentHTML('afterBegin', pageLayoutElements.score);
    this.scoreEl = document.getElementById('scoreEl');
    this.scoreWrap = document.querySelector('.score');
    this.scoreWrap.classList.add('hidden');
  }

  listenEvents(newGame, pauseGame) {
    const handler = (e) => {
      if (e.target.innerHTML === 'New Game') {
        this.startPage.classList.add('hidden');
        this.canvas.classList.remove('hidden');
        this.scoreWrap.classList.remove('hidden');
        newGame();
        this.isGameRun = true;
      }
      if (e.target.innerHTML === 'Continue' && this.isGameRun) {
        this.startPage.classList.add('hidden');
        this.canvas.classList.remove('hidden');
        this.scoreWrap.classList.remove('hidden');
        pauseGame();
      }
    };
    this.startPage.addEventListener('click', handler);

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.isGameRun) {
        this.startPage.classList.toggle('hidden');
        this.canvas.classList.toggle('hidden');
        this.scoreWrap.classList.toggle('hidden');
        pauseGame();
      }
    });
  }
}
