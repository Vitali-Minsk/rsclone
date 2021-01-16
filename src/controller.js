import gsap from 'gsap';
import Player from './player';
import Projectile from './projectile';
import Particle from './particle';
import Enemy from './enemy';
import imgDimaHeadRight from './assets/dima-head.png';
import imgDimaHeadLeft from './assets/dima-head-left.png';

export default class Controller {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.scoreEl = document.querySelector('#scoreEl');
    this.startGameBtn = document.querySelector('.modal__button');
    this.modal = document.querySelector('.modal');
    this.modalScore = document.querySelector('.modal__score');
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.player = new Player(this.x, this.y, 10, 'white');
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.animationId = null;
    this.img = new Image(10);
    this.img.src = imgDimaHeadRight;
    this.img.width = 100;
    this.angle = 0;
    // this.isReversed = false;
  }

  drawHead() {
    // this.img.onload = () => {
    this.ctx.drawImage(this.img, this.img.width / 2,
      this.img.width / 2, this.img.width, this.img.width);
    // };
  }

  headRotate() {
    // const angleDeg = (angle * 180) / Math.PI;
    // this.img.style.transform = `rotate(${angleDeg})`;
    // console.log(angleDeg);
    // this.drawHead();

    // Сохраняем настройки канваса до всяких манипуляций с ним
    this.ctx.save();

    // console.log(this.angle);

    this.ctx.translate(this.x, this.y);

    if (Math.abs(this.angle) > Math.PI / 2) {
      this.img.src = imgDimaHeadLeft;
      // this.ctx.scale(1, -1);
      // this.angle = -this.angle;
      // console.log('left');
    } else {
      // console.log('right');
      this.img.src = imgDimaHeadRight;
    }

    // Сдвигаем все адресованные пиксели на указанные значения
    // this.ctx.translate(canvas.width/2,canvas.height/2);

    // Поворачиваем на `degrees` наш градус
    this.ctx.rotate(this.angle);

    // Рисуем повернутую картинку
    this.ctx.drawImage(this.img, 0 - this.img.width / 2,
      0 - this.img.width / 2, this.img.width, this.img.width);

    // Восстанавливаем настройки на момент когда делали `ctx.save`
    // то бишь до `ctx.translate` и `ctx.rotate`. Рисунок при этом сохраняется.
    this.ctx.restore();
  }

  init() {
    this.player = new Player(this.x, this.y, 10, 'white');
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.scoreEl.innerHTML = this.score;
  }

  spawnEnemies() {
    setInterval(() => {
      const radius = Math.random() * (30 - 4) + 4;

      let x;
      let y;

      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : this.canvas.width + radius;
        y = Math.random() * this.canvas.height;
      } else {
        x = Math.random() * this.canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : this.canvas.height + radius;
      }
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
      const angle = Math.atan2(
        this.canvas.height / 2 - y,
        this.canvas.width / 2 - x,
      );
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
      this.enemies.push(new Enemy(x, y, radius, color, velocity));

      // console.log(this.enemies);
    }, 1000);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // this.player.draw();
    this.headRotate();
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
      enemy.update();

      // end game
      const dist = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
      if (dist - enemy.radius - this.player.radius < 1) {
        cancelAnimationFrame(this.animationId);
        this.modal.classList.remove('modal_hidden');
        this.modalScore.innerHTML = this.score;
      }

      // hit the enemy
      this.projectiles.forEach((projectile, projectileIndex) => {
        const dist1 = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

        if (dist1 - enemy.radius - projectile.radius < 1) {
          // increase score
          this.score += 100;
          this.scoreEl.innerHTML = this.score;
          // create explosions
          for (let i = 0; i < enemy.radius * 2; i += 1) {
            this.particles.push(new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * Math.random() * 8,
                y: (Math.random() - 0.5) * Math.random() * 8,
              },
            ));
          }

          if (enemy.radius - 10 > 10) {
            gsap.to(enemy, {
              radius: enemy.radius - 10,
            });
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
      this.angle = Math.atan2(event.clientY - this.canvas.height / 2,
        event.clientX - this.canvas.width / 2);
      const velocity = {
        x: Math.cos(this.angle) * 5,
        y: Math.sin(this.angle) * 5,
      };

      // console.log(projectiles)

      this.projectiles.push(
        new Projectile(
          this.canvas.width / 2,
          this.canvas.height / 2,
          5,
          'white',
          velocity,
        ),
      );
    });

    window.addEventListener('mousemove', (event) => {
      this.angle = Math.atan2(event.clientY - this.canvas.height / 2,
        event.clientX - this.canvas.width / 2);
      this.headRotate(this.angle);
    });
  }

  startBtnEventListener() {
    this.startGameBtn.addEventListener('click', () => {
      this.init();
      this.animate();

      this.modal.classList.add('modal_hidden');
    });
  }
}
