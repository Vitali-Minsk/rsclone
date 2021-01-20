import './styles/style.scss';
import './styles/startPage.scss';
import './styles/mainMenu.scss';

// import gsap from 'gsap';
import Controller from './js/Controller';
// import PageLayout from './js/PageLayout';
// import gameGif from './assets/gameGif.gif';

// const pageLayout = new PageLayout();
// pageLayout.createStartPage();
// pageLayout.createModal();
// pageLayout.createCanvas();
const controller = new Controller();
controller.init();
// controller.startBtnEventListener();
// controller.spawnEnemies();
// controller.windowEventListen();
// controller.drawHead();
// pageLayout.listenEvents(pageLayout.createScore);
