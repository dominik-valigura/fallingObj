class RainDrop extends FallingObject {
  constructor(x, y, size, img) {
    super(x, y, size, img);
    this.size = size / 1.5;
    this.opacity = random(20, 200);  
  }
  
  update() {
    if (this.stopped) return;
    super.update();
  }
  
  draw() {
    push();
    tint(0, 0, 0, this.opacity);
    image(this.img, this.x, this.y, this.size, this.size);
    pop();
  }
}