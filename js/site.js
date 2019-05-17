window.addEventListener("DOMContentLoaded", scrollLoop, false); //causes scrollLoop function to be called once at start
 


 var BlueSquare = document.getElementById("BlueSquare");
 var GreySquare = document.getElementById("GreySquare");
 var Display = document.getElementById("Display");
 var StarDustPieces = new Array()


 var greySquareRad = 0;
 var dustCounter = 0;
 
 
 var yScrollPos;

 function scrollLoop(e){
    StarDustLoop(60);
    MoveStarDust();
    greySquareRad = GetRadianForOrbit(greySquareRad, 0.3);
    var GreySquareVal = PointOnCircle(greySquareRad, 12);


    yScrollPos = window.scrollY; //get scrollbar position
    //var GreySquarexVal = 70 * Math.sin(counter * 0.4);
    //  parallaxTranslate(-0.2, BigYellowCircle); //negative because scrollbar moves down and I want the element to move up
    //  parallaxTranslate(-0.4, GreenPentagon);
    GreySquare.style.transform = "translate(" + GreySquareVal.xpos + "em, 0)";
    GreySquare.style.zIndex = Math.round(GreySquareVal.ypos);


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
    var dustObject = new Object();
    var dustDiv = document.createElement("div");
    dustObject.element = dustDiv;
    dustObject.posCounter = 0;
    dustDiv.classList.add("StarDust");
    dustDiv.style.zIndex = Math.floor((Math.random() * 10) -5);
    var topAmount = ((Math.random() * 80)).toString() + "em";
    var leftAmount = ((Math.random() * 10) + 100).toString() + "em";
    dustDiv.style.top = topAmount;
    dustDiv.style.left = leftAmount;
    var dustText = document.createTextNode(".");
    dustDiv.appendChild(dustText);
    body.appendChild(dustDiv);
    console.log("dust created");
    StarDustPieces.push(dustObject);
 }


 function MoveStarDust(){
    StarDustPieces.forEach(dustObject => {
       dustObject.element.style.transform = "translate("+ dustObject.posCounter * (dustObject.element.style.zIndex - 5) + "em, 0)"; 
       dustObject.posCounter += 0.004;

       if(dustObject.posCounter > 3){
         delete dustObject;
       }
    });
 }

function StarDustLoop(timeBetweenParticles){
   dustCounter += Math.random() + 0.1;
   if(dustCounter > timeBetweenParticles){
      dustCounter = 0;
      CreateStarDust();
   }

}
 

 


 
 
 