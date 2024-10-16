//@ts-check

import { BadSquare } from "./badSquare.js";
import { CollectableItem } from "./collectables/colectablebase.js";
import { SimpleGoodItem } from "./collectables/goog.js";
import { canvas, ctx } from "./common/canvas.js";
import { Player } from "./player.js";

export class GameManager {
  constructor() {
    this.players = [];
    this.colectables = [];
    this.enemies = [];

    this.isGameOver = false;

    this.goodSpawn = {
      lastTime: 0,
      nextTime: 0,

      Next: function () {
        this.lastTime = 0;
        this.nextTime = rand(5 * 1000, 10 * 1000);
      },
    };

    this.spawner(0);
  }

  initialize() {
    this.players = [];
    let p1 = new Player(canvas.width / 2, canvas.height / 2);
    p1.x -= p1.width / 2;
    p1.x -= p1.width / 2;
    this.players.push(p1);
  }

  update(elapsedTime) {
    this.spawner(elapsedTime);
    this.players.forEach((p) => {
      p.update();
    });

    this.colectables.forEach((c) => {
      c.update(elapsedTime);
      let isColliding = squareColision(
        c.x,
        c.y,
        c.width,
        c.height,
        this.players[0],
        CollectableItem
      );
      if (isColliding) {
        //console.log("Console.log");
        c.width = 0;
        c.height = 0;
        const s1 = new BadSquare(sx, sy, ctx, canvas);
        s1.draw();
        if (document.getElementById("total-collected")) {
          document.getElementById("total-collected").innerText =
            this.colectables.filter((c) => c.height === 0).length;
        }
      }
    });
  }

  spawner(elapsedTime) {
    this.goodSpawn.lastTime += elapsedTime;

    if (this.goodSpawn.lastTime > this.goodSpawn.nextTime) {
      //spawn a good shape
      const buffer = 50;
      const sx = rand(buffer, canvas.width - buffer);
      const sy = rand(buffer, canvas.height - buffer);
      const item = new SimpleGoodItem(sx, sy);
      this.colectables.push(item);
      this.goodSpawn.Next();
      //debugger
    }
  }

  badSpawner(elapsedTime) {
    if (this.goodSpawn.lastTime > this.goodSpawn.nextTime) {
      //spawn a good shape
      const buffer = 50;
      const sx = rand(buffer, canvas.width - buffer);
      const sy = rand(buffer, canvas.height - buffer);
      const item = SimpleGoodItem(sx, sy);
      this.colectables.push(item);
      this.goodSpawn.Next();
      //debugger
    }
  }

  draw() {
    this.players.forEach((p) => {
      p.draw();
    });

    this.colectables.forEach((c) => {
      c.draw();
    });

    this.enemies.forEach((s) => {
      s.draw();
    });
  }
}

function rand(min, max) {
  let upper = max - min;
  let r = Math.floor(Math.random() * upper) + min;
  return r;
}

function squareColision(
  x1,
  y1,
  width,
  height,
  Player,
  CollectableItem,
  sx,
  sy
) {
  if (
    x1 + width >= Player.x &&
    x1 <= Player.x + Player.width &&
    y1 + height >= Player.y &&
    y1 <= Player.y + Player.height
  ) {
    //console.log({ CollectableItem });

    //CollectableItem.width = 0;
    //CollectableItem.height = 0;
    // CollectableItem.isColectable = false;
    // console.log("COLLISION DETECTED");
    // this.colectables = [];

    //console.log({ CollectableItem });
    return true;
  }
}

let lastTime = 0;

function drawLoop(timestamp, ctx, canvas) {
  let elapsedTime = timestamp - lastTime;
  lastTime = timestamp;

  for (let i = 0; i < 100; i++) {
    let enemies = [];
    enemies.push(new BadSquare(0, 0, ctx, canvas));

    for (const shape of enemies) {
      shape.update();
      shape.draw();

      enemies.forEach.draw();
      enemies.forEach.update();
    }

    window.requestAnimationFrame(drawLoop);
  }

  window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);
