export default {
  mainMenu: `<div class="main-menu">
    <ul class="main-menu__list">
      <li class="main-menu__item">New Game</li>
      <li class="main-menu__item">Continue</li>
      <li class="main-menu__item">Save Game</li>
      <li class="main-menu__item">Load Game</li>
      <li class="main-menu__item">Top List</li>
      <li class="main-menu__item">Options</li>
    </ul>
  </div>`,
  modal: `<div class="modal">
  <div class="modal__inner">
    <h1 class="modal__score">0</h1>
    <p class="modal__text">Points</p>
    <button class="modal__button">Start Game</button>
  </div>
</div>`,
  score: `<div class="score">
  <span>Score: </span><span id="scoreEl">0</span>
  </div>`,
};
