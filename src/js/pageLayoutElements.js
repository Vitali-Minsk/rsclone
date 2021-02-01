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
  <h2 class="modal__message">GAME OVER</h2>
    <p class="modal__score">0</p>
    <p class="modal__text">Points</p>
  <div class="profile-menu__btn-wrapper">
    <button class="profile-menu__btn-nav btn btn-main-menu">Main menu</button>
    <button class="profile-menu__btn-nav btn btn-start-game">Start game</button>
  </div>
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
        <button class="profile-menu__btn-nav btn btn-main-menu">Main menu</button>
        <button class="profile-menu__btn-nav btn btn-start-game">Start game</button>
      </div>
  </div>`,
  optionsMenu: `
  <div class="options">
    <h2 class="options__title">Options</h2>
  
    <div class="options__slide-container">
      <p class="options__slider-description">Sounds effects volume:</p>
      <input type="range" min="0" max="1" value="1" step="0.1" class="slider" id="effectsVolume">
    </div>
    <div class="options__slide-container">
      <p class="options__slider-description">Music volume:</p>
      <input type="range" min="0" max="1" value="1" step="0.1" class="slider" id="musicVolume">
    </div>
    <div class="options__slide-container">
      <p class="options__slider-description">Graphics level:</p>
      <input type="range" min="0" max="100" value="100" step="1" class="slider" id="graphicsLevel">
    </div>
    <div class="options__slide-container">
      <p class="options__slider-description">Bonuses:</p>
      <input type="range" min="1" max="100" value="50" step="10" class="slider" id="bonuses">
    </div>
    <div class="options__btn-wrapper">
      <button class="options__btn-nav btn btn-main-menu">Main menu</button>
      <button class="options__btn-nav btn btn-about">About</button>
    </div>
  </div>
  `,
  about: `
  <div class="about">
  <h2 class="about__title">About</h2>

  <div class="about__info-container">
    <p class="about__text">Vitali Burakou</p>
    <a class="about__link" href="mailto:vitali.burakou@gmail.com"><img class="about__icon" src="https://www.kindpng.com/picc/m/164-1649451_email-transparency-portable-network-graphics-computer-email-icons.png" width="20">vitali.burakou@gmail.com</a>
    <a class="about__link" href="#"><img class="about__icon" src="https://th.bing.com/th/id/OIP.H78e62IgOKHqLmIDbTN4igHaHa?w=161&h=180&c=7&o=5&pid=1.7" width="20">https://github.com/Vitali-Minsk</a>
  </div>
  <div class="about__info-container">
    <p class="about__text">RSSchool</p>
    <a class="about__link" href="https://rs.school/js/"><img class="about__icon" src="https://rs.school/images/rs_school_js.svg" height="20">https://rs.school/js/</a>
  </div>
  <div class="options__btn-wrapper">
  <button class="options__btn-nav btn btn-main-menu">Main menu</button>
</div>
</div>
  `,
};
