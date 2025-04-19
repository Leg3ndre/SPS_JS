const ACC = 0.1;
const RED_RATE = 0.995;
const INPUT_DELAY = 18;
const SHOOT_WAIT = 15;
const FREEZE_WAIT = 120.0;
const LIFE = 5;
const WIDTH = 400;

const ENEMY_Z = -100.0;
const MAN_HEIGHT = 20;
const LINE_START_Z = -90;
const LINE_END_Z = 100;
const LINE_SPLIT_X = 50;
const LINE_NUM_X = WIDTH * 2 / LINE_SPLIT_X;
const LINE_NUM_Y = 6;
const LINE_SPLIT_Y = (LINE_END_Z - LINE_START_Z) / LINE_NUM_Y;
const MAG_START = (-ENEMY_Z) / (LINE_START_Z - ENEMY_Z);
const MAG_END = (-ENEMY_Z) / (LINE_END_Z - ENEMY_Z);

const MAX_TAMA = 5;
const TAMA_START_Z = -90.0;
const TAMA_END_Z = 90.0;
const TAMA_SIZE = 5.0;


const PLAYER_COLOR = "red";
const ENEMY_COLOR = "lime";
