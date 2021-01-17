import './styles/style.scss';
// import gsap from 'gsap';
import Controller from './js/controller';

const controller = new Controller();
controller.startBtnEventListener();
controller.spawnEnemies();
controller.windowEventListen();
// controller.drawHead();
