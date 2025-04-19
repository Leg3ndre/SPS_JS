class Player{
  constructor(width, img) {
    this.img = img;
    this.pos = 0.0;
    this.vel = 0.0;
    this.width = width;
    this.tama = [];
    this.score = LIFE;
    this.s_wait = 0;
    this.freeze = 0;
  }

  acc_right() {
    if (this.freeze <= 0) {
      this.vel -= ACC;
    }
  }

  acc_left() {
    if (this.freeze <= 0) {
      this.vel += ACC;
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

    // States except for velocity
    this.tama = this.tama.filter(t=> t.z > TAMA_START_Z);
    if (this.s_wait > 0) {
      this.s_wait -= 1;
    }
    if (this.freeze > 0) {
      this.freeze -= 1;
    }
  }

  shoot() {
    if (this.tama.length < MAX_TAMA && this.s_wait <= 0 && this.freeze <= 0) {
      var new_tama = new Tama(this.pos, 1);
      this.tama.push(new_tama);
      this.s_wait = SHOOT_WAIT;
    }
  }

  attacked(tama) {
    var tama_alive = [];
    for (i = 0; i < tama.length; i++) {
      if (dist(this.pos, TAMA_END_Z, tama[i].x, tama[i].z) < 9) {
        this.score -= 1;
        this.freeze = FREEZE_WAIT;
      } else {
        tama_alive.push(tama[i]);
      }
    }
    return tama_alive;
  }
}
