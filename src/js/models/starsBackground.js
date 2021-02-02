export default class StarsBackground {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.stars = [];
    this.numStars = 100;
    this.speed = 5;
  }

  // eslint-disable-next-line class-methods-use-this
  makeStar() {
    return {
      x: Math.random(),
      y: Math.random(),
      distance: Math.sqrt(Math.random()),
      color: `hsl(${Math.random() * 40},100%,${70 + Math.random() * 30}%)`,
    };
  }

  initStars() {
    for (let i = 0; i < this.numStars; i += 1) {
      this.stars[i] = this.makeStar();
    }
  }

  updateStars() {
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
