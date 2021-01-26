import PageLayout from './PageLayout';
import Model from './Model';
import Sounds from './sounds';

export default class Controller {
  constructor() {
    this.pageLayout = new PageLayout();
    this.model = null;
    this.sounds = new Sounds();
  }

  init() {
    this.pageLayout.createStartPage();
    this.pageLayout.createMainMenu();
    this.pageLayout.createCanvas();
    this.pageLayout.createScore();
    this.sounds.init();
    this.model = new Model(this.pageLayout.canvas, this.pageLayout.scoreEl, this.sounds.gameSounds);
    this.pageLayout.listenEvents(this.model.startNewGame.bind(this.model),
      this.model.pauseGame.bind(this.model));
    this.model.windowEventListen();
  }
}
//
