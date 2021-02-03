import shipsImgSource from './shipsImgSource';
import imgSpaceCraft from '../../assets/sprite-ships2.png';

export default class Enemy {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  health: any;
  velocity: { x: number, y: number };
  img: HTMLImageElement;
  type: any;
  projectileColor: any;
  angle: number;
  playerX: number;
  playerY: number;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.health = null;
    this.velocity = {
      x, y
    };
    this.img = new Image();
    this.img.src = imgSpaceCraft;
    this.type = null;
    this.angle = 0;
    this.projectileColor = null;

    this.playerX = 0;
    this.playerY = 0;
  }

  create(): void {
    this.type = shipsImgSource[Math.floor(Math.random() * 11)];
    this.health = this.type.health;
    this.projectileColor = this.type.projectileColor;

    this.calculateVelocity();
  }

  draw(): void {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    this.ctx.translate(-this.x, -this.y);

    this.ctx.drawImage(this.img,
      this.type.x, this.type.y, this.type.width, this.type.height,
      this.x - this.type.width / 2, this.y - this.type.height / 2,
      this.type.width, this.type.height);

    this.ctx.restore();
  }

  update(x: number, y: number): void {
    setTimeout(() => {
      this.playerX = x;
      this.playerY = y;
    }, 500);
    this.calculateAngle();
    this.draw();
    this.calculateVelocity();
    this.x += this.velocity.x * this.type.speed * 0.3;
    this.y += this.velocity.y * this.type.speed * 0.3;
  }

  calculateAngle(): void {
    this.angle = Math.atan2(
      this.playerY - this.y,
      this.playerX - this.x,
    );
  }

  calculateVelocity(): void {
    this.velocity = {
      x: Math.cos(this.angle),
      y: Math.sin(this.angle),
    };
  }
}
