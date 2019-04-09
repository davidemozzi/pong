// OBJECTS
let left, right;
let ball;
// ----------------------------------------

// DOM OBJECTS
let pauseButton;
let fsButton;
// let backButton;
// ----------------------------------------

// PARAMETERS
let ballSpeed;
let paddleSpeed;
// ----------------------------------------

// GLOBAL VARIABLES
let touchArray;
let resize = false;
let fs = false;
let wait = true;
let time = null;
let paused = false;
let score = {
  left: 0,
  right: 0
};
// ----------------------------------------

// MAIN FUNCTIONS
function setup() {
  document.addEventListener("touchstart", touchStart);
  document.addEventListener("touchmove", touchMove);
  document.addEventListener("touchend", touchEnd);
  createCanvas(innerWidth, innerHeight);
  paddleSpeed = height / 75;
  let ratio = map(width / height, 1.3, 2.1, 1.4, 1.8);
  ballSpeed = paddleSpeed * ratio;
  left = new Paddle(30, height / 2, height / 6 / 5, height / 6);
  right = new Paddle(width - 31, height / 2, height / 6 / 5, height / 6);
  ball = new Ball(height / 6 / 5);
  pauseButton = createButton('| |');
  pauseButton.position(10, 10);
  pauseButton.mousePressed(pause);
  fsButton = createButton('[ ]');
  fsButton.position(50, 10);
  fsButton.mousePressed(fullScreen);
  // backButton = createButton('BACK');
  // backButton.position(90, 12);
  // backButton.mousePressed(back);
}

function draw() {
  if (resize == true) {
    resize = false;
    resizeWindow();
  }
  if (width < height) {
    background(255, 0, 0);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text('Ruota lo schermo in orizzontale', width / 2, height / 2);
    return;
  }
  drawBackground();
  left.draw();
  right.draw();
  ball.draw();
  if (time != null && frameCount - time > 60) {
    wait = false;
    time = null;
  }
  if (!wait) {
    ball.move();
  }
  if (!paused) {
    movePaddles();
  }
}

function drawBackground() {
  background(51);
  stroke(155);
  strokeWeight(4);
  let y = 0;
  let l = 20;
  let s = l / 2;
  let n = ceil(height / (l + s));
  l += (height - l * n - s * (n - 1)) / n;
  s = l / 2;
  for (; n > 0; n--) {
    if (n == 1) {
      line(width / 2, y, width / 2, height);
    } else {
      line(width / 2, y, width / 2, y + l);
      y += l + s;
    }
  }
  fill(255);
  noStroke();
  textAlign(RIGHT, TOP);
  let offset;
  if (paused && frameCount % 60 < 30) {
    offset = 20;
    textSize(offset);
    text('PAUSE', width - offset, offset);
  }
  offset = 50;
  textSize(offset);
  text(score.left, width / 2 - offset, offset);
  textAlign(LEFT, TOP);
  text(score.right, width / 2 + offset, offset);
}

function fullScreen() {
  fs = !fs;
  fullscreen(fs);
}

function pause() {
  if (paused) {
    wait = false;
    paused = false;
  } else {
    wait = true;
    time = null;
    paused = true;
  }
}

// function back() {
//   document.location.replace('../');
// }
// ----------------------------------------

// EVENTS
function touchStart(e) {
  touchArray = e.targetTouches;
}

function touchMove(e) {
  touchArray = e.targetTouches;
}

function touchEnd(e) {
  touchArray = e.targetTouches;
}

function touchStarted() {
  if (!paused && time == null && wait == true) {
    wait = false;
  }
}

function keyPressed() {
  if (!paused && time == null && wait == true) {
    wait = false;
  }
}

function windowResized() {
  resize = true;
}

function resizeWindow() {
  resizeCanvas(innerWidth, innerHeight);
  wait = true;
  time = null;
  left = new Paddle(30, height / 2, height / 6 / 5, height / 6);
  right = new Paddle(width - 31, height / 2, height / 6 / 5, height / 6);
  ball = new Ball(height / 6 / 5);
  paddleSpeed = height / 75;
  let ratio = map(width / height, 1.3, 2.1, 1.4, 1.8);
  ballSpeed = paddleSpeed * ratio;
}
// ----------------------------------------
