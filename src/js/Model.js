// import gsap from 'gsap';
import Player from './player';
import Projectile from './projectile';
import Particle from './particle';
import Enemy from './enemy';

export default class Model {
  constructor(canvas, scoreEl) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.scoreEl = scoreEl;
    // this.startGameBtn = document.querySelector('.modal__button');
    // this.modal = document.querySelector('.modal');
    // this.modalScore = document.querySelector('.modal__score');
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.player = new Player(this.ctx, this.x, this.y, 10, 'white');
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.animationId = null;
    this.timeId = false;

    this.playerAngle = 0;
    this.enemyAngle = 0;

    this.keys = {
      KeyW: false,
      KeyS: false,
      KeyA: false,
      KeyD: false,
    };

    this.isPause = false;
    this.mouseMoveHandlerBind = null;
  }

  init() {
    this.player = new Player(this.ctx, this.x, this.y, 10, 'white');
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
  }

  spawnEnemies() {
    this.timeId = setInterval(() => {
      let enemyX;
      let enemyY;

      if (Math.random() < 0.5) {
        enemyX = Math.random() < 0.5 ? 0 - 50 : this.canvas.width + 50;
        enemyY = Math.random() * this.canvas.height;
      } else {
        enemyX = Math.random() * this.canvas.width;
        enemyY = Math.random() < 0.5 ? 0 - 50 : this.canvas.height + 50;
      }
      const enemy = new Enemy(this.ctx, enemyX, enemyY);
      enemy.calculateAngle(this.x, this.y);
      enemy.create();
      this.enemies.push(enemy);
    }, 2000);
  }

  stopEnemySpawn() {
    clearInterval(this.timeId);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.playerMove();
    this.player.rotate(this.playerAngle);
    this.particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      } else {
        particle.update();
      }
    });
    this.projectiles.forEach((projectile, index) => {
      projectile.update();

      // remove from edges from screen
      if (
        projectile.x + projectile.radius < 0
        || projectile.x - projectile.radius > this.canvas.width
        || projectile.y + projectile.radius < 0
        || projectile.y - projectile.radius > this.canvas.height
      ) {
        this.projectiles.splice(index, 1);
      }
    });

    this.enemies.forEach((enemy, index) => {
      enemy.update(this.x, this.y);
      // end game
      const dist = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
      if (dist - enemy.radius - this.player.radius < 1) {
        cancelAnimationFrame(this.animationId);
        // this.modal.classList.remove('modal_hidden');
        // this.modalScore.innerHTML = this.score;
        // this.updateScoreDisplay();
        this.stopEnemySpawn();
      }

      // hit the enemy
      this.projectiles.forEach((projectile, projectileIndex) => {
        const dist1 = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

        if (dist1 - projectile.radius < enemy.type.width / 2) {
          // increase score
          this.score += 100;
          this.scoreEl.innerHTML = this.score;
          // create explosions
          for (let i = 0; i < enemy.type.width * 2; i += 1) {
            this.particles.push(new Particle(
              this.ctx,
              projectile.x,
              projectile.y,
              Math.random() * 2,
              'red',
              {
                x: (Math.random() - 0.5) * Math.random() * 8,
                y: (Math.random() - 0.5) * Math.random() * 8,
              },
            ));
          }

          if (enemy.health > 1) {
            // gsap.to(enemy, {
            const healthEnemy = enemy;
            healthEnemy.health -= 1;
            // enemy.health -= 1;
            // });
            this.projectiles.splice(projectileIndex, 1);
          } else {
            this.enemies.splice(index, 1);
            this.projectiles.splice(projectileIndex, 1);
          }
        }
      });
    });
  }

  windowEventListen() {
    window.addEventListener('click', (event) => {
      this.playerAngle = Math.atan2(event.clientY - this.y,
        event.clientX - this.x);
      const velocity = {
        x: Math.cos(this.playerAngle) * 5,
        y: Math.sin(this.playerAngle) * 5,
      };

      this.projectiles.push(
        new Projectile(
          this.ctx,
          this.x,
          this.y,
          5,
          'white',
          velocity,
        ),
      );
    });

    this.mouseMoveHandlerBind = (this.mouseMoveHandler).bind(this);
    window.addEventListener('mousemove', this.mouseMoveHandlerBind);

    window.addEventListener('keydown', (event) => {
      if (event.code === 'KeyW' || event.code === 'KeyS' || event.code === 'KeyA' || event.code === 'KeyD') {
        this.keys[event.code] = true;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.code === 'KeyW' || event.code === 'KeyS' || event.code === 'KeyA' || event.code === 'KeyD') {
        this.keys[event.code] = false;
      }
    });
    window.addEventListener('keyup', (event) => {
      if (event.code === 'KeyP') {
        this.pauseGame();
      }
    });
  }

  // startBtnEventListener() {
  //   this.startGameBtn.addEventListener('click', () => {
  //     this.init();
  //     this.animate();
  //     this.spawnEnemies();
  //     this.modal.classList.add('modal_hidden');
  //   });
  // }

  startNewGame() {
    this.init();
    this.animate();
    this.spawnEnemies();
  }

  playerMove() {
    if (this.keys.KeyW) {
      this.y -= 4;
    }
    if (this.keys.KeyS) {
      this.y += 4;
    }
    if (this.keys.KeyA) {
      this.x -= 4;
    }
    if (this.keys.KeyD) {
      this.x += 4;
    }
    this.player.draw(this.x, this.y);
  }

  mouseMoveHandler(e) {
    this.playerAngle = Math.atan2(e.clientY - this.y,
      e.clientX - this.x);
    this.player.rotate(this.playerAngle);
  }

  pauseGame() {
    if (!this.isPause) {
      this.stopEnemySpawn();
      cancelAnimationFrame(this.animationId);
      this.isPause = true;
      window.removeEventListener('mousemove', this.mouseMoveHandlerBind);
    } else {
      this.animate();
      this.spawnEnemies();
      this.isPause = false;
      window.addEventListener('mousemove', this.mouseMoveHandlerBind);
    }
  }
}
