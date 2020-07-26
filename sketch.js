//Create variables here
var dog,happyDog,dogIMG;
var database;
var foods,foodStock;


function preload()
{
  //load images here
  dogIMG=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
}

function setup() {
  createCanvas(500,500);
  
  database=firebase.database();

  dog=createSprite(250,250);
dog.addImage(dogIMG);
dog.scale=0.2;

  foodStock=database.ref('FOOD');
  foodStock.on("value",readStock);
  
}


function draw() {  
background(209,159,102);

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(happyDog);
dog.scale=0.2;
}

if(keyWentDown(32)){
 // writeStock(foods);
  dog.addImage(dogIMG);
  dog.scale=0.2;
}
text("Food:"+foods,210,150);
text("Press UP_ARROW key to swap the image",170,50);
text("Press space key to swap the image",170,70);

  drawSprites();
  //add styles here

}
  function readStock(data){
   foods=data.val();
  }

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
database.ref('/').update({
  FOOD:x
})
}



