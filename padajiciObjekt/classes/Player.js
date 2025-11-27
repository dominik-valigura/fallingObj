class Player {
  constructor(x, y, size, img){
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
    this.speed = 5;
    this.color = color(200, 200, 200);
    this.score = 0;
  }
  
  update(direction){
    if((direction == "left") && (this.x > 0)){
      this.x -= this.speed;  
    }
    if((direction == "right") && (this.x < width - this.size)){
      this.x += this.speed;
    }
  }
  
  collide(obj) {
    if (collideRectCircle(this.x , this.y, this.size, this.size, obj.x, obj.y, obj.size)){
      if(obj instanceof Snowflake) this.score += round(obj.size);
      if(obj instanceof Soot) this.score -= round(obj.size);
      if(obj instanceof RainDrop) this.score -= round(obj.size);
      this.score++;
      return true;
    } else {
      return false;
    }
  }
  
  draw(){
    fill(this.color);
    square(this.x - 2.5, this.y - 22.5, this.size +5);
    image(this.img, this.x + this.size / 2, this.y + this.size / 2 - 20, this.size, this.size);
    fill(255);
    text(`Skóre: ${this.score}`, this.x, this.y + 45);
  }
  
}