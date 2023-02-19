// https://learn.nashvillesoftwareschool.com/blog/2023/02/02/building-a-game-with-p5-part-3-rhythm-game

// https://editor.p5js.org/ehersh/sketches/Hk52gNXR7

let player;
let song;

var screen = 0;
var y = 0;
var x = 200;
var score = 0;
var highscore = 0;

// add reset game

function setup() {
  new Canvas(windowWidth, windowHeight);
  bg = loadImage('image.gif')
  song = loadSound('song.mp3');
  player = new Sprite();
  circle = new Sprite();
  player.diameter = 50;
  player.y = 500;
}

function draw() {
  if(screen == 0){
    startScreen()
    player.visible = false
    circle.visible = false
  }else if(screen == 1){
  	gameOn()
    player.visible=true
    circle.visible = true
  }else if(screen==2){
  	gameOver()
  }
}

function startScreen(){
		background(150)
		fill(255)
		textAlign(CENTER);
		text('Click to play', width / 2, height / 2)
        textFont('Georgia')
        textSize(20)
        reset();
}

function gameOn() {
  background(bg);
  circle.diameter = 20;
  circle.x = x
  circle.y = y
  //ellipse(x, y, 20, 20);
  y += random(2, 7)
  if (circle.collides(player)) {
    y = 0
    x = random(1*windowWidth/4, 3*windowWidth/4)
    score += 1
  } else if (y>windowHeight) {
    screen = 2
  }
  text('Your Score: '  + score, width/2, 20);
  fill(255);
  if (score > highscore) {
    highscore = score
  }
  text('High Score: ' + highscore, width/2, 40);
}

//function pauseScreen(){
//		background(150)
//		textAlign(CENTER);
//		text('PAUSED', width / 2, height / 2)
//		text('Click to resume', width / 2, height / 2 + 20);
//}

function gameOver() {
        background(150)
		textAlign(CENTER);
		text('GAME OVER', width / 2, height / 2)
		text('Click to start over', width / 2, height / 2 + 20);
}

function mousePressed(){
	if(screen==0){
  	screen=1
  } else if (screen==2) {
    screen=0
  }
  if (song.isPlaying()) {
    song.stop()
  } else {
    song.play()
  }
}

function keyPressed() {
  player.y = 500
  if (kb.presses('left')) player.move(50, 180, 60);
  else if (kb.presses('right')) player.move(50, 360, 60);
  if (player.x <= 0) {
    player.x = 0
  } else if (player.x>=windowWidth) {
    player.x = windowWidth
  }
}

function reset() {
  score = 0;
  y = 0;
  x = random(1*windowWidth/4, 3*windowWidth/4)
  song.stop()
}