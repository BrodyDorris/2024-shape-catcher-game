//@ts-check
import { canvas, ctx } from "./common/canvas.js";

export class Player {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 25;

    this.speed = 5;

    this.keyBindings = {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
    };

    this.moveing = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.wireUpKeyboard();
  }

  wireUpKeyboard() {
    window.addEventListener("keydown", (e) => {
      //console.log(e);

      switch (e.code) {
        case this.keyBindings.up:
          this.moveing.up = true;
          break;
        case this.keyBindings.down:
          this.moveing.down = true;
          break;
        case this.keyBindings.left:
          this.moveing.left = true;
          break;
        case this.keyBindings.right:
          this.moveing.right = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      //console.log(e);
      switch (e.code) {
        case this.keyBindings.up:
          this.moveing.up = false;
          break;
        case this.keyBindings.down:
          this.moveing.down = false;
          break;
        case this.keyBindings.left:
          this.moveing.left = false;
          break;
        case this.keyBindings.right:
          this.moveing.right = false;
          break;
      }
    });
  }

  update() {
    let dirX = 0;
    let dirY = 0;

    if (this.moveing.up) {
      dirY = -1;
    }

    if (this.moveing.down) {
      dirY = 1;
    }

    if (this.moveing.up && this.moveing.down) {
      dirY = 0;
    }

    if (this.moveing.left) {
      dirX = -1;
    }

    if (this.moveing.right) {
      dirX = 1;
    }

    if (this.moveing.right && this.moveing.left) {
      dirX = 0;
    }

    this.x += this.speed * dirX;
    this.y += this.speed * dirY;

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = 0;
    }
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }

    if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
    }
  }

  draw() {
    ctx.fillStyle = "turquoise";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
