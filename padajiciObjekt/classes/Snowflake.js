class Snowflake extends FallingObject {
  constructor(x, y, size, img) {
    super(x, y, size, img);
    this.angle = random(TWO_PI);
    this.spin = random(-0.3, 0.3);
  }
  
  update() {
    if (this.stopped) return;
    this.angle += this.spin;
    super.update();
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.img, 0, 0, this.size, this.size);
    pop();
  }
}