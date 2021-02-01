import shipsImgSource from './shipsImgSource';
import imgSpaceCraft from '../assets/sprite-ships2.png';

export default class Player {
  constructor(ctx, x, y, radius, color, shipIndex) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.shipIndex = shipIndex;

    this.img = new Image(10);
    this.img.src = imgSpaceCraft;
    this.health = 3;
    this.type = shipsImgSource[this.shipIndex];
  }

  rotate(angle) {
    // Сохраняем настройки канваса до всяких манипуляций с ним
    this.ctx.save();

    this.ctx.translate(this.x, this.y);

    // Сдвигаем все адресованные пиксели на указанные значения
    // this.ctx.translate(canvas.width/2,canvas.height/2);

    // Поворачиваем на `degrees` наш градус
    this.ctx.rotate(angle);
    this.ctx.translate(-this.x, -this.y);

    // Рисуем повернутую картинку
    this.ctx.drawImage(this.img,
      this.type.x, this.type.y, this.type.width, this.type.height, // исходные координаты
      this.x - this.type.width / 2, this.y - this.type.height / 2,
      this.type.width, this.type.height);

    // Восстанавливаем настройки на момент когда делали `ctx.save`
    // то бишь до `ctx.translate` и `ctx.rotate`. Рисунок при этом сохраняется.
    this.ctx.restore();
  }
}
