//Create variables here
var dog, happyDog;
var database;
var food, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg2.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(250,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

}


function draw() {  

  background(46,139,87);

if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDogImg);
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
}

  drawSprites();
  //add styles here
  fill("white");
  textSize(25);
  text("Press the up arrow to feed Drago milk!", 40, 100);

  text("Food Remaining: " + food, 40, 150);
}

function readStock(data){
  food = data.val();
}

function writeStock(x){
  
    if(x<=0){
    x=0;
    }
    
    else{
    x=x-1;
    }
    
    database.ref('/').update({
    Food:x
    })
}