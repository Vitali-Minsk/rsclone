import explosionImgSrc from '../assets/boom.png';

export default class Explosion {
  constructor(ctx, pos, timer) {
    this.ctx = ctx;
    this.pos = pos;
    this.timer = timer;
    this.size = 256;
    this.frames = [];
    this.index = 0;
    this.img = new Image();
    this.img.src = explosionImgSrc;
  }

  render() {
    if (this.frames.length === 0) {
      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          this.frames.push({
            x: j * this.size,
            y: i * this.size,
            w: this.size,
            h: this.size,
          });
        }
      }
    }

    const frame = this.frames[this.index];
    const dx = this.pos.x;
    const dy = this.pos.y;
    const sx = frame.x;
    const sy = frame.y;
    const { w } = frame;
    const { h } = frame;

    this.ctx.drawImage(this.img,
      sx, sy,
      w, h,
      dx - w / 2, dy - h / 2,
      w, h);

    this.index += 1;
  }
}
