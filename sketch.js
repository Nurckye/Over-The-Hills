let x, y, speed;
let isUp, computePosition, upTime;
let walls, ground;
let isOn = false;
let score = 0;
let isPlaying = false;

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

function preload() {
  img = loadImage("./landscape.jpg");
  wallPic = loadImage("./pine.png");
}

function setup() {
  createCanvas(500, 760);

  x = 40;
  y = height / 2;
  walls = [new Wall(0), new Wall(200), new Wall(400)];
  ground = height - 60;
  speed = 4;
  button = createButton("PLAY");
  button.size(200, 100);
  button.style("color", "black");
  button.style("padding", "16px 24px");
  button.style("cursor", "pointer");

  button.style("box-shadow", "0px");
  button.style("background", "white");
  button.style("border", "1px solid black");
  button.style("font-size", "24px");
  button.style("font-weight", "bold");
  // button.style("width", "1000px")
  button.position(width / 2 - 100, height / 2 - 50);
  button.mousePressed(changeBG);

  computePosition = () => {
    if (isUp) {
      --upTime;
      if (upTime == 0) isUp = false;
      y -= speed;
    } else {
      y += speed;
    }
  };
}

function mouseClicked() {
  isUp = true;
  upTime = 14;
}

class Wall {
  wW = 60;
  wS = 150;

  constructor(wallOffset) {
    this.wallOffset = wallOffset;
    this.wX = width + wallOffset;
    this.wH = random(150, 350);
  }
  tick() {
    this.wX -= 2;
    if (this.wX == -20) {
      ++score;
      console.log(score);
    }
    if (this.wX <= -this.wW) {
      this.wX = width - wW + 200;
      this.wH = random(150, 350);
    }
  }
  computeWalls() {
    this.tick();
    // console.log([this.wX, this.wW, this.wH, this.wS])
    return [this.wX, this.wW, this.wH, this.wS];
  }
}

function draw() {
  background(200);
  image(img, 0, 0, width, height);

  if (isOn) {
    stroke(50);
    fill("F9DDF3");
    stroke("#1f0640");
    strokeWeight(4);
    ellipse(x, y, 32, 32);
    strokeWeight(0);

    walls.forEach((wall) => {
      [wX, wW, wH, wS] = wall.computeWalls();
      fill("#1f0640");
      rect(wX, 0, wW, wH);
      rect(wX, wH + wS, wW, height - (wH + wS));
      if (wX <= x && x <= wX + wW && (y <= wH || y >= wH + wS)) isOn = false;
    });
    if (y >= ground) isOn = false;

    computePosition();

    fill("#1f0640");
    rect(0, ground, width, height - (wH + wS));

    fill("F9DDF3");
    stroke("#1f0640");
    strokeWeight(1);
    ellipse(450, 40, 48, 48);
    fill("black");
    textStyle(BOLD);
    textSize(28);
    text(`${score}`, 442, 48);
  } else {
    fill("#1f0640");
    stroke("#F9DDF3");
    strokeWeight(1);
    rect(0, height / 2 - 100, width, 200);
    button.show();
  }
}

function changeBG() {
  this.hide();
  if (!isPlaying) {
    myMusic = new sound("mraz.mp3");
    myMusic.play();
    isPlaying = true;
  }
  score = 0;
  x = 40;
  y = height / 2;
  walls = [new Wall(0), new Wall(200), new Wall(400)];

  isOn = true;
}
