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

  // Initialise stars
  initStars() {
    for (let i = 0; i < this.numStars; i += 1) {
      this.stars[i] = this.makeStar();
    }
  }

  // Draw stars
  updateStars() {
    // Clear canvas
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw each star
    for (let i = 0; i < this.numStars; i += 1) {
      // Move the star first
      this.stars[i].x -= (this.stars[i].distance ** 2) / (this.canvas.width * this.speed);
      // If it's off-screen, reset it
      if (this.stars[i].x <= 0) {
        this.stars[i] = this.makeStar();
        this.stars[i].x = 1;
      }
      // Draw the star
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
