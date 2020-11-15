var monkey, monkey_running;
var banana, bananaImg, obstacle, obstacleImg;
var score = 0;
var survivalTime=0;
var ground;
var bananaGroup, obstacleGroup;
var gameState = PLAY;
var PLAY = 1;
var END = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");

}

function setup() {
  createCanvas(500, 250);
  monkey = createSprite(60, 200);
  monkey.addAnimation('running', monkey_running);
  monkey.scale = 0.08;

  ground = createSprite(150, 210, 550, 13);
  ground.velocityX = -7;

  bananaGroup = new Group();
  obstacleGroup = new Group();

  survivalTime=0;
}

function draw() {
  background(220);

  stroke('yellow');
  textSize(17);
  fill('black');
  text('Banana Score : ' + score, 20, 20);
  stroke('pink');
  textSize(17);
  fill('black');
  text('Survival Time : ' + survivalTime, 330, 20);

    if (keyDown('space') && monkey.y >= 160) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    ground.velocityX = -(4 + 3 * score / 100);
  
    survivalTime = survivalTime + Math.round(getFrameRate() / 60);

    if (bananaGroup.isTouching(monkey)) {
      score = score + 1;
      bananaGroup.destroyEach(); 
    }
    if (obstacleGroup.isTouching(monkey)) {
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      survivalTime=0;
      }

  food();
  obstacles();
  drawSprites();
  ground.x = ground.width / 2;


function food() {

  if (frameCount % 80 === 0) {
    banana = createSprite(500, 160, 20, 20);
    banana.addImage(bananaImg);

    banana.y = Math.round(random(125, 180));

    banana.scale = 0.08;
    banana.velocityX = -8;

    banana.lifetime = 75;
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 180);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.15;
    obstacle.velocityX = -8;
    obstacle.lifetime = 75;
    obstacleGroup.add(obstacle);
  }
}
}