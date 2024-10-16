//@ts-check
import { CollectableItem } from "./colectablebase.js";

export class SimpleGoodItem extends CollectableItem {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.width = 25;
    this.height = 25;

    this.despawnTime = 10 * 1000;
    this.spawnInTime = 5 * 1000;
    this.despawnWarningTime = 3 * 1000;
    this.isColided = false;
    this.blink = {
      interval: 200,
      lastBlink: 0,
      isVisible: true,
    };

    this.lastAlphaTime = 0;
    this.alpha = 0;

    this.lifeTime = 0;

    this.color = "hsla(112, 100%, 50%, 0%)";
  }

  update(elapsedTime) {
    if (!this.isColectable) {
      return;
    }

    this.lifeTime += elapsedTime;

    if (this.lifeTime < this.spawnInTime) {
      //we hav no full spawned in yet
      this.alpha = Math.floor((this.lifeTime / this.spawnInTime) * 100);
      this.color = `hsla(112, 100%, 50%, ${this.alpha}%)`;
    }

    if (this.lifeTime > this.despawnTime - this.despawnWarningTime) {
      // start blinking
      //console.log("BLINK");

      this.blink.lastBlink += elapsedTime;
      if (this.blink.lastBlink > this.blink.interval) {
        if (this.blink.isVisible) {
          //console.log("Blink OFF");

          this.alpha = 0;
        } else {
          //console.log("Blink on");
          this.alpha = 100;
        }
        this.blink.lastBlink = 0;
        this.blink.isVisible = !this.blink.isVisible;
      }

      if (this.lifeTime > this.despawnTime) {
        this.alpha = 0;
        this.isColectable = false;
      }
      this.color = `hsla(112, 100%, 50%, ${this.alpha}%)`;
    }
  }
}
