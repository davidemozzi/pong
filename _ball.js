class Ball {
  constructor(d, side) {
    this.init(side);
    this.d = d;
  }

  init(side) {
    this.position = createVector(width / 2, height / 2);
    if (side == undefined || (side != 'right' && side != 'left')) {
      side = random(['right', 'left']);
    }
    let angle;
    switch (side) {
      case 'right':
        angle = random(-PI / 8, PI / 8);
        break;
      case 'left':
        angle = random(PI * 7 / 8, PI * 9 / 8);
        break;
    }
    this.velocity = p5.Vector.fromAngle(angle);
    this.velocity.setMag(ballSpeed);
  }

  draw() {
    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, this.d, this.d);
  }

  move() {
    this.position.add(this.velocity);
    if (this.position.y - this.d / 2 < 0) {
      this.position.set(this.position.x, this.d / 2);
      this.velocity.set(this.velocity.x, -this.velocity.y);
    }
    if (this.position.y + this.d / 2 > height) {
      this.position.set(this.position.x, height - this.d / 2);
      this.velocity.set(this.velocity.x, -this.velocity.y);
    }
    let rightY = this.position.y > right.position.y - right.h / 2 && this.position.y < right.position.y + right.h / 2;
    let rightX = this.position.x + this.d / 2 > right.position.x - right.w / 2 && this.position.x + this.d / 2 < right.position.x + right.w / 2;
    let leftY = this.position.y > left.position.y - left.h / 2 && this.position.y < left.position.y + left.h / 2;
    let leftX = this.position.x - this.d / 2 < left.position.x + left.w / 2 && this.position.x - this.d / 2 > left.position.x - left.w / 2;
    if (rightY && rightX) {
      this.position.set(right.position.x - right.w / 2 - this.d / 2, this.position.y);
      this.velocity.set(-this.velocity.x, this.velocity.y);
      let angle = map(this.position.y - right.position.y, -right.h / 2, right.h / 2, PI * 4 / 3, PI * 2 / 3);
      this.velocity = p5.Vector.fromAngle(angle);
      this.velocity.setMag(ballSpeed);
    }
    if (leftY && leftX) {
      this.position.set(left.position.x + left.w / 2 + this.d / 2, this.position.y);
      this.velocity.set(-this.velocity.x, this.velocity.y);
      let angle = map(this.position.y - left.position.y, -left.h / 2, left.h / 2, -PI / 3, PI / 3);
      this.velocity = p5.Vector.fromAngle(angle);
      this.velocity.setMag(ballSpeed);
    }
    if (this.position.x < 0) {
      this.init('right');
      wait = true;
      time = frameCount;
      score.right++;
    } else if (this.position.x > width) {
      this.init('left');
      wait = true;
      time = frameCount;
      score.left++;
    }
  }
}
