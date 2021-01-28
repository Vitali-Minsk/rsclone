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
    <button class="modal__button">New Game</button>
  </div>
</div>`,
  score: `<div class="score">
  <span>Score: </span><span id="scoreEl">0</span>
  </div>`,
  health: `<div class="health">
  <span>Health: </span><span id="healthEl">3</span>
  </div>`,
  profileMenu: `
  <div class="profile-menu">
    <div class="profile-menu__form">
      <h3 class="profile-menu__user-name">Enter your name:</h3>
      <input class="profile-menu__input" placeholder="Player">
    </div>
    <h2 class="profile-menu__title">Choose spaceship</h2>
      <div class="profile-menu__ship-wrapper">
        <button class="profile-menu__btn-ship btn-prev"><</button>
        <div class="profile-menu__ship">
        <div class="profile-menu__img-container">
          <div class="profile-menu__img"></div>
        </div>
        <div class="profile-menu__description">
          <h3 class="profile-menu__ship-name">Falcone</h3>
          <p class="profile-menu__text">Speed:
          <span class="profile-menu__ship-speed"></span> Health:
          <span class="profile-menu__ship-health"></span>, 
          asfasf asfasf asfiea
          </p>
        </div>
        
      </div>
      <button class="profile-menu__btn-ship btn-next">></button>
      </div>
      <div class="profile-menu__btn-wrapper">
        <button class="profile-menu__btn-nav btn-main-menu">Main menu</button>
        <button class="profile-menu__btn-nav btn-start-game">Start game</button>
      </div>
  </div>`,
};
