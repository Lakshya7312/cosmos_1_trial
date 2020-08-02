var bg, ground, bground;
var form;

var music, jumpSound;

var cosmo, play, start;

var playerAnime, player, playerStop;

var font1;

var rand;

var screw, screwdriver, fuel, oxygen, wings, thruster, stand, zombie;
var screwImg, driverImg, fuelImg, oxygenImg, wingsImg, thrusterImg,standImg, zombieImg;
var screwGroup, screwdriverGroup, fuelGroup, oxygenGroup, wingsGroup, thrusterGroup, standGroup, zombieGroup;

var ast, kloud;
var astImg, thinkloud;

var gun, bullet, gunImg, bulletImg;

var gameState = 0;

var score_count = 0;

var invis_ground;

function preload() {
  playerAnime = loadAnimation("./anime/1f.png", "./anime/2f.png", "./anime/3f.png", "./anime/4f.png", "./anime/5f.png",
 "./anime/9f.png", "./anime/10f.png", "./anime/11f.png",
    "./anime/12f.png", "./anime/13f.png");

  playerStop = loadAnimation("./images/stop.png");

  bg = loadImage("./images/ground1.png");
  
  bground = loadImage("./images/backgro.jpg");

  cosmoImg = loadImage("./images/start12.png");

  font1 = loadFont("./Abril.ttf");

  music = loadSound("./sounds/skyline.mp3");
  jumpSound = loadSound("./sounds/sound.mp3");

  astImg = loadImage("./images/ast_head.png");
  thinkloud = loadImage("./images/kloud.png");

  gunImg = loadImage("./images/gun.png");
  bulletImg = loadImage("./images/bullet.png");

  screwImg = loadImage("./images/screw.png");
  driverImg = loadImage("./images/screwdriver.png");
  fuelImg = loadImage("./images/fuel.png");
  oxygenImg = loadImage("./images/oxygen.png");
  wingsImg = loadImage("./images/wings.png");
  thrusterImg = loadImage("./images/thruster.png");
  standImg = loadImage("./images/stand.png");
  zombieImg = loadImage("./images/alien.png");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  
  ground = createSprite(windowWidth/2, windowHeight/2 + 100, windowWidth, windowHeight);

  cosmo = createSprite(windowWidth/2-90, 100, 1, 2);

  player = createSprite(windowWidth/2-600, windowHeight/2+210, 30, 60);
  player.addAnimation("playerImage", playerAnime);

  ast = createSprite(windowWidth/2-160, 190, 1, 2);
  kloud = createSprite(windowWidth/2+50, 110, 1, 2);

  gun = createSprite(player.x+37, player.y+27, 1, 2);
  bullet = createSprite(player.x+54, gun.y-13, 1, 2);

   screwGroup = new Group();
   screwdriverGroup = new Group();
   fuelGroup = new Group();
   oxygenGroup = new Group();
   wingsGroup = new Group();
   thrusterGroup = new Group();
   standGroup = new Group();
   zombieGroup = new Group();

  form = new Form(windowWidth, windowHeight);

}
function draw() {
  background("black");

 invis_ground = createSprite(windowWidth/2, windowHeight-110, windowWidth, 13);
 invis_ground.visible = false;
 player.collide(invis_ground);

  gun.x = player.x+37;
  gun.y = player.y+27;
  
  //music.play();
 
  if(gameState === 0){
    form.display();
    cosmo.addImage("start", cosmoImg);
    player.visible = false;
  }

  if(gameState === 1){
    background(bground);

    form.hide();
    cosmo.visible = false;

    spawnParts();

    ground.addImage("ground", bg);
    ground.velocityX = -11;

    gun.addImage("gun", gunImg);
    gunImg.scale = 0.3;

    player.visible = true;

    ast.addImage("head", astImg);
    kloud.addImage("cloud", thinkloud);

  if(ground.x < 757) {
    ground.x = ground.width/2;
  }

  if(keyDown("space") && player.y >= windowHeight/2+210) {
    jumpSound.play();
    player.velocityY = -10;
  }
  player.velocityY = player.velocityY + 0.8;

  player.setCollider("circle", 0, 0, 70);
  //player.debug = true;
  player.depth = gun.depth + 1;

  if((keyDown("s") && frameCount % 20 === 0) || touches.length > 0){
    bullet = createSprite(player.x+54, gun.y-13, 1, 2);
    bullet.addImage(bulletImg);
    bullet.velocityX = 7;
    touches = [];
  }

  score_count = score_count + Math.round(getFrameRate()/60);
  createZombie();

  if(zombieGroup.isTouching(bullet)){
    zombie.visible = false;
  }

  if(zombieGroup.isTouching(player)){
    text("Game Over!", windowWidth/2, windowHeight/2);
    ground.velocityX = 0;
    zombie.lifetime = 150;
    gameState = 2;
  }
}
else if(gameState === 2){
  textFont(font1);
  textSize(40);
  fill("white");
  text("Game Over!", windowWidth/2, windowHeight/2);
  ground.velocityX = 0;
  player.changeAnimation("player_Stop", playerStop);
  console.log("game ended");
  player.velocityY = 0;
  gun.visible = false;
  zombieGroup.setLifetimeEach(5);
  zombieGroup.setVelocityXEach(0);
}

  drawSprites();
  textSize(20);
  fill("white");
  text("Score: " + score_count, windowWidth/2+730, 29);
}

function createScrewdriver() {
  screwdriver = createSprite(10,20, 50, 50);
  screwdriver.x = Math.round(random(0, windowWidth));
  screwdriver.y = Math.round(random(windowHeight/2+135, windowHeight/2+150));
  screwdriver.addImage("screwdriver", driverImg);
  screwdriver.velocityX = -4;
  screwdriver.debug = true;

screwdriverGroup.add(screwdriver);

if(screwdriverGroup.isTouching(player)){
    screwdriverGroup.destroyEach();
    score_count = score_count + 10;
    screwdriverGroup.lifetime = 200;
  }
  
}

function createScrew() {
  screw = createSprite(windowWidth/2+100, windowHeight/7+450, 50, 50);
  screw.x = Math.round(random(0, windowWidth));
  screw.y = Math.round(random(windowHeight/2+135, windowHeight/2+150));
  screw.addImage("screw", screwImg);
  screw.scale = 0.5;
  screwGroup.add(screw);
  screw.velocityX = -4;
  screw.debug = true;

  if(screwGroup.isTouching(player)){
    screwGroup.destroyEach();
    score_count = score_count + 10;
  }
  
}


function createFuel() {

  fuel = createSprite(windowWidth/2+100, windowHeight/7+450, 50, 50);
  fuel.addImage("fuel", fuelImg);
  fuel.scale = 0.5;
   fuel.x = Math.round(random(0, windowWidth));
  fuel.y = Math.round(random(windowHeight/2+135, windowHeight/2+150));
  fuelGroup.add(fuel);
  fuel.velocityX = -4;
  fuel.debug = true;

  if(fuelGroup.isTouching(player)){
    fuelGroup.destroyEach();
    score_count = score_count + 10;
  }
 
}

function createOxygen() {

  oxygen = createSprite(windowWidth/2+100, windowHeight/7+450, 50, 50);
  oxygen.addImage("oxygen", oxygenImg);
  oxygen.x = Math.round(random(0, windowWidth));
  oxygen.y = Math.round(random(windowHeight/2+135, windowHeight/2+150));
  oxygenGroup.add(oxygen);
  oxygen.velocityX = -4;
  oxygen.debug = true;

  if(oxygenGroup.isTouching(player)){
    oxygenGroup.destroyEach();
    score_count = score_count + 10;
  }
 }


function createWings() {
  
  wings = createSprite(windowWidth/2+100, windowHeight/7+450, 50, 50);
  wings.addImage("wings", wingsImg);
  wings.scale = 0.5;
  wings.x = Math.round(random(0, windowWidth));
 wings.y = Math.round(random(windowHeight/2+135, windowHeight/2+150));
 wingsGroup.add(wings);
 wings.velocityX = -4;
 wings.debug = true;

  if(wingsGroup.isTouching(player)){
    wingsGroup.destroyEach();
    score_count = score_count + 10;
    wingsGroup.lifetime = 0;
  }
 }


function createThruster() {

  thruster = createSprite(windowWidth/2+100, windowHeight/7+450, 50, 50);
  thruster.addImage("thruster", thrusterImg);
  thruster.x = Math.round(random(0, windowWidth));
  thruster.y = Math.round(random(windowHeight/2+135, windowHeight/2+150));
  thruster.velocityX = -4;
  thruster.debug = true;
  
  thrusterGroup.add(thruster);

  if(thrusterGroup.isTouching(player)){
    thrusterGroup.destroyEach();
    score_count = score_count + 10;
    thrusterGroup.lifetime = 0;
  }
 
}

function createStand() {
  stand = createSprite(windowWidth/2+100, windowHeight/7+450, 50, 50);
  stand.addImage("stand", standImg);
 stand.x = Math.round(random(0, windowWidth));
stand.y = Math.round(random(windowHeight/2+135, windowHeight/2+150));
standGroup.add(stand);
stand.velocityX = -4;
stand.debug = true;

  if(standGroup.isTouching(player)){
    standGroup.destroyEach();
    score_count = score_count + 10;
    standGroup.lifetime = 0;
  }
}

function createZombie(){
  if(frameCount % 60 === 0){
  zombie = createSprite(windowWidth/2+100, windowHeight/7+450, 50, 50);
  zombie.addImage("zombie", zombieImg);
  zombie.x = Math.round(random(500, windowWidth));
  zombie.y = Math.round(random(windowHeight/2+185, windowHeight/2+190));
  zombie.velocityX = -5;
  zombie.debug = true;

  zombieGroup.add(zombie);
}
}

function spawnParts() {
  if(frameCount % 150 === 0){
     rand = Math.round(random(1, 7));
     switch(rand){
       case 1: createScrewdriver();
               break;
       case 2: createScrew();
               break;
       case 3: createFuel();
               break;
       case 4: createOxygen();
               break;
       case 5: createWings();
               break;
       case 6: createThruster();
               break;
       case 7: createStand();
               break;
       default:break;
     }
  }
}