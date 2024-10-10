//@ts-check

import { SimpleGoodItem } from "./collectables/goog.js";
import { canvas } from "./common/canvas.js";
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
     
      Next: function (){
       this.lastTime = 0; 
        this.nextTime = rand(5 * 1000,10 * 1000);
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
      let isColliding = squareColision(c.x, c.y, c.width, c.height, this.players[0])
    });
  }

  spawner(elapsedTime) {
 this.goodSpawn.lastTime+= elapsedTime;

    if(this.goodSpawn.lastTime > this.goodSpawn.nextTime) {
       //spawn a good shape
       const buffer = 50;
       const sx = rand(buffer, canvas.width-buffer);
       const sy = rand(buffer, canvas.height-buffer);
       const item = new SimpleGoodItem(sx,sy);
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
  }
}

function rand(min, max) {
  let upper = max - min;
  let r = Math.floor(Math.random() * upper) + min;
  return r;
}

function squareColision(x1, y1, width, height, Player) {
    if(
        x1 + width >= Player.x&&
        x1 <= Player.x + Player.width&&
        y1 + height >= Player.y&&
        y1 <= Player.y + Player.height
    ){
        return true;
        console.log("COLIOCSION DETEEICTERD")
    }
}