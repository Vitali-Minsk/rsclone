// import gsap from 'gsap';
import Player from './player';
import Projectile from './projectile';
import Particle from './particle';
import Enemy from './enemy';
import StarsBackground from './starsBackground';

export default class Model {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    this.enemiesProjectiles = null;

    this.background = new StarsBackground(this.canvas, this.ctx);
  }

  init(shipIndex) {
    this.player = new Player(this.ctx, this.x, this.y, 10, 'white', shipIndex);
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.enemiesProjectiles = [];
    this.background.initStars();
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
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.updateStars();
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
    this.enemiesProjectiles.forEach((projectile, index) => {
      projectile.update();

      // remove from edges from screen
      if (
        projectile.x + projectile.radius < 0
        || projectile.x - projectile.radius > this.canvas.width
        || projectile.y + projectile.radius < 0
        || projectile.y - projectile.radius > this.canvas.height
      ) {
        this.enemiesProjectiles.splice(index, 1);
      }

      // this.playerHit(projectile);
    });

    this.enemies.forEach((enemy, index) => {
      enemy.update(this.x, this.y);
      // end game
      this.checkEndGame(enemy);

      // hit the enemy
      this.enemyHit(enemy, index);
    });
  }

  enemyHit(enemy, enemyIndex) {
    this.projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      if (dist - projectile.radius < enemy.type.width / 2) {
        this.scoreIncrease();
        this.createCanvasEvent('enemyHit');
        // this.createSparks(enemy.type.width, projectile);
        this.enemyDamage(enemy, projectile, projectileIndex, enemyIndex);
      }
    });
  }

  checkEndGame(enemy) {
    const distEnem = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
    if (distEnem - enemy.type.width / 2 - this.player.type.width / 2 < 1) {
      cancelAnimationFrame(this.animationId);
      this.stopEnemySpawn();
    }
    this.enemiesProjectiles.forEach((enemyProjectile, index) => {
      const distProj = Math.hypot(this.player.x - enemyProjectile.x,
        this.player.y - enemyProjectile.y);
      if (distProj - this.player.type.width / 2 < 1) {
        if (this.player.health >= 1) {
          this.player.health -= 1;
          this.createCanvasEvent('playerHit');
          this.createSparks(1, enemyProjectile, 2);
          this.enemiesProjectiles.splice(index, 1);
        } else {
          this.createSparks(1, enemyProjectile, 4);
          cancelAnimationFrame(this.animationId);
          this.stopEnemySpawn();
          this.createCanvasEvent('playerExplosion');
          // stopSound(this.sounds.gameTheme);
        }
      }
    });
  }

  createSparks(sparksNumber, projectile, particleSize) {
    for (let i = 0; i < sparksNumber; i += 1) {
      this.particles.push(new Particle(
        this.ctx,
        projectile.x,
        projectile.y,
        Math.random() * particleSize,
        projectile.color,
        {
          x: (Math.random() - 0.5) * Math.random() * 8,
          y: (Math.random() - 0.5) * Math.random() * 8,
        },
      ));
    }
  }

  enemyDamage(enemy, projectile, projectileIndex, enemyIndex) {
    if (enemy.health > 1) {
      // gsap.to(enemy, {
      const healthEnemy = enemy;
      healthEnemy.health -= 1;
      this.projectiles.splice(projectileIndex, 1);
      this.createSparks(enemy.type.width, projectile, 1);
    } else {
      this.enemies.splice(enemyIndex, 1);
      this.projectiles.splice(projectileIndex, 1);
      this.createSparks(enemy.type.width, projectile, 5);
      this.createCanvasEvent('enemyExplosion');
    }
  }

  scoreIncrease() {
    this.score += 100;
  }

  startNewGame(ind) {
    this.init(ind);
    this.animate();
    this.spawnEnemies();
    this.enemiesShoot();
  }

  playerMove() {
    if (this.keys.KeyW) {
      this.y -= this.player.type.speed;
    }
    if (this.keys.KeyS) {
      this.y += this.player.type.speed;
    }
    if (this.keys.KeyA) {
      this.x -= this.player.type.speed;
    }
    if (this.keys.KeyD) {
      this.x += this.player.type.speed;
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

  playerShot(event) {
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
        2,
        'white',
        velocity,
      ),
    );
  }

  enemiesShoot() {
    setInterval(() => {
      this.enemies.forEach((enemy, index) => {
        const indRand = Math.floor(Math.random() * this.enemies.length);
        if (indRand === index) {
          this.enemyShot(enemy);
        }
      });
    }, 500);
  }

  enemyShot(enemy) {
    const enemyAngle = enemy.angle;
    const velocity = {
      x: Math.cos(enemyAngle) * 3,
      y: Math.sin(enemyAngle) * 3,
    };

    this.enemiesProjectiles.push(
      new Projectile(
        this.ctx,
        enemy.x,
        enemy.y,
        2,
        enemy.projectileColor,
        velocity,
      ),
    );
    this.createCanvasEvent('enemyShot');
  }

  createCanvasEvent(eventName) {
    const event = new Event(eventName);
    this.canvas.dispatchEvent(event);
  }
}
