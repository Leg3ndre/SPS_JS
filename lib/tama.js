class Tama{

  constructor(pos, side) {
    this.x = pos;
    this.side = side;
    this.vel_z = 1.0;
    if (this.side == 1) {
      this.z = TAMA_END_Z;
    } else {
      this.z = TAMA_START_Z;
    }
  }

  move() {
    this.z += -this.side * this.vel_z;
  }

}


function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2.0) + Math.pow(y1 - y2, 2.0));
}
