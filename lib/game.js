

// ===============================
// Variables for game system
// ===============================
const player_img = new Image();
player_img.src = "../assets/player.png";
const player = new Player(WIDTH, player_img);
const enemy = new Enemy(WIDTH);
var pl_right = 0;
var pl_left = 0;
var act_queue = [];
var shoot_now = false;


// ===============================
// Update
// ===============================
var update = function() {
  // console.log(act_queue);
  if (pl_right < pl_left) {
    act_queue.push('l');
  } else if (pl_right > pl_left) {
    act_queue.push('r');
  } else {
    act_queue.push('n');
  }
  if (shoot_now) {
    act_queue[INPUT_DELAY] += 's';
    shoot_now = false;
  }

  if (act_queue.length > INPUT_DELAY) {
    act = act_queue.shift();
    if (/l/.test(act)) {
      player.acc_left();
    } else if (/r/.test(act)) {
      player.acc_right();
    }
    if (/s/.test(act)) {
      player.shoot();
    }

  }

  enemy.ai_test(player.pos);

  // Update
  player.tama = enemy.attacked(player.tama);
  enemy.tama = player.attacked(enemy.tama);
  enemy.move();
  player.move();
  for (i = 0; i < player.tama.length; i++) {
    player.tama[i].move();
  }
  for (i = 0; i < enemy.tama.length; i++) {
    enemy.tama[i].move();
  }

  draw();
  var pl_score = document.getElementById('pl-score');
  var en_score = document.getElementById('en-score');
  pl_score.innerHTML = "PLAYER'S SCORE: " + player.score;
  en_score.innerHTML = "ENEMY'S SCORE: " + enemy.score;
}

onkeydown = function(event) {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      pl_left = pl_right + 1;
      break;
    case 'ArrowRight':
    case 'd':
      pl_right = pl_left + 1;
      break;
    case 'ArrowUp':
    case 'w':
      shoot_now = true;
      break;
    default:
      console.log(event.key);
  }
};

onkeyup = function(event) {
  if (event.key == 'ArrowLeft' || event.key == 'a'){
    pl_left = 0;
  }
  if (event.key == 'ArrowRight' || event.key == 'd') {
    pl_right = 0;
  }
  if (event.key == 'r') {
    window.location.reload();
  }
}



// ===============================
// Onload functions
// ===============================
onload = function() {
  draw();
  var timer = setInterval(update, 1000.0/60.0);
};

function draw() {
  var canvas = document.getElementById('game');
  if (!canvas || !canvas.getContext) {
    return false;
  }
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 640, 480);
  draw_field(ctx, enemy.pos);
  draw_player(ctx, player, enemy.pos);
  for (i = 0; i < player.tama.length; i++) {
    draw_player_tama(ctx, player.tama[i], enemy.pos);
  }
  for (i = 0; i < enemy.tama.length; i++) {
    draw_enemy_tama(ctx, enemy.tama[i], enemy.pos);
  }
  draw_player_freeze(ctx, player, enemy.pos);
  draw_enemy_freeze(ctx, enemy.freeze);
}




 // ===============================
 // Functions for drawing
 // ===============================
function draw_field(ctx, enemy_pos) {
  for (i = 0; i <= LINE_NUM_X; i++) {
    draw_line(ctx,
      (LINE_SPLIT_X * i - WIDTH - enemy_pos) * MAG_START + 320,
      MAN_HEIGHT * MAG_START + 240,
      (LINE_SPLIT_X * i - WIDTH - enemy_pos) * MAG_END + 320,
      MAN_HEIGHT * MAG_END + 240);
  }
  for (i = 0; i <= LINE_NUM_Y; i++) {
    draw_line(ctx,
      (-WIDTH - enemy_pos) * (-ENEMY_Z) / (LINE_SPLIT_Y * i + LINE_START_Z  - ENEMY_Z) + 320,
      MAN_HEIGHT * (-ENEMY_Z) / (LINE_SPLIT_Y * i + LINE_START_Z  - ENEMY_Z) + 240,
      (WIDTH - enemy_pos) * (-ENEMY_Z) / (LINE_SPLIT_Y * i + LINE_START_Z  - ENEMY_Z) + 320,
      MAN_HEIGHT * (-ENEMY_Z) / (LINE_SPLIT_Y * i + LINE_START_Z  - ENEMY_Z) + 240);
  }
}

function draw_player(ctx, player, enemy_pos) {
  ctx.drawImage(player.img,
    (player.pos - enemy_pos - player.img.width/2.0) * MAG_END + 320,
    (MAN_HEIGHT - player.img.height) * MAG_END + 240,
    player.img.width * MAG_END,
    player.img.height * MAG_END);
}

function draw_player_tama(ctx, t, enemy_pos) {
  draw_triangle(ctx,
    (t.x - enemy_pos) * (-ENEMY_Z) / (t.z - TAMA_SIZE - ENEMY_Z) + 320,
    MAN_HEIGHT * 0.67 * (-ENEMY_Z) / (t.z - TAMA_SIZE - ENEMY_Z) + 240,
    (t.x - enemy_pos + TAMA_SIZE * 0.7) * (-ENEMY_Z) / (t.z + TAMA_SIZE * 0.7 - ENEMY_Z) + 320,
    MAN_HEIGHT * 0.33 * (-ENEMY_Z) / (t.z + TAMA_SIZE * 0.7 - ENEMY_Z) + 240,
    (t.x - enemy_pos - TAMA_SIZE * 0.7) * (-ENEMY_Z) / (t.z + TAMA_SIZE * 0.7 - ENEMY_Z) + 320,
    MAN_HEIGHT * 0.33 * (-ENEMY_Z) / (t.z + TAMA_SIZE * 0.7 - ENEMY_Z) + 240,
    PLAYER_COLOR);
}

function draw_enemy_tama(ctx, t, enemy_pos) {
  draw_triangle(ctx,
    (t.x - enemy_pos) * (-ENEMY_Z) / (t.z + TAMA_SIZE - ENEMY_Z) + 320,
    MAN_HEIGHT * 0.67 * (-ENEMY_Z) / (t.z + TAMA_SIZE - ENEMY_Z) + 240,
    (t.x - enemy_pos + TAMA_SIZE * 0.7) * (-ENEMY_Z) / (t.z - TAMA_SIZE * 0.7 - ENEMY_Z) + 320,
    MAN_HEIGHT * 0.33 * (-ENEMY_Z) / (t.z - TAMA_SIZE * 0.7 - ENEMY_Z) + 240,
    (t.x - enemy_pos - TAMA_SIZE * 0.7) * (-ENEMY_Z) / (t.z - TAMA_SIZE * 0.7 - ENEMY_Z) + 320,
    MAN_HEIGHT * 0.33 * (-ENEMY_Z) / (t.z - TAMA_SIZE * 0.7 - ENEMY_Z) + 240,
    ENEMY_COLOR);
}

function draw_player_freeze(ctx, player, enemy_pos) {
  if (player.freeze > 0) {
    var frz_w = [
      50.0 * (1.0 - Math.pow(player.freeze / FREEZE_WAIT, 5.0)),
      50.0 * (1.0 - Math.pow((player.freeze - 20) / FREEZE_WAIT, 5.0))
    ];
    for(i = 0; i <2; i++) {
      draw_frame(ctx,
        (player.pos - enemy_pos - frz_w[i] / 2.0) * MAG_END + 320,
        (MAN_HEIGHT - player.img.height / 2.0 - frz_w[i] / 2.0) * MAG_END + 240,
        (player.pos - enemy_pos + frz_w[i] / 2.0) * MAG_END + 320,
        (MAN_HEIGHT - player.img.height / 2.0 + frz_w[i] / 2.0) * MAG_END + 240,
        "white", 1);
    }
  }
}

function draw_enemy_freeze(ctx, frz, interval = 5) {
  if (frz > 0) {
    for (i = 0; i < (FREEZE_WAIT-50)/interval; i++) {
      frz_w = Math.max(1.0 - Math.pow((frz + i * interval) / FREEZE_WAIT, 5.0), 0.0);
      draw_frame(ctx,
        (1.0 - frz_w) * 320, (1.0 - frz_w) * 240,
        (1.0 + frz_w) * 320, (1.0 + frz_w) * 240,
        "white", 5);
    }
  }
}

function draw_line(ctx, tlx, tly, brx, bry, col = "yellow", lw = 1) {
  ctx.beginPath();
  ctx.moveTo(tlx, tly);
  ctx.lineTo(brx, bry);
  ctx.strokeStyle = col;
  ctx.lineWidth = lw;
  ctx.stroke();
}

function draw_triangle(ctx, pt1x, pt1y, pt2x, pt2y, pt3x, pt3y, col) {
  ctx.beginPath();
  ctx.moveTo(pt1x, pt1y);
  ctx.lineTo(pt2x, pt2y);
  ctx.lineTo(pt3x, pt3y);
  ctx.lineTo(pt1x, pt1y);
  ctx.strokeStyle = col;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function draw_frame(ctx, pt1x, pt1y, pt2x, pt2y, col = "white", lw = 1) {
  ctx.beginPath();
  ctx.moveTo(pt1x, pt1y);
  ctx.lineTo(pt2x, pt1y);
  ctx.lineTo(pt2x, pt2y);
  ctx.lineTo(pt1x, pt2y);
  ctx.lineTo(pt1x, pt1y);
  ctx.strokeStyle = col;
  ctx.lineWidth = lw;
  ctx.stroke();
}
