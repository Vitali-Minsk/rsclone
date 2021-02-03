export default class StarsBackground {
  canvas: HTMLCanvasElement ;
  ctx: CanvasRenderingContext2D;
  stars: any[];
  numStars: number;
  speed: number;
  constructor(canvas: any, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.stars = [];
    this.numStars = 100;
    this.speed = 5;
  }

  makeStar(): object {
    return {
      x: Math.random(),
      y: Math.random(),
      distance: Math.sqrt(Math.random()),
      color: `hsl(${Math.random() * 40},100%,${70 + Math.random() * 30}%)`,
    };
  }

  initStars(): void {
    for (let i = 0; i < this.numStars; i += 1) {
      this.stars[i] = this.makeStar();
    }
  }

  updateStars(): void {
    for (let i = 0; i < this.numStars; i += 1) {
      this.stars[i].x -= (this.stars[i].distance ** 2) / (this.canvas.width * this.speed);
      if (this.stars[i].x <= 0) {
        this.stars[i] = this.makeStar();
        this.stars[i].x = 1;
      }
      this.ctx.beginPath();
      this.ctx.arc(this.stars[i].x * this.canvas.width,
        this.stars[i].y * this.canvas.height, this.stars[i].distance * 2, 0, 2 * Math.PI, false);
      this.ctx.lineWidth = this.stars[i].distance * 4;
      this.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      this.ctx.stroke();
      this.ctx.fillStyle = this.stars[i].color;
      this.ctx.fill();
    }
  }
}
