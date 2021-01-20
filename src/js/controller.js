import PageLayout from './PageLayout';
import Model from './Model';

export default class Controller {
  constructor() {
    this.pageLayout = new PageLayout();
    this.model = null;
  }

  init() {
    this.pageLayout.createStartPage();
    this.pageLayout.createMainMenu();
    this.pageLayout.createCanvas();
    this.pageLayout.createScore();
    this.model = new Model(this.pageLayout.canvas, this.pageLayout.scoreEl);
    this.pageLayout.listenEvents(this.model.startNewGame.bind(this.model),
      this.model.pauseGame.bind(this.model));
    this.model.windowEventListen();
  }
}
