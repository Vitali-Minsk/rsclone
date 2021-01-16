import './styles/style.scss';
// import gsap from 'gsap';
import Controller from './controller';

const controller = new Controller();
controller.startBtnEventListener();
controller.spawnEnemies();
controller.windowEventListen();
// controller.drawHead();
