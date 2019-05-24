window.addEventListener("DOMContentLoaded", scrollLoop, false); //causes scrollLoop function to be called once at start
 
//Dust Settings
var dustSpeed = 0.005;
var dustVertSpread = 80;
var dustHorizontalSpread = 10;
var dustHorizontalPush = 100;
var dustCount = 35;


var BlueSquare = document.getElementById("BlueSquare");
var GreySquare = document.getElementById("GreySquare");
var Display = document.getElementById("Display");
var StarDustPieces = new Array();


console.log(window.innerWidth);


var removeDustAt; //used to determine how long after dust has spawned to recycle
 var greySquareRad = 0; // used to keep track of where the moon is on its orbit
 var dustCounter = 0; //used in dust creation
 
 
 var yScrollPos;

 SpawnStarDust();

 function scrollLoop(e){
   removeDustAt = (window.innerWidth / 10) + 40;
    MoveStarDust();
    greySquareRad = GetRadianForOrbit(greySquareRad, 0.3);
    var GreySquareVal = PointOnCircle(greySquareRad, 12);


    yScrollPos = window.scrollY; //get scrollbar position
    GreySquare.style.transform = "translate(" + GreySquareVal.xpos + "em, 0)";
    GreySquare.style.zIndex = Math.round(GreySquareVal.ypos);

    console.log("Dust Count: " + StarDustPieces.length);


    requestAnimationFrame(scrollLoop); //This is what makes the function loop
 }
 
 //Translates an object using element style and scrollbar position
 function parallaxScrollTranslate(parallaxValue, el){
     el.style.transform = "translate3d(0, " + yScrollPos * parallaxValue + "em, 0)" ; 
 }

 function PointOnCircle(radians, radius){ //gives the x and y position of a point on a circle given the radius and angle in radians
    var xpos = radius * Math.sin(radians);
    var ypos = radius * Math.cos(radians);
    return {xpos, ypos};
 }

 function GetRadianForOrbit(start, speed = 1, slowIntesity = 1, slowSpread = 0, eccentricity = 1){
    var increment = (2 * Math.PI);
    increment *= .01;
    increment *= speed;

   var distanceToEdge = Math.min(Math.abs(start - (2* Math.PI)), Math.abs(start - Math.PI));
   var usingEccentricity = (Math.abs(start - (2* Math.PI)) > Math.abs(start - Math.PI) );

   if(distanceToEdge < slowSpread){ 
      increment *= (slowIntesity * distanceToEdge);
   }

   if(usingEccentricity){
      increment *= eccentricity;
   }

   return start + increment;
 }

 function SpawnStarDust(){
   var i;
   for( i = 0; i < dustCount; i++){
      CreateStarDust();
   }
}


 function CreateStarDust(){
    var body = document.getElementById("B");

    var dustObject = new Object(); // object is added to array and used to track position of dust over time
    dustObject.posCounter = Math.random() * 12;
    
    var dustDiv = document.createElement("div");
    dustDiv.classList.add("StarDust");
    dustDiv.style.zIndex = Math.floor((Math.random() * 10) -5);

    dustObject.element = dustDiv;

    var topAmount = ((Math.random() * dustVertSpread)).toString() + "em";
    var leftAmount = ((Math.random() * dustHorizontalSpread) + dustHorizontalPush).toString() + "em";
    dustDiv.style.top = topAmount;
    dustDiv.style.left = leftAmount;

    var dustText = document.createTextNode(".");
    dustDiv.appendChild(dustText);

    body.appendChild(dustDiv);
    StarDustPieces.push(dustObject);
 }


 function MoveStarDust(){ // moves each piece of star dust on the screen, moves back to start after it goes off screen
   var dustIndex = 0;
    StarDustPieces.forEach(dustObject => {
       dustObject.element.style.transform =
         "translate("+ dustObject.posCounter * (dustObject.element.style.zIndex - 5) + "em, 0)"; 
       dustObject.posCounter += dustSpeed;

       if(dustObject.posCounter * Math.abs(dustObject.element.style.zIndex - 5) > removeDustAt){ //recycle star dust if it has drifted far enough

          dustObject.posCounter = (Math.random() * -2);

       }

       dustIndex++;
    });
 }


 

 


 
 
 