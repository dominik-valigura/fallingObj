let objects = [];
let images = {};
let keys = {};
let playerRed, playerBlue;
let startTime, time;
const GAMETIME = 15;

function preload(){
  images["flake"] = loadImage("./images/snowflake.svg");
  images["rain"] = loadImage("./images/raindrop.svg");
  images["soot"] = loadImage("./images/soot.svg");  
  images["background"] = loadImage("./images/christmas.jpg");
  images["playerIcon"] = loadImage("./images/Snowman.png");

}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  playerRed = new Player(width / 2 - 200, height - 50, 50, images["playerIcon"]);
  playerRed.color = color(255, 0, 0);
  playerBlue = new Player(width / 2 + 200, height - 50, 50, images["playerIcon"]);
  playerBlue.color = color(0, 0, 255);
  startTime = millis();
}

function draw() {
  background(120);
  image(images["background"], width / 2, height / 2, width, height);
  time = (millis() - startTime) / 1000;
  if(time >= GAMETIME){
    noLoop();
    endOfGame();
  }
  if (frameCount % 30 === 0) createObject();
  
  if (keys[LEFT_ARROW]){
    playerBlue.update("left");
  }
  
   if (keys[RIGHT_ARROW]){
    playerBlue.update("right");
  }

  if (keys[65]){
    playerRed.update("left");
  }
  
   if (keys[68]){
    playerRed.update("right");
  }

  for (let obj of objects) {
    if(playerBlue.collide(obj)){
      obj.stopped = true;
    }
    if(playerRed.collide(obj)){
      obj.stopped = true;
    }
    obj.update();
    obj.draw();
    if (obj.y > height - obj.size) {
      obj.stopped = true;      
    }
  }
   objects = objects.filter(obj => !obj.stopped);
   playerBlue.draw();
   playerRed.draw();
    score(); 
  
}

function score(){
  fill(234);
  text(`Počet objektů: ${objects.length}`, 20, 20);
  text(`Počet kapek: ${objects.filter(obj => obj instanceof RainDrop).length}`, 20, 40);
  text(`Počet sněhových vloček: ${objects.filter(obj => obj instanceof Snowflake).length}`, 20, 60);
  text(`Počet sazí: ${objects.filter(obj => obj instanceof Soot).length}`, 20, 80);
  text(`Čas hry: ${nf(GAMETIME - time, 1, 1)} s`, width - 200, 40)
}

function endOfGame() {
  fill(0, 150);
  rect(0, 0, width, height);
  fill(255);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(32);
  let winner = "Remíza!";
  if (playerRed.score > playerBlue.score) {
    winner = "Vyhrává červený hráč!";
  } else if (playerBlue.score > playerRed.score) {
    winner = "Vyhrává modrý hráč!";
  }      
  fill(playerRed.color);
  rect(width / 2 - 50, height / 2 - 30, 80, 40);
  fill(255);
  text(`${playerRed.score}`, width / 2 - 50, height / 2 - 30); 
  fill(playerBlue.color);
  rect(width / 2 + 50, height / 2 - 30, 80, 40);
  fill(255);
  text(`${playerBlue.score}`, width / 2 + 50, height / 2 - 30);
  text(winner, width / 2, height / 2 + 30);
  rectMode(CORNER);
  textAlign(LEFT, BOTTOM);
  textSize(12);
}

function createObject(){
  let x = random(width);
  let y = random(-200, -20);
  let size = random(10, 35);
  let type = round(random(1, 5));
  switch (type){
    case 1:
    case 2:
      objects.push(new RainDrop(x, y, size, images["rain"]));
      break;

    case 3:
        objects.push(new Soot(x, y, size, images["soot"]));
      break;
    
    case 4:
        objects.push(new Snowflake(x, y, size, images["flake"]));
        break;
  }
}

function keyPressed() {
  keys[keyCode] = true;
}

function keyReleased() {
  keys[keyCode] = false;
}

