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
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.animationId = null;
    this.timeIdEnemySpawn = null;
    this.timeIdEnemyShot = null;

    this.numberSparks = 10;

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

    this.spawnEnemiesInterval = 2000;
    this.enemiesShotInterval = 500;
    this.enemyProjectileSpeed = 3;

    this.playerProjectileSpeed = 10;
  }

  init(shipIndex) {
    this.player = new Player(this.ctx, this.x, this.y, 10, 'white', shipIndex);
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.enemiesProjectiles = [];
    this.background.initStars();

    this.spawnEnemiesInterval = 2000;
    this.enemiesShotInterval = 500;
    this.enemyProjectileSpeed = 3;
  }

  spawnEnemies() {
    this.timeIdEnemySpawn = setInterval(() => {
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
      enemy.calculateAngle(this.player.x, this.player.y);
      enemy.create();
      this.enemies.push(enemy);
    }, this.spawnEnemiesInterval);
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
    });

    this.enemies.forEach((enemy, index) => {
      enemy.update(this.player.x, this.player.y);
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
        this.difficultyLevelIncrease();
        this.createCanvasEvent('enemyHit');
        this.enemyDamage(enemy, projectile, projectileIndex, enemyIndex);
      }
    });
  }

  checkEndGame(enemy) {
    const distEnem = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
    if (distEnem - enemy.type.width / 2 - this.player.type.width / 2 < 1) {
      cancelAnimationFrame(this.animationId);
      clearInterval(this.timeIdEnemySpawn);
      clearInterval(this.timeIdEnemyShot);
    }
    this.enemiesProjectiles.forEach((enemyProjectile, index) => {
      const distProj = Math.hypot(this.player.x - enemyProjectile.x,
        this.player.y - enemyProjectile.y);
      if (distProj - this.player.type.width / 2 < 1) {
        if (this.player.health >= 1) {
          this.player.health -= 1;
          this.createCanvasEvent('playerHit');
          this.createSparks(enemyProjectile, 2);
          this.enemiesProjectiles.splice(index, 1);
        } else {
          this.createSparks(enemyProjectile, 4);
          this.createCanvasEvent('playerExplosion');
          cancelAnimationFrame(this.animationId);
          clearInterval(this.timeIdEnemySpawn);
          clearInterval(this.timeIdEnemyShot);
        }
      }
    });
  }

  createSparks(projectile, particleSize) {
    for (let i = 0; i < this.numberSparks; i += 1) {
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
      this.createSparks(projectile, 1);
    } else {
      this.enemies.splice(enemyIndex, 1);
      this.projectiles.splice(projectileIndex, 1);
      this.createSparks(projectile, 5);
      this.createCanvasEvent('enemyExplosion');
    }
  }

  scoreIncrease() {
    this.score += 100;
  }

  startNewGame(ind) {
    // this.stopEnemySpawn();
    cancelAnimationFrame(this.animationId);
    clearInterval(this.timeIdEnemySpawn);
    clearInterval(this.timeIdEnemyShot);

    this.init(ind);
    this.animate();
    this.spawnEnemies();
    this.enemiesShoot();

    this.isPause = false;
  }

  playerMove() {
    if (this.keys.KeyW) {
      this.player.y -= this.player.type.speed;
    }
    if (this.keys.KeyS) {
      this.player.y += this.player.type.speed;
    }
    if (this.keys.KeyA) {
      this.player.x -= this.player.type.speed;
    }
    if (this.keys.KeyD) {
      this.player.x += this.player.type.speed;
    }
    // this.player.draw(this.x, this.y);
  }

  mouseMoveHandler(e) {
    this.playerAngle = Math.atan2(e.clientY - this.player.y,
      e.clientX - this.player.x);
    this.player.rotate(this.playerAngle);
  }

  pauseGame() {
    if (!this.isPause) {
      // this.stopEnemySpawn();
      clearInterval(this.timeIdEnemySpawn);
      cancelAnimationFrame(this.animationId);
      this.isPause = true;
    } else {
      this.animate();
      this.spawnEnemies();
      this.isPause = false;
    }
  }

  playerShot(event) {
    this.playerAngle = Math.atan2(event.clientY - this.player.y,
      event.clientX - this.player.x);
    const velocity = {
      x: Math.cos(this.playerAngle) * this.playerProjectileSpeed,
      y: Math.sin(this.playerAngle) * this.playerProjectileSpeed,
    };

    this.projectiles.push(
      new Projectile(
        this.ctx,
        this.player.x,
        this.player.y,
        2,
        'white',
        velocity,
      ),
    );
  }

  enemiesShoot() {
    this.timeIdEnemyShot = setInterval(() => {
      this.enemies.forEach((enemy, index) => {
        const indRand = Math.floor(Math.random() * this.enemies.length);
        if (indRand === index) {
          this.enemyShot(enemy);
        }
      });
    }, this.enemiesShotInterval);
  }

  enemyShot(enemy) {
    const enemyAngle = enemy.angle;
    const velocity = {
      x: Math.cos(enemyAngle) * this.enemyProjectileSpeed,
      y: Math.sin(enemyAngle) * this.enemyProjectileSpeed,
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

  saveGame() {
    localStorage.setItem('player', JSON.stringify(this.player));
    localStorage.setItem('enemies', JSON.stringify(this.enemies));
    localStorage.setItem('score', JSON.stringify(this.score));
  }

  loadGame(func) {
    const player = JSON.parse(localStorage.getItem('player'));
    const enemies = JSON.parse(localStorage.getItem('enemies'));
    const score = JSON.parse(localStorage.getItem('score'));
    this.startNewGame(player.shipIndex);
    this.player = Object.assign(this.player, player, { ctx: this.ctx, img: this.player.img });
    this.enemies = enemies.map((enemy) => Object.assign(new Enemy(this.ctx, 0, 0), enemy,
      { ctx: this.ctx, img: this.player.img }));
    this.score = score;
    func(this.score, this.player.health);
  }

  static checkSaves() {
    if (!localStorage.getItem('player')
    && !localStorage.getItem('enemies')
    && !localStorage.getItem('score')) {
      return false;
    }
    return true;
  }

  difficultyLevelIncrease() {
    if (this.score > 100) {
      if (this.spawnEnemiesInterval > 1500) {
        clearInterval(this.timeIdEnemySpawn);
        this.spawnEnemiesInterval -= 8;
        this.spawnEnemies();
      }
      if (this.enemiesShotInterval > 100) {
        clearInterval(this.timeIdEnemyShot);
        this.enemiesShotInterval -= 0.5;
        this.enemiesShoot();
      }
      if (this.enemyProjectileSpeed < 7) {
        this.enemyProjectileSpeed += 0.001;
      }
      console.log(this.spawnEnemiesInterval, this.enemyProjectileSpeed, this.enemiesShotInterval);
    }
  }
}
