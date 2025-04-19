class Enemy{
  constructor(width) {
    this.pos = 0.0;
    this.vel = 0.0;
    this.width = width
    if (Math.random() * 10 < 5) {
      this.dir = -1;
    } else {
      this.dir = 1;
    }
    this.tama = [];
    this.score = LIFE;
    this.s_wait = 0;
    this.freeze = 0;
  }

  acc_right() {
    if (this.freeze <= 0) {
      this.vel += ACC;
    }
  }

  acc_left() {
    if (this.freeze <= 0) {
      this.vel -= ACC;
    }
  }

  move() {
    // Control of velocity
    if (this.pos <= this.width - this.vel && this.pos >= -this.width - this.vel) {
      this.pos += this.vel;
    } else {
      this.vel = 0.0;
    }
    this.vel *= RED_RATE;

    // States out of velocity
    this.tama = this.tama.filter(t=> t.z < TAMA_END_Z);
    if (this.s_wait > 0) {
      this.s_wait -= 1;
    }
    if (this.freeze > 0) {
      this.freeze -= 1;
    }
  }

  ai_test(pl_pos) {
    if (this.dir == 1) {
      this.acc_right();
    } else {
      this.acc_left();
    }
    if (Math.random() * 100 < this.dir * 150 * Math.pow((this.pos-pl_pos)/100.0, 3.0)) {
      this.dir *= -1;
    }
    if (Math.random() * 100 < 10) {
      this.shoot();
    }
  }

  shoot() {
    if (this.tama.length < MAX_TAMA && this.s_wait <= 0 && this.freeze <= 0) {
      var new_tama = new Tama(this.pos, -1);
			this.tama.push(new_tama);
      this.s_wait = SHOOT_WAIT;
    }
  }

  attacked(tama) {
    var tama_alive = [];
    for (i = 0; i < tama.length; i++) {
      if (dist(this.pos, TAMA_START_Z, tama[i].x, tama[i].z) < 9) {
        this.score -= 1;
        this.freeze = FREEZE_WAIT;
      } else {
        tama_alive.push(tama[i]);
      }
    }
    return tama_alive;
  }
}
