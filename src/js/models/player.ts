import shipsImgSource from './shipsImgSource';
import imgSpaceCraft from '../../assets/sprite-ships2.png';

export default class Player {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  shipIndex: number;
  img: HTMLImageElement;
  type: any;
  health: any;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, shipIndex: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.shipIndex = shipIndex;

    this.img = new Image();
    this.img.src = imgSpaceCraft;
    this.type = shipsImgSource[this.shipIndex];
    this.health = this.type.health;
  }

  update(angle: number): void {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(angle);
    this.ctx.translate(-this.x, -this.y);
    this.ctx.drawImage(this.img,
      this.type.x, this.type.y, this.type.width, this.type.height,
      this.x - this.type.width / 2, this.y - this.type.height / 2,
      this.type.width, this.type.height);
    this.ctx.restore();
  }
}
