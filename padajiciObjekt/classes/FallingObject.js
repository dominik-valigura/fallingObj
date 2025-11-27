/* Třída pro padající objekty */
class FallingObject {
  constructor(x, y, size, img) {
    // základní atributy vycházející z parametrů
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
    // další atributy třídy
    this.gravity = 0.1;
    this.vx = 0;
    this.vy = random(1, 3);
    this.stopped = false;
  } 
  
  update() {
    if (this.stopped) return;
    this.y += this.vy;
    this.x += this.vx;
  }
  
  draw() {
    fill(0);
    circle(this.x, this.y, this.size);
    image(this.img, this.x, this.y, this.size, this.size);
  }
}