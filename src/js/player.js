import imgDimaHeadRight from '../assets/dima-head.png';
import imgDimaHeadLeft from '../assets/dima-head-left.png';

// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');

export default class Player {
  constructor(ctx, x, y, radius, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.img = new Image(10);
    this.img.src = imgDimaHeadRight;
    this.img.width = 100;
  }

  draw(moveX, moveY) {
    this.x = moveX;
    this.y = moveY;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  move(key) {
    if (key.KeyW) {
      this.y -= 4;
    }
    if (key.KeyS) {
      this.y += 4;
    }
    if (key.KeyA) {
      this.x -= 4;
    }
    if (key.KeyD) {
      this.x += 4;
    }
    this.draw();
  }

  rotate(angle) {
    // Сохраняем настройки канваса до всяких манипуляций с ним
    this.ctx.save();

    this.ctx.translate(this.x, this.y);

    if (Math.abs(angle) > Math.PI / 2) {
      this.img.src = imgDimaHeadLeft;
      // this.ctx.scale(1, -1);
      // this.angle = -this.angle;
      // console.log('left');
    } else {
      // console.log('right');
      this.img.src = imgDimaHeadRight;
    }

    // Сдвигаем все адресованные пиксели на указанные значения
    // this.ctx.translate(canvas.width/2,canvas.height/2);

    // Поворачиваем на `degrees` наш градус
    this.ctx.rotate(angle);

    // Рисуем повернутую картинку
    this.ctx.drawImage(this.img, 0 - this.img.width / 2,
      0 - this.img.width / 2, this.img.width, this.img.width);

    // Восстанавливаем настройки на момент когда делали `ctx.save`
    // то бишь до `ctx.translate` и `ctx.rotate`. Рисунок при этом сохраняется.
    this.ctx.restore();
  }
}
