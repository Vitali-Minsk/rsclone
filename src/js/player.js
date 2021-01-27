import shipsImgSource from './shipsImgSource';
import imgSpaceCraft from '../assets/sprite-ships2.png';

export default class Player {
  constructor(ctx, x, y, radius, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.img = new Image(10);
    this.img.src = imgSpaceCraft;
    this.health = 3;
    this.type = null;
  }

  draw(moveX, moveY) {
    this.x = moveX;
    this.y = moveY;
  }

  move(key) {
    if (key.KeyW) {
      this.y -= 1;
    }
    if (key.KeyS) {
      this.y += 1;
    }
    if (key.KeyA) {
      this.x -= 1;
    }
    if (key.KeyD) {
      this.x += 1;
    }
    this.draw();
  }

  rotate(angle) {
    // Сохраняем настройки канваса до всяких манипуляций с ним
    this.ctx.save();

    this.ctx.translate(this.x, this.y);

    // if (Math.abs(angle) > Math.PI / 2) {
    // this.img.src = imgSpaceCraft;
    // this.ctx.scale(1, -1);
    // this.angle = -this.angle;
    // console.log('left');
    // } else {
    // console.log('right');
    // this.img.src = imgSpaceCraft;
    // }

    // Сдвигаем все адресованные пиксели на указанные значения
    // this.ctx.translate(canvas.width/2,canvas.height/2);

    // Поворачиваем на `degrees` наш градус
    this.ctx.rotate(angle);
    this.ctx.translate(-this.x, -this.y);
    // eslint-disable-next-line prefer-destructuring
    this.type = shipsImgSource[0];

    // Рисуем повернутую картинку
    this.ctx.drawImage(this.img,
      shipsImgSource[0].x, shipsImgSource[0].y, shipsImgSource[0].width, shipsImgSource[0].height,
      this.x - shipsImgSource[0].width / 2, this.y - shipsImgSource[0].height / 2,
      shipsImgSource[0].width, shipsImgSource[0].height);

    // Восстанавливаем настройки на момент когда делали `ctx.save`
    // то бишь до `ctx.translate` и `ctx.rotate`. Рисунок при этом сохраняется.
    this.ctx.restore();
  }
}
