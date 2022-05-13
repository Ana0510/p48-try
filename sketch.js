var ufo, ufo_img;
var invisibleGround, wall;
var ground;
var nextButton;
var alien, alien_img;
var run;

var plant, plantImg;
var oxygen, oxygenGrp, oxygenImg;

var bgImg1;
var bgImg2;

var gameState = 0;
var ENTER = 0;
var PLAY1 = 1;
var PLAY2 = 2;
var EXIT  = 3;

var score = 0;

function preload()
{
  ufo_img    = loadImage("ufo.png");
  bgImg1     = loadImage("bg1_img.jpg");  
  alien_img  = loadImage("alien.png");
  bgImg2     = loadImage("cityImage.png");
  plantImg   = loadImage("plant.png");
  oxygenImg  = loadImage("oxygen.png");

  //running animation
  run    = loadAnimation("run_1.png", "run_2.png", "run_3.png", "run_4.png", "run_5.png", "run_6.png");
}

function setup()
{
  createCanvas(windowWidth, windowHeight)
  
  //create a ufo sprite
 ufo = createSprite(width/2, 60);
 ufo.addImage(ufo_img);
 ufo.scale = 0.3;

 //create a ground sprite
 ground = createSprite(width/2,height - 300, width, 20);
 ground.shapeColor = 255;
 ground.visible = false;

 //create a invisible ground sprite
 invisibleGround = createSprite(width/2, height-299, width, 20);
 invisibleGround.visible = false;

 //nextButton = createSprite(width, height);
 nextButton = createImg("ufo.png");
 nextButton.position(width - 50, height - 50);
 nextButton.size(50,50);

 //creating alien
 alien = createSprite(100,620);
 alien.addAnimation("running", run);
 alien.scale = 5; 
 alien.visible = false;

 oxygenGrp = new Group();
}

function draw()
{
 if(gameState === 0)
  {
   background(bgImg1);

   //ufo arrival
   if(keyDown("DOWN_ARROW"))
   {
     ufo.velocityY = 2;
   }

   //ufo landing
   if(ufo.isTouching(ground))
    {
     fill(255);
     stroke(255);
     textSize(50);
     text("UFO has landed", width/2 - 160, 200);
     nextButton.mouseClicked(stateChange);
    }
 
   ufo.collide(invisibleGround)

  } 

 

 if (gameState == 1)
  {
   background(bgImg2); 
   ufo.visible   = false;
   alien.visible = true;
   nextButton.visible = false;
  
   wall = createSprite(width, height/2, 10, height);
   wall.visible = false

   invisibleGround.y = 800;
   invisibleGround.visible = false;

   alien.velocityY = alien.velocityY + 0.8;

  //movement
   if (keyDown("UP_ARROW"))
   {
     alien.velocityY -= 2;
   }

   if (keyDown("RIGHT_ARROW"))
   {
     alien.x += 10;
   }

   alien.collide(invisibleGround);
 
   createPlant()

  //adding oxygen bubbles
   if (frameCount%10 == 0)
   {
     createOxygen()
   }

  //score
   if (alien.overlap(oxygenGrp))
   {
     score = score + 2;
   }
   text("oxygen collected:"+score, 40, 40)

   console.log(score)

   if (alien.isTouching(wall) && score >= 14)
   {
     gameState = 2
   }   
  }

 if (gameState == 2)
 {
   alien.visible = false;
   background("purple")
  //removing the plant and oxygen
   plant.destroyEach();
   oxygen.destroyEach();

   
   //RIDDLE

   
  
 }


 drawSprites()
}


function stateChange()
{
  gameState = 1;
}


function createPlant()
{
  for (var i=300; i<width; i=i+420)
  { 
    plant = createSprite(i, 650);
    plant.addImage(plantImg);
    plant.scale = 0.7;
  }
}

function createOxygen()
{
  oxygen = createSprite(random(250, width), random(400, 800));
  oxygen.addImage(oxygenImg);
  oxygen.scale = 0.42;
  //destroying Oxygen
  oxygen.lifetime = 100;

  oxygenGrp.add(oxygen);
}