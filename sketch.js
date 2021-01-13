var dog,happydog;
var database;
var foodS,foodStock;

function preload()
{

  dogImg1=loadImage("dogImg.png");
  dogImg2=loadImage("dogImg1.png")
}

function setup() {

  createCanvas(500, 500);

  database=firebase.database();

  dog = createSprite(350,250,20,20);
  dog.addImage(dogImg1);
  dog.scale=0.2;
  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() { 
  
  background(rgb(255, 184, 162));
  dog.display();
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg2)
  }
  
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg1);
  }
  drawSprites();

  textSize(20);
  stroke(4);
  text("Food Remaining: " + foodS,50,225);
  text("Note: There are only 20 bones in Food stock",10,30);


}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


