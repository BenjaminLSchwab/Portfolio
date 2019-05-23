window.addEventListener("DOMContentLoaded", scrollLoop, false); //causes scrollLoop function to be called once at start
 
//Solar System Settings
var removeDustAt = 120; //used to determine how long after dust has spawned to wipe it from the screen
var dustSpeed = 0.005;
var dustCreationRate = 50;
var dustVertSpread = 80;
var dustHorizontalSpread = 10;
var dustHorizontalPush = 100;


 var BlueSquare = document.getElementById("BlueSquare");
 var GreySquare = document.getElementById("GreySquare");
 var Display = document.getElementById("Display");
 var StarDustPieces = new Array()


 var greySquareRad = 0; // used to keep track of where the moon is on its orbit
 var dustCounter = 0; //used in dust creation
 
 
 var yScrollPos;

 function scrollLoop(e){
    StarDustLoop(dustCreationRate);
    MoveStarDust();
    greySquareRad = GetRadianForOrbit(greySquareRad, 0.3);
    var GreySquareVal = PointOnCircle(greySquareRad, 12);


    yScrollPos = window.scrollY; //get scrollbar position
    GreySquare.style.transform = "translate(" + GreySquareVal.xpos + "em, 0)";
    GreySquare.style.zIndex = Math.round(GreySquareVal.ypos);

    console.log("Dust Count: " + StarDustPieces.length);


    requestAnimationFrame(scrollLoop); //This is what makes the function loop
 }
 
 //Translates an object using element style
 function parallaxScrollTranslate(parallaxValue, el){
     el.style.transform = "translate3d(0, " + yScrollPos * parallaxValue + "em, 0)" ; 
 }




 function swapZ(obj, zVal, toggle){
    if(toggle){
        obj.style.zIndex = zVal;
    }
    else{
        obj.style.zIndex = -zVal;
    }
 }

 function PointOnCircle(radians, radius){
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

 function CreateStarDust(){
    var body = document.getElementById("B");

    var dustObject = new Object(); // object is added to array and used to track position of dust over time
    dustObject.posCounter = 0;

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


 function MoveStarDust(){ // moves each piece of star dust on the screen
   var dustIndex = 0;
    StarDustPieces.forEach(dustObject => {
       dustObject.element.style.transform =
         "translate("+ dustObject.posCounter * (dustObject.element.style.zIndex - 5) + "em, 0)"; 
       dustObject.posCounter += dustSpeed;

       if(dustObject.posCounter * Math.abs(dustObject.element.style.zIndex - 5) > removeDustAt){ //delete star dust if it has drifted far enough
          StarDustPieces.splice(dustIndex,1);
          dustObject.element.parentNode.removeChild(dustObject.element);
          delete dustObject;
          dustIndex--; 

       }

       dustIndex++;
    });
 }

function StarDustLoop(timeBetweenParticles){ // creates dust at slightly random intervals
   dustCounter += (Math.random() + 0.1) * 0.5;
   if(dustCounter > timeBetweenParticles){
      dustCounter = 0;
      CreateStarDust();
   }

}
 

 


 
 
 