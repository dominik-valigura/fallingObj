class Soot extends FallingObject {
  constructor(x, y, size, img) {
    super(x, y, size, img);
    this.size = size / 2;
    this.opacity = random(10, 200);  
  }
  
  update() {
    if (this.stopped) return;
    this.vx += random(-0.3, 0.3);
    super.update();
  }
  
  draw() {
    push();
    tint(0, 0, 0, this.opacity);
    image(this.img, this.x, this.y, this.size, this.size);
    pop();
  }
}