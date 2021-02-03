export default class Projectile {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number; };
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, velocity: { x: number, y: number }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(): void {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
