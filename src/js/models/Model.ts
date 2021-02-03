import Player from './player';
import Projectile from './projectile';
import Particle from './particle';
import Enemy from './enemy';
import StarsBackground from './starsBackground';
import Explosion from './explosion';

export default class Model {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  projectiles: any[];
  enemies: any[];
  particles: any[];
  score: number;
  animationId: any;
  timeIdEnemySpawn: any;
  timeIdEnemyShot: any;
  numberSparks: number;
  playerAngle: number;
  enemyAngle: number;
  keys: { KeyW: boolean; KeyS: boolean; KeyA: boolean; KeyD: boolean; };
  isPause: boolean;
  enemiesProjectiles: any;
  mouseMoveHandlerBind: any;
  background: StarsBackground;
  difficultyLevel: {
    spawnEnemiesInterval: number,
    enemiesShotInterval: number,
    enemyProjectileSpeed: number,
  }
  playerProjectileSpeed: number;
  explosions: any[];
  userName: string;
  player: Player;
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

    this.difficultyLevel = {
      spawnEnemiesInterval: 2000,
      enemiesShotInterval: 500,
      enemyProjectileSpeed: 3
    };

    this.playerProjectileSpeed = 10;

    this.explosions = [];
    this.userName = 'Player';
  }

  init(shipIndex: number): void {
    this.player = new Player(this.ctx, this.x, this.y, shipIndex);
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.enemiesProjectiles = [];
    this.background.initStars();

    this.difficultyLevel = {
      spawnEnemiesInterval: 2000,
      enemiesShotInterval: 500,
      enemyProjectileSpeed: 3,
    };
  }

  spawnEnemies(): void {
    this.timeIdEnemySpawn = setInterval(() => {
      let enemyX: number;
      let enemyY: number;

      if (Math.random() < 0.5) {
        enemyX = Math.random() < 0.5 ? 0 - 50 : this.canvas.width + 50;
        enemyY = Math.random() * this.canvas.height;
      } else {
        enemyX = Math.random() * this.canvas.width;
        enemyY = Math.random() < 0.5 ? 0 - 50 : this.canvas.height + 50;
      }
      const enemy = new Enemy(this.ctx, enemyX, enemyY);
      enemy.calculateAngle();
      enemy.create();
      this.enemies.push(enemy);
    }, this.difficultyLevel.spawnEnemiesInterval);
  }

  animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.updateStars();
    this.playerMove();
    this.player.update(this.playerAngle);
    this.particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      } else {
        particle.update();
      }
    });
    this.explosions.forEach((explosion, index) => {
      if (explosion.index >= 63) {
        this.explosions.splice(1, index);
      } else {
        explosion.render();
      }
    });
    this.projectiles.forEach((projectile, index) => {
      projectile.update();
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
      this.checkEndGame(enemy, index);
      this.enemyHit(enemy, index);
    });
  }

  enemyHit(enemy: { x: number; y: number; type: { width: number; height: number; }; health: number; }, enemyIndex: number): void {
    this.projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      if (dist - projectile.radius < (enemy.type.width + enemy.type.height) / 4 + 5) {
        this.difficultyLevelIncrease();
        this.createCanvasEvent('enemyHit');
        const currentEnemy = enemy;
        currentEnemy.health -= this.player.type.projectileSpeed;

        if (enemy.health > 0) {
          this.projectiles.splice(projectileIndex, 1);
          this.createSparks(projectile, 1);
          this.scoreIncrease(100);
        } else {
          this.enemies.splice(enemyIndex, 1);
          this.projectiles.splice(projectileIndex, 1);
          this.createSparks(projectile, 5);
          this.createCanvasEvent('enemyExplosion');
          this.createExplosion({ x: enemy.x, y: enemy.y });
          this.scoreIncrease(300);
        }
      }
    });
  }

  checkEndGame(enemy: { x: number; y: number; type: { width: number; }; }, enemyIndex: number): void {
    const distEnem = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);

    if (distEnem - enemy.type.width / 2 - this.player.type.width / 2 < 1) {
      this.gameOver();
      this.enemies.splice(enemyIndex, 1);
      this.createCanvasEvent('enemyExplosion');
      this.createExplosion({ x: enemy.x, y: enemy.y });
    }
    this.enemiesProjectiles.forEach((enemyProjectile, index) => {
      const distProj = Math.hypot(this.player.x - enemyProjectile.x,
        this.player.y - enemyProjectile.y);

      if (distProj - (this.player.type.width + this.player.type.height) / 4 < 1) {
        if (this.player.health >= 1) {
          this.player.health -= 1;
          this.createCanvasEvent('playerHit');
          this.createSparks(enemyProjectile, 2);
          this.enemiesProjectiles.splice(index, 1);
        } else {
          this.createSparks(enemyProjectile, 4);
          this.gameOver();
        }
      }
    });
  }

  createSparks(projectile: { x: number; y: number; color: string; }, particleSize: number): void {
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

  scoreIncrease(num: number): void {
    this.score += num;
  }

  startNewGame(ind: number): void {
    cancelAnimationFrame(this.animationId);
    clearInterval(this.timeIdEnemySpawn);
    clearInterval(this.timeIdEnemyShot);

    this.init(ind);
    this.animate();
    this.spawnEnemies();
    this.enemiesShoot();

    this.isPause = false;
  }

  playerMove(): void {
    if (this.keys.KeyW) {
      this.player.y -= this.player.type.speed * 1.4;
    }
    if (this.keys.KeyS) {
      this.player.y += this.player.type.speed * 1.4;
    }
    if (this.keys.KeyA) {
      this.player.x -= this.player.type.speed * 1.4;
    }
    if (this.keys.KeyD) {
      this.player.x += this.player.type.speed * 1.4;
    }
  }

  mouseMoveHandler(e: { type?: string; code?: string; clientY?: any; clientX?: any; }): void {
    this.playerAngle = Math.atan2(e.clientY - this.player.y,
      e.clientX - this.player.x);
    this.player.update(this.playerAngle);
  }

  pauseGame(): void {
    if (!this.isPause) {
      clearInterval(this.timeIdEnemySpawn);
      cancelAnimationFrame(this.animationId);
      this.isPause = true;
    } else {
      this.animate();
      this.spawnEnemies();
      this.isPause = false;
    }
  }

  playerShot(event: { type?: string; code?: string; clientY?: number; clientX?: number; }): void {
    this.playerAngle = Math.atan2(event.clientY - this.player.y,
      event.clientX - this.player.x);
    const velocity = {
      x: Math.cos(this.playerAngle) * this.player.type.projectileSpeed,
      y: Math.sin(this.playerAngle) * this.player.type.projectileSpeed,
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

  enemiesShoot(): void {
    this.timeIdEnemyShot = setInterval(() => {
      this.enemies.forEach((enemy, index) => {
        const indRand = Math.floor(Math.random() * this.enemies.length);
        if (indRand === index) {
          this.enemyShot(enemy);
        }
      });
    }, this.difficultyLevel.enemiesShotInterval);
  }

  enemyShot(enemy: { angle: number; x: number; y: number; projectileColor: string; }): void {
    const enemyAngle = enemy.angle;
    const velocity = {
      x: Math.cos(enemyAngle) * this.difficultyLevel.enemyProjectileSpeed,
      y: Math.sin(enemyAngle) * this.difficultyLevel.enemyProjectileSpeed,
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

  createCanvasEvent(eventName: string): void {
    const event = new Event(eventName);
    this.canvas.dispatchEvent(event);
  }

  saveGame(): void {
    localStorage.setItem('player', JSON.stringify(this.player));
    localStorage.setItem('enemies', JSON.stringify(this.enemies));
    localStorage.setItem('score', JSON.stringify(this.score));
    localStorage.setItem('difficultyLevel', JSON.stringify(this.difficultyLevel));
  }

  loadGame(func: (arg0: number, arg1: number) => void): void {
    const player = JSON.parse(localStorage.getItem('player'));
    const enemies = JSON.parse(localStorage.getItem('enemies'));
    const score = JSON.parse(localStorage.getItem('score'));
    const difficultyLevel = JSON.parse(localStorage.getItem('difficultyLevel'));
    this.difficultyLevel = difficultyLevel;
    this.startNewGame(player.shipIndex);
    this.player = Object.assign(this.player, player, { ctx: this.ctx, img: this.player.img });
    this.enemies = enemies.map((enemy: object) => Object.assign(new Enemy(this.ctx, 0, 0), enemy,
      { ctx: this.ctx, img: this.player.img }));
    this.score = score;
    func(this.score, this.player.health);
  }

  static checkSaves(): boolean {
    if (!localStorage.getItem('player')
    && !localStorage.getItem('enemies')
    && !localStorage.getItem('score')) {
      return false;
    }
    return true;
  }

  difficultyLevelIncrease(): void {
    if (this.score > 100) {
      if (this.difficultyLevel.spawnEnemiesInterval > 1000) {
        clearInterval(this.timeIdEnemySpawn);
        this.difficultyLevel.spawnEnemiesInterval -= 15;
        this.spawnEnemies();
      }
      if (this.difficultyLevel.enemiesShotInterval > 100) {
        clearInterval(this.timeIdEnemyShot);
        this.difficultyLevel.enemiesShotInterval -= 0.5;
        this.enemiesShoot();
      }
      if (this.difficultyLevel.enemyProjectileSpeed < 7) {
        this.difficultyLevel.enemyProjectileSpeed += 0.001;
      }
    }
  }

  createExplosion(pos: { x: number; y: number; }): void {
    const explosion = new Explosion(this.ctx, pos);
    this.explosions.push(explosion);
  }

  gameOver(): void {
    this.createCanvasEvent('gameOver');
    this.createExplosion({ x: this.player.x, y: this.player.y });
    this.player.x = -1000;
    this.player.y = -1000;
    clearInterval(this.timeIdEnemySpawn);
    clearInterval(this.timeIdEnemyShot);
    setTimeout(() => cancelAnimationFrame(this.animationId), 1000);
  }
}
