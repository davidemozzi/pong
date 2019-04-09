function movePaddles() {
  if (keyIsDown(38)) {
    right.moveUp();
  }
  if (keyIsDown(40)) {
    right.moveDown();
  }
  if (keyIsDown(87)) {
    left.moveUp();
  }
  if (keyIsDown(83)) {
    left.moveDown();
  }
  if (touchArray != undefined && touchArray.length > 0) {
    let l = false;
    let r = false;
    for (let touch of touchArray) {
      if (l && r) {
        break;
      }
      if (touch.clientX < width / 2) {
        l = true;
        if (touch.clientY < left.position.y - paddleSpeed) {
          left.moveUp();
        } else if (touch.clientY > left.position.y + paddleSpeed) {
          left.moveDown();
        }
      } else {
        r = true;
        if (touch.clientY < right.position.y - paddleSpeed) {
          right.moveUp();
        } else if (touch.clientY > right.position.y + paddleSpeed) {
          right.moveDown();
        }
      }
    }
  }
}

class Paddle {
  constructor(x, y, w, h) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  draw() {
    fill(255);
    noStroke();
    rect(this.position.x - this.w / 2, this.position.y - this.h / 2, this.w, this.h);
  }

  moveUp() {
    if (this.position.y - this.h / 2 > 0) {
      if (this.position.y - this.h / 2 >= paddleSpeed) {
        this.position.add(0, -paddleSpeed);
      } else {
        this.position.set(this.position.x, this.h / 2);
      }
    }
  }

  moveDown() {
    if (this.position.y + this.h / 2 < height) {
      if (this.position.y + this.h / 2 <= height - paddleSpeed) {
        this.position.add(0, paddleSpeed);
      } else {
        this.position.set(this.position.x, height - this.h / 2);
      }
    }
  }
}
